export const validateLogin = (email, pwd) => {
  if (email.length >= 5 && pwd.length != 0) {
    return true;
  }

  return false;
};
