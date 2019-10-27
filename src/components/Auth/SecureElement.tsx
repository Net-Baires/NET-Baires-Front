import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { hasPermission } from "../../services/authService";

type SecureElementProps = {
  rol?: string;
  rols?: string[];
};

export const SecureElement: React.SFC<SecureElementProps> = ({
  children,
  rol,
  rols
}) => {
  const { isLoggued } = useContext(UserContext);

  const checkRoles = rols != null && rols.some(r => hasPermission(r));
  const checkHasPermissionResult = rol != null && hasPermission(rol);

  if (
    isLoggued &&
    children != null &&
    (checkHasPermissionResult || checkRoles)
  ) {
    return <>{children}</>;
  }
  return <></>;
};
