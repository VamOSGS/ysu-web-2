import UserServices from './UserServices';
import UserUseCases from './UserUseCases';

const User = UserUseCases(UserServices());

export default User;
