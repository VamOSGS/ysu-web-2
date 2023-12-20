import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../core/UserProvider';

export default function Header() {
  const { logOut, isGuest } = useUser();

  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      py={4}
      px={4}
      backgroundColor='gray.100'
      mb={4}
      borderBottom='1px solid'
      borderColor='gray.300'
    >
      <Heading as={NavLink} to='/'>
        YSU-WEB
      </Heading>
      {isGuest ? (
        <Flex alignItems='center'>
          <Button
            mr={2}
            variant='solid'
            colorScheme='teal'
            as={NavLink}
            to='/login'
          >
            Login
          </Button>
          <Button
            mr={2}
            variant='outline'
            colorScheme='teal'
            as={NavLink}
            to='/register'
          >
            Sign Up
          </Button>
        </Flex>
      ) : (
        <Flex alignItems='center'>
          <Button onClick={logOut} variant='solid' colorScheme='teal'>
            Log Out
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
