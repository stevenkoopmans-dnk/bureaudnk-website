export async function onRequestPost(context) {
  const { request, env } = context;

  let naam, bedrijf, telefoon, bericht;

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    naam     = formData.get("naam")     || "";
    bedrijf  = formData.get("bedrijf")  || "";
    telefoon = formData.get("telefoon") || "";
    bericht  = formData.get("bericht")  || "";
  } else {
    const json = await request.json().catch(() => ({}));
    naam     = json.naam     || "";
    bedrijf  = json.bedrijf  || "";
    telefoon = json.telefoon || "";
    bericht  = json.bericht  || "";
  }

  if (!naam || !bericht) {
    return new Response("Naam en bericht zijn verplicht.", { status: 400 });
  }

  const emailBody = [
    `Naam:       ${naam}`,
    `Bedrijf:    ${bedrijf}`,
    `Telefoon:   ${telefoon}`,
    ``,
    `Bericht:`,
    bericht,
  ].join("\n");

  const emailHtml = `
    <table style="font-family:sans-serif;font-size:15px;color:#1a1714;max-width:560px;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Naam</strong></td><td style="padding:8px 16px;border-bottom:1px solid #eee">${escHtml(naam)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Bedrijf</strong></td><td style="padding:8px 16px;border-bottom:1px solid #eee">${escHtml(bedrijf)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Telefoon</strong></td><td style="padding:8px 16px;border-bottom:1px solid #eee">${escHtml(telefoon)}</td></tr>
      <tr><td colspan="2" style="padding:16px 0 0"><strong>Bericht</strong><br><br>${escHtml(bericht).replace(/\n/g, "<br>")}</td></tr>
    </table>
  `;

  try {
    const msg = new EmailMessage(
      "contact@bureadnk.nl",
      env.CONTACT_TO_EMAIL,
      {
        subject: `Nieuw bericht via bureadnk.nl — ${naam} (${bedrijf || "geen bedrijf"})`,
        text: emailBody,
        html: emailHtml,
      }
    );
    await env.EMAIL.send(msg);
  } catch (err) {
    console.error("Email send failed:", err);
    return new Response("Er ging iets mis bij het versturen. Probeer het later opnieuw.", { status: 500 });
  }

  // Redirect back with success flag
  const origin = new URL(request.url).origin;
  return Response.redirect(`${origin}/contact.html?verzonden=1`, 303);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
