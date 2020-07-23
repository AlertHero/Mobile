import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { reset } from '../../App';

export const getTokens = async () => {
  const token = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return { token, refreshToken };
};

export const login = async (token, refreshToken) => {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('refreshToken', refreshToken);
  await reset();
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
  await reset();
  return true;
};

export const checkUser = async () => {
  const jwt = await getTokens();
  const data = await jwtDecode(jwt.token);
  console.log(data.user);
  return data;
};

export const yo = async () => {
  console.log('yo');
};

export default async () => {
  const dateNow = new Date();
  const auth = await getTokens();
  if (auth.token === null) {
    return false;
  } else if (auth.token.exp < dateNow.getTime()) {
    return false;
  }
  return true;
};
