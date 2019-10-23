import React, { Context, useState } from "react";
import { Member } from "../services/models/Member";
import {
  isAuthenticated,
  getCurrentUser,
  logout,
  login
} from "../services/authService";
type UserContext = {
  user: Member;
  isLoggued: boolean;
  login: (token: string) => void;
  logout: () => void;
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
const { Provider, Consumer } = (UserContext = React.createContext<UserContext>({
  user: getCurrentUser(),
  isLoggued: isAuthenticated(),
  login: () => {},
  logout: () => {}
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
  return (
    <Provider
      value={{
        user: user,
        isLoggued: isLoggued,
        login: loginHandler,
        logout: logoutHandler
      }}
    >
      {props.children}
    </Provider>
  );
};
export { UserProvider, Consumer as UserConsumer, UserContext };
