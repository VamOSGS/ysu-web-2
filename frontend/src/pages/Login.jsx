import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../core/UserHooks';
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login } = useLogin();
  const toast = useToast();

  const onLogin = (data) => {
    login(data, {
      onSuccess: (res) => {
        console.log(res);

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
