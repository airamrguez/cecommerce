import { isEmpty } from '../utils';

export function validateLogin(user) {
  if (isEmpty(user.username)) {
    return 'Username cannot be empty';
  }
  if (isEmpty(user.password)) {
    return 'Password cannot be empty';
  }
  return null;
}
