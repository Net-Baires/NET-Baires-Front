import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { hasPermission, Rol } from '../../services/authService';

type SecureElementProps = {
  rol?: Rol;
  roles?: Rol[];
};

export const SecureElement: React.SFC<SecureElementProps> = ({
  children,
  rol,
  roles
}) => {
  const { isLogged } = useContext(UserContext);

  const checkRoles = roles != null && roles.some(r => hasPermission(r));
  const checkHasPermissionResult = rol != null && hasPermission(rol);

  if (
    isLogged() &&
    children != null &&
    (checkHasPermissionResult || checkRoles)
  ) {
    return <>{children}</>;
  }
  return <></>;
};
