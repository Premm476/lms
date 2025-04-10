import crypto from "crypto";

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateShortToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function generateNumericToken(length = 6): string {
  const digits = '0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += digits[Math.floor(Math.random() * digits.length)];
  }
  return token;
}
