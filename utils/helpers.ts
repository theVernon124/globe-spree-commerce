export function generateUniqueEmail(baseEmail: string): string {
  const timestamp = new Date().getTime();
  const [name, domain] = baseEmail.split("@");
  return `${name}+${timestamp}@${domain}`;
}
