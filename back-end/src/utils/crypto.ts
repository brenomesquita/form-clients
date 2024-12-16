import crypto from 'crypto';
const algorithm = 'aes-256-ctr';

const secretKey = process.env.CRYPTO_SECRET_KEY
  ? Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex')
  : null;
const iv = crypto.randomBytes(16);

export function encrypt(value: string) {
  if (!secretKey) {
    throw new Error('CRYPTO_SECRET_KEY not defined');
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(encryptedValue: string): string {
  if (!secretKey) {
    throw new Error('CRYPTO_SECRET_KEY not defined');
  }
  const [ivHex, encryptedHex] = encryptedValue.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
}
