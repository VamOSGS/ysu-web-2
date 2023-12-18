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
import { useRegister } from '../core/UserHooks';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: createUser } = useRegister();
  const toast = useToast();

  const onCreateUser = (data) => {
    createUser(data, {
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
            description: 'User created successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      },
      onError: (err) => {
        console.log(err);
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Layout>
      <Container>
        <VStack spacing={4} as='form' onSubmit={handleSubmit(onCreateUser)}>
          <Heading>Register</Heading>
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
            placeholder='Email'
            {...register('email', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            isInvalid={errors.email}
          />
          <Input
            placeholder='Password'
            {...register('password', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            isInvalid={errors.password}
            type='password'
          />

          <Button type='submit'>Register</Button>

          <Text>
            Already have an account? <NavLink to='/login'>Log In</NavLink>{' '}
          </Text>
        </VStack>
      </Container>
    </Layout>
  );
}
