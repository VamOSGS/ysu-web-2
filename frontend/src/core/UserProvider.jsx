import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({
  user: {},
  isLoading: false,
});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 'guest',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // fetch('/api/user')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data);
    //     setIsLoading(false);
    //   });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isGuest: user.id === 'guest' || !user.id,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
