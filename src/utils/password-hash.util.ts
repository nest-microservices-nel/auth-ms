import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  // const salt = bcrypt.genSaltSync(10);
  const data = bcrypt.hashSync(password, 10);
  console.log('🚀 ~ hashPassword ~ data:', data);

  return null;
}
