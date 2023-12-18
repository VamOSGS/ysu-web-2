import bcrypt from 'bcrypt';

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function isPasswordValid(password, hash) {
  const validPassword = await bcrypt.compare(password, hash);
  return validPassword;
}
