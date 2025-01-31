import bcrypt from "bcrypt";
import createError from "http-errors";

const SALT_ROUNDS = 10;

/**JSDoc
 * Hash password
 * @param {string} rawPassword
 * @returns {Promise<string>}
 */
export async function hashPassword(rawPassword: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(rawPassword, SALT_ROUNDS);
    return hashedPassword;
  } catch (error: any) {
    throw createError(500, "Error hashing password: " + error.message);
  }
}

/**
 * Compare password
 * @param {string} rawPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export async function comparePassword(
  rawPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(rawPassword, hashedPassword);
    return result;
  } catch (error: any) {
    throw createError(500, "Error comparing password: " + error.message);
  }
}
