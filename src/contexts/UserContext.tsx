import React, { Context, useState } from "react";
import { Member } from '../services/models/Member';
import {
  isAuthenticated,
  getCurrentUser,
  logout,
  login,
  setCurrentMember
} from "../services/authService";
type UserContext = {
  user: Member;
  memberDetail: Member;
  isLoggued: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUserDetail: (data: Member) => void;
};
type UserContextProps = {};

let UserContext: Context<UserContext>;

const defaultUser = () => {
  return {
    email: "",
    name: "",
    lastName: "",
    token: "",
    role: "",
    id: 0
  };
};
let memberDetail: Member = {} as Member;
const { Provider, Consumer } = (UserContext = React.createContext<UserContext>({
  user: getCurrentUser(),
  isLoggued: isAuthenticated(),
  memberDetail: getCurrentUser(),
  login: () => { },
  logout: () => { },
  setUserDetail: () => { }
}));
const UserProvider: React.SFC<UserContextProps> = props => {
  const [user, setUser] = useState(getCurrentUser());
  const [isLoggued, setLoggued] = useState(isAuthenticated());

  const loginHandler = (token: string) => {
    login(token);
    setLoggued(true);
    setUser(user);
  };

  const logoutHandler = () => {
    logout();
    setLoggued(false);
    setUser(defaultUser());
  };
  const setUserDetailHandler = (data: Member) => {
    setCurrentMember(data);
  };
  return (
    <Provider
      value={{
        user: user,
        isLoggued: isLoggued,
        login: loginHandler,
        logout: logoutHandler,
        setUserDetail: setUserDetailHandler
      }}
    >
      {props.children}
    </Provider>
  );
};
export { UserProvider, Consumer as UserConsumer, UserContext };
