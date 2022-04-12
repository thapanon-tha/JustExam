const login = (rawData) => {
  // Call login api here
  const data = JSON.parse(JSON.stringify(rawData));
  return {
    token: 'token',
    role: 'TEACHER',
    name: 'TEST_NAME',
  };
};

const logout = () => '';

export default {
  login,
  logout,
};
