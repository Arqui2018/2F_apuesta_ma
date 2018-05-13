import { SwitchNavigator } from 'react-navigation';
import AppStack from './appStack';
import AuthLoadingScreen from './authLoading';
import AuthStack from './authStack';

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
