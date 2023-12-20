import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
const UserContext = createContext({
  user: {},
  isLoading: false,
});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 'guest',
  });
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5555/');

    socket.on('onlineUsersCount', (count) => {
      setOnlineUsersCount(count);
    });
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
      return;
    }

    setIsLoading(true);
  }, []);

  const logOut = () => {
    setUser({ id: 'guest' });
    localStorage.removeItem('user');
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        logOut,
        isGuest: user.id === 'guest',
        onlineUsersCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
