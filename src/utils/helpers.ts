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

export function getInitials(name: string) {
  const split = name.split(" ");
  if (!split.length) return "QX";
  if (split.length > 1) return `${split[0].charAt(0)}${split[1].charAt(0)}`;
  return split[0].charAt(0);
}
