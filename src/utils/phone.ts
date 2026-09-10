export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('213')) {
    const national = cleaned.slice(3);
    if (national.length === 9) {
      return `+213 ${national.slice(0, 1)} ${national.slice(1, 4)} ${national.slice(4, 7)} ${national.slice(7)}`;
    }
  }
  return phone;
}

export function formatPhoneShort(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('213')) {
    const national = cleaned.slice(3);
    return `${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
  }
  return phone;
}
