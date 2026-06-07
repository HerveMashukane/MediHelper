/** Normalize legacy numeric IDs from localStorage to string (Prisma UUID-ready). */
export function toEntityId(id: unknown): string {
  if (id === null || id === undefined || id === '') {
    return '';
  }
  return String(id);
}

export function newEntityId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now());
}
