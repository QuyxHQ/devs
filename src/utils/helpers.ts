export function maskEmail(email: string) {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return email;

  const localPart = email.substring(0, atIndex);
  const domainPart = email.substring(atIndex);

  const maskedLocalPart =
    localPart.substring(0, 2) +
    "*".repeat(localPart.length - 4) +
    localPart.substring(localPart.length - 2, localPart.length);

  return maskedLocalPart + domainPart;
}
