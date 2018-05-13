import { AsyncStorage } from 'react-native';
import { SESSION_BY_TOKEN } from './queries';
import { clientRequest } from '../App';

export async function userData() {
  try {
    const token = await AsyncStorage.getItem('@bet:token');
    const data = await clientRequest.request(SESSION_BY_TOKEN, { token });
    const isAutenticated = data.sessionByToken.autentication;
    if (isAutenticated) {
      return data.sessionByToken;
    }
    return false;
  } catch (err) {
    return err;
  }
}

export function locale(number) {
  return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
