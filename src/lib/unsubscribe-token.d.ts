export function createUnsubscribeToken(outreachId: string, secret?: string): string;
export function verifyUnsubscribeToken(token: string | null, secret?: string): string | null;
