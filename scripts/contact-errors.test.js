const assert = require("node:assert/strict");
const test = require("node:test");

const { getContactSendErrorMessage } = require("../src/lib/contact-errors");

test("getContactSendErrorMessage explains Brevo authorised IP errors outside production", () => {
  const message = getContactSendErrorMessage({
    status: 401,
    body: '{"message":"We have detected you are using an unrecognised IP address 121.141.49.165. add the new IP address in authorised_ips"}',
    isProduction: false,
  });

  assert.match(message, /Brevo bloque l'IP du serveur/);
  assert.match(message, /121\.141\.49\.165/);
});

test("getContactSendErrorMessage keeps a generic message in production", () => {
  const message = getContactSendErrorMessage({
    status: 401,
    body: "unrecognised IP address 121.141.49.165",
    isProduction: true,
  });

  assert.equal(message, "Envoi impossible pour le moment. Réessaie dans un instant.");
});
