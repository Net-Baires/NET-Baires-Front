import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

type LoginProps = {};
const LogoutComponent: React.SFC<LoginProps> = () => {
  let history = useHistory();
  const { logout } = useContext(UserContext);
  useEffect(() => {
    logout();
    history.push("/");
  });
  return <></>;
};

export default LogoutComponent;
