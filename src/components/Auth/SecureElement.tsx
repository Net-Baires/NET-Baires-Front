import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { hasPermission } from "../../services/authService";

type SecureElementProps = {
  rol?: string;
};

export const SecureElement: React.SFC<SecureElementProps> = ({
  children,
  rol
}) => {
  const { isLoggued } = useContext(UserContext);

  if (isLoggued && children != null && (rol == null || hasPermission(rol))) {
    return <>{children}</>;
  }
  return <></>;
};
