// Cloudflare Worker: ontvangt het contactformulier van bureaudnk.nl en mailt het bericht door.
// Staat los van de site zelf. Route: bureaudnk.nl/api/contact (zie wrangler.toml).
// Versturen loopt via Cloudflare Email Routing op administratiekantoordnk.nl,
// omdat Email Routing op bureaudnk.nl niet aan kan (mail loopt daar via Google Workspace).
import { EmailMessage } from 'cloudflare:email';

const MAX = { naam: 120, bedrijf: 160, telefoon: 40, bericht: 3000 };

const b64 = s => {
  const bytes = new TextEncoder().encode(s);
  let bin = ''; for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};
const hdr = s => `=?UTF-8?B?${b64(s)}?=`;
const clean = s => String(s || '').replace(/[\r\n]+/g, ' ').trim();

function buildMime({ from, to, subject, text }) {
  return [
    `From: Website Bureau DNK <${from}>`,
    `To: ${to}`,
    `Subject: ${hdr(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(text).replace(/.{1,76}/g, '$&\r\n'),
  ].join('\r\n');
}

// Alleen het eigen domein mag posten. Op de preview staat ook localhost in ALLOWED_ORIGINS.
function allowedOrigin(request, env) {
  const origin = request.headers.get('origin') || '';
  const lijst = String(env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  return lijst.includes(origin) ? origin : null;
}

function json(status, body, origin) {
  const headers = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
  if (origin) { headers['access-control-allow-origin'] = origin; headers['vary'] = 'Origin'; }
  return new Response(JSON.stringify(body), { status, headers });
}

export default {
  async fetch(request, env) {
    const origin = allowedOrigin(request, env);

    if (request.method === 'OPTIONS') {
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'POST',
        'access-control-allow-headers': 'accept, content-type',
        'access-control-max-age': '86400',
        'vary': 'Origin',
      } });
    }
    if (request.method !== 'POST') return json(405, { ok: false, error: 'alleen POST' }, origin);
    if (!origin) return json(403, { ok: false, error: 'herkomst niet toegestaan' });

    // Maximaal 5 berichten per minuut per IP-adres
    if (env.CONTACT_LIMIT) {
      const ip = request.headers.get('cf-connecting-ip') || 'onbekend';
      const { success } = await env.CONTACT_LIMIT.limit({ key: ip });
      if (!success) return json(429, { ok: false, error: 'te veel berichten' }, origin);
    }

    let d;
    try {
      const ct = request.headers.get('content-type') || '';
      d = ct.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
    } catch { return json(400, { ok: false, error: 'ongeldig verzoek' }, origin); }

    // Spam: honeypot gevuld of binnen 2,5 seconde verstuurd. Stil "ok" teruggeven, niets mailen.
    if (d._gotcha || (Number(d.t) && Number(d.t) < 2500)) return json(200, { ok: true }, origin);

    const f = {
      naam: clean(d.naam).slice(0, MAX.naam),
      bedrijf: clean(d.bedrijf).slice(0, MAX.bedrijf),
      telefoon: clean(d.telefoon).slice(0, MAX.telefoon),
      bericht: String(d.bericht || '').trim().slice(0, MAX.bericht),
    };
    if (!f.naam || !f.telefoon) return json(422, { ok: false, error: 'velden ontbreken' }, origin);

    const text = [
      'Nieuw bericht via bureaudnk.nl',
      '',
      `Naam:      ${f.naam}`,
      `Bedrijf:   ${f.bedrijf || '-'}`,
      `Telefoon:  ${f.telefoon}`,
      '',
      'Wat speelt er:',
      f.bericht || '-',
    ].join('\n');

    const raw = buildMime({
      from: env.CONTACT_FROM, to: env.CONTACT_TO,
      subject: `Nieuw bericht via bureaudnk.nl: ${f.naam}${f.bedrijf ? ' (' + f.bedrijf + ')' : ''}`,
      text,
    });
    try {
      await env.MAIL.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
    } catch (e) {
      console.error('mail mislukt', e);
      return json(502, { ok: false, error: 'mail mislukt' }, origin);
    }
    return json(200, { ok: true }, origin);
  },
};
