import { useMutation } from '@tanstack/react-query';
import User from './UserFactory';

export const useLogin = () =>
  useMutation({
    mutationFn: User.login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: User.createUser,
  });
