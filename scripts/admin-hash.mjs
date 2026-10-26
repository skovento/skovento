// Usage: npm run admin:hash -- "your password"
// Prints a value for ADMIN_PASSWORD_HASH in your environment variables.
import crypto from 'node:crypto';

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Give a password of at least 10 characters:  npm run admin:hash -- "your password"');
  process.exit(1);
}
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, salt, 64).toString('hex');
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
