const login = (rawData) => {
  // Call login api here
  const data = JSON.parse(JSON.stringify(rawData));
  return {
    token: 'token',
    role: 'TEACHER',
    name: 'TEST_NAME',
  };
};

const logout = () => {
  // Call login api here
  console.log('logout');
  return '';
};

export default {
  login,
  logout,
};
