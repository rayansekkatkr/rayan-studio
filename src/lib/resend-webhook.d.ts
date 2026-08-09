export function verifyResendSignature(input: {
  payload: string;
  headers: Record<string, string>;
  secret: string | undefined;
  nowSeconds?: number;
}): { valid: boolean; reason?: string; eventId?: string };
export function planTransition(eventType: string): {
  businessStatus?: string;
  suppressionReason?: string;
  record: boolean;
};
export const TIMESTAMP_TOLERANCE_S: number;
