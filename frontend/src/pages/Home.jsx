import React from 'react';
import { useUser } from '../core/UserProvider';
import Layout from '../components/Layout';
import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
export default function Home() {
  const { user, isGuest, onlineUsersCount } = useUser();
  return (
    <Layout>
      <Container>
        {isGuest ? (
          <Box textAlign='center'>
            <Text>
              You are not logged in please{' '}
              <Link as={RouterLink} to='/login'>
                Log In
              </Link>
            </Text>
          </Box>
        ) : (
          <Container>
            <Heading>
              Welcome {user.username} ({user.email})
            </Heading>
            <Text>Online Users: {onlineUsersCount}</Text>
          </Container>
        )}
      </Container>
    </Layout>
  );
}
