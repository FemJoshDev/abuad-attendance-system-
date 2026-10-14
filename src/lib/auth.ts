// Import bcryptjs for secure password hashing and comparison
import bcrypt from 'bcryptjs';

/**
 * Hashes a plain text password using bcrypt with a salt round of 10.
 * @param password Plain text password string
 * @returns Hashed password string
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Compares a plain text password against a stored bcrypt hash.
 * @param password Plain text password string
 * @param hash Stored bcrypt hash string from the database
 * @returns Boolean indicating whether the password matches
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}