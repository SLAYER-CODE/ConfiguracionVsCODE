import { ClientLocationProps } from "../Navigation/Dranwable/TabsDraws/atoms/ClientLocation";
import { HomeLocationProps } from "../Navigation/Dranwable/TabsDraws/atoms/HomeLocation";

type RootStackParamList = {
  PresOne: undefined;
  PresTwo: undefined;
  PresTree: undefined;
  Main: undefined;
};
export type RootMain = {
  Auth: undefined;
  Reguister: undefined;
  CountOldRecuperate: undefined;
  MainInit: undefined;
};



export type SubDrawerParamList = {
  Perfil: undefined;
  Home: undefined;
  Categorias: undefined;
  Productos: undefined;
  Ventas: undefined;
  CarritoDeCompras: undefined;
  Transacciones: undefined;
  Configuracion: undefined;
  Unlogin: undefined;
  Preview: undefined;
  Contratados:undefined;
};

export type HomeParamList = {
  Home: undefined;
  Search: undefined;
  Agregate: undefined;
  Chat: undefined;
};
// Items que localisan el servicio o el usuario
export type HomeUbication = {
  Home: undefined;
  Location: HomeLocationProps;
};

export type ClientsUbication = {
  Ventas: undefined;
  Location: ClientLocationProps;
};

export default RootStackParamList;


