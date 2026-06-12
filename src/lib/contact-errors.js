const GENERIC_CONTACT_SEND_ERROR = "Envoi impossible pour le moment. Réessaie dans un instant.";

function extractIpAddress(text) {
  const match = String(text || "").match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
  return match ? match[0] : null;
}

function getContactSendErrorMessage({ status, body, isProduction }) {
  if (isProduction) return GENERIC_CONTACT_SEND_ERROR;

  const text = String(body || "");
  if (
    status === 401 &&
    /unrecognised IP address|authorised_ips|authorized_ips/i.test(text)
  ) {
    const ipAddress = extractIpAddress(text);
    return ipAddress
      ? `Brevo bloque l'IP du serveur (${ipAddress}). Ajoute cette IP dans les IP autorisées Brevo, ou désactive la restriction IP pour tester en local.`
      : "Brevo bloque l'IP du serveur. Ajoute l'IP actuelle dans les IP autorisées Brevo, ou désactive la restriction IP pour tester en local.";
  }

  return GENERIC_CONTACT_SEND_ERROR;
}

module.exports = {
  GENERIC_CONTACT_SEND_ERROR,
  getContactSendErrorMessage,
};
