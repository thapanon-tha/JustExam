const login = (rawData) => {
  // Call login api here
  const data = JSON.parse(JSON.stringify(rawData));
  console.log(data);
  return {
    token: 'token',
    role: 'STUDENT',
    name: 'TEST_NAME',
  };
};

const logout = () => '';

export default {
  login,
  logout,
};
