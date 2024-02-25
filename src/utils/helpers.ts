import { TOAST_STATUS, customToast } from "./toast.utils";

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

export function formatDate(value: any) {
  const date = new Date(value);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      customToast({
        type: TOAST_STATUS.SUCCESS,
        message: "Copied to clipboard ✅",
      });
    } catch (e: any) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: "Unable to copy to clipboard",
      });

      console.error("Unable to copy text to clipboard", e);
    }
  } else {
    customToast({
      type: TOAST_STATUS.ERROR,
      message: "Clipboard action not supported on device",
    });
  }
}

export function truncateAddress(address?: string) {
  if (!address) return "null";

  let prefixLength = 3;
  let suffixLength = 4;
  if (address.length <= prefixLength + suffixLength) return address;

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  const truncated = `${prefix}....${suffix}`;

  return truncated;
}
