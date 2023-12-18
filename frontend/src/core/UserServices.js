import axios from 'axios';

const UserServices = () => {
  const createUser = async ({ username, email, password }) => {
    try {
      const res = await axios.post('http://localhost:5555/api/register', {
        username,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data || error;
    }
  };
  const login = async ({ username, password }) => {
    try {
      const res = await axios.post('http://localhost:5555/api/login', {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      return error.response.data || error;
    }
  };
  return {
    createUser,
    login,
  };
};

export default UserServices;
