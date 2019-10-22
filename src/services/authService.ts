import { User } from "./models/User";
import JwtDecode from "jwt-decode";

let currentUser: User = {} as User;
let isLoggued = false;
var currentToken = "";
export const getCurrentUser = (): User => {
  var value = localStorage.getItem("CurrentUserToken");
  if (value != null) {
    login(value);
    return currentUser;
  }
  return currentUser;
};
export const getToken = () => currentToken;
export const isAuthenticated = (): boolean => {
  var value = localStorage.getItem("CurrentUserToken");
  if (value != null) {
    login(value);
    return true;
  }
  return false;
};

export const login = (token: string) => {
  const decodeToken = JwtDecode<TokenClaims>(token);
  currentUser.email = decodeToken.email;
  currentUser.id = +decodeToken.unique_name;
  currentUser.role = decodeToken.role;
  currentUser.token = token;
  isLoggued = true;
  currentToken = token;
  localStorage.setItem("CurrentUserToken", token);
  localStorage.setItem("IsLoggued", "true");
};
export const logout = () => {
  localStorage.removeItem("CurrentUserToken");
  localStorage.removeItem("IsLoggued");
  isLoggued = false;
  currentToken = "";
  currentUser = {} as User;
};
export const hasPermission = (rol: string): boolean => {
  return isLoggued && currentUser.role == rol;
};

interface TokenClaims {
  email: string;
  role: string;
  unique_name: string;
}
