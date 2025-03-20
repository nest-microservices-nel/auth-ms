import { vi, it, describe, expect, test } from 'vitest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('some test trying vitest', () => {
  let authController: AuthController;
  const authService: AuthService = new AuthService();

  beforeEach(() => {
    authController = new AuthController(authService);
  });

  it('expect to be true', async () => {
    const registerUserData = {
      name: 'nelson',
      email: 'gallego@gmail.com',
      password: '1234567',
    };

    vi.spyOn(authController, 'registerUser').mockReturnValue(
      Promise.resolve({
        id: 'some',
        email: 'some',
        name: 'some',
        password: 'some',
      }),
    );

    const newUser = await authController.registerUser(registerUserData);
    console.log('🚀 ~ it ~ newUser:', newUser);
    expect(registerUserData).toBeDefined();
  });
});

test('testing out of the main function', () => {
  expect(4 - 2).toBe(2);
});
