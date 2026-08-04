export function contactEmailHref(email, subject = "Hello Wamik") {
  if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches) {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
}
