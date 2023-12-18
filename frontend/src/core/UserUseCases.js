const UserUseCases = (UserService) => {
  const login = async ({ username, password }) =>
    UserService.login({ username, password });
  const createUser = ({ username, email, password }) =>
    UserService.createUser({ username, email, password });

  return {
    login,
    createUser,
  };
};

export default UserUseCases;
