import { AsyncStorage } from 'react-native';
import { SESSION_BY_TOKEN, WALLET_BY_ID, TEAM_BY_ID } from './queries';
import { clientRequest } from '../App';

export async function userData() {
  try {
    const token = await AsyncStorage.getItem('@bet:token');
    const data = await clientRequest.request(SESSION_BY_TOKEN, { token });
    const isAutenticated = data.sessionByToken.autentication;
    if (isAutenticated) {
      const id = parseInt(data.sessionByToken.wallet_id, 10);
      const { walletById } = await clientRequest.request(WALLET_BY_ID, { id });
      data.sessionByToken.balance = walletById.balance;
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

export async function nameTeam(id) {
  try {
    const { teamById } = await clientRequest.request(TEAM_BY_ID, { id });
    return teamById.name;
  } catch (err) {
    return err;
  }
}
