import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootMain} from '../TypeDefinitios/DefinitiosNavigateMain';

type ProfileScreenHomeNavigation = NativeStackNavigationProp<RootMain, 'Auth'>;

function initUserAuth(AuthStack: ProfileScreenHomeNavigation) {
  AuthStack.reset({
    index: 1,
    routes: [{name: 'MainInit'}],
  });
}
