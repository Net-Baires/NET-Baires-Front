import JwtDecode from "jwt-decode";

let currentUser: UserLogged = {} as UserLogged;
let isLoggued = false;
var currentToken = "";
export const getCurrentUser = (): UserLogged => {
  var value = localStorage.getItem("CurrentUserToken");
  if (value != null && currentToken == null)
    login(value);
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
  currentUser.userId = +decodeToken.userId;
  currentUser.rol = decodeToken.role as Rol;
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
  currentUser = {} as UserLogged;
};
export const hasPermission = (rol: Rol): boolean => {
  return isLoggued && currentUser.rol == rol;
};
export type Rol = 'Member' | 'Admin' | 'Organizer';
interface TokenClaims {
  email: string;
  role: string;
  userId: string;
}
export interface UserLogged {
  email: string;
  rol: Rol;
  userId: number;
}