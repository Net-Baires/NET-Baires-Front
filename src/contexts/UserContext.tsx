import React, { Context } from "react";
import { Member } from '../services/models/Member';
import { UserLogged, hasPermission, Rol } from '../services/authService';
import {
  isAuthenticated,
  getCurrentUser,
  logout,
  login
} from "../services/authService";
type UserContext = {
  user: UserLogged;
  memberDetail: Member;
  isLogged: () => boolean;
  login: (token: string) => void;
  logout: () => void;
  setUserDetail: (data: Member) => void;
  hasRol: (rol: Rol) => boolean;
};
type UserContextProps = {};
var userDetail: Member = {} as Member;
let UserContext: Context<UserContext>;

let memberDetail: Member = {} as Member;
const { Provider, Consumer } = (UserContext = React.createContext<UserContext>({
  user: getCurrentUser(),
  isLogged: isAuthenticated,
  memberDetail: userDetail,
  login: () => { },
  logout: () => { },
  setUserDetail: () => { },
  hasRol: () => true
}));
const UserProvider: React.SFC<UserContextProps> = props => {

  const loginHandler = (token: string) => {
    login(token);
  };

  const logoutHandler = () => {
    logout();
  };
  const hasRol = (rol: Rol): boolean => {
    return hasPermission(rol);
  };
  const setUserDetail = (member: Member) => memberDetail = member;
  return (
    <Provider
      value={{
        user: getCurrentUser(),
        isLogged: isAuthenticated,
        login: loginHandler,
        setUserDetail: setUserDetail,
        logout: logoutHandler,
        memberDetail: memberDetail,
        hasRol: hasRol
      }}
    >
      {props.children}
    </Provider>
  );
};
export { UserProvider, Consumer as UserConsumer, UserContext };
