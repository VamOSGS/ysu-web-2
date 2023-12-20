import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../core/UserHooks';
import { useUser } from '../core/UserProvider';
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser, isGuest } = useUser();
  const { mutate: login } = useLogin();
  const toast = useToast();
  const navigate = useNavigate();

  const onLogin = (data) => {
    login(data, {
      onSuccess: (res) => {
        if (res.user) {
          setUser(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          navigate('/');
        }
        if (res.error) {
          toast({
            title: 'Error',
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Success',
            description: 'Logged in successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      },
    });
  };

  useEffect(() => {
    if (!isGuest) {
      navigate('/');
    }
  }, [isGuest]);

  return (
    <Layout>
      <Container>
        <Heading>Login</Heading>

        <VStack as='form' spacing={4} mt={6} onSubmit={handleSubmit(onLogin)}>
          <Input
            placeholder='Username'
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            isInvalid={errors.username}
          />
          <Input
            placeholder='Password'
            {...register('password', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            type='password'
            isInvalid={errors.password}
          />
          <Button type='submit'>Login</Button>

          <Text>
            Don{"'"}t have account? <NavLink to='/register'>Register</NavLink>{' '}
          </Text>
        </VStack>
      </Container>
    </Layout>
  );
}
