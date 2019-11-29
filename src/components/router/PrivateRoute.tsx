import React, { useContext } from "react";
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export const PrivateRoute = ({ component, children, ...rest }: RouteProps) => {
  const { isLoggued } = useContext(UserContext);

  if (!component && !children) {
    throw Error("component is undefined");
  }
  const Component = component; // JSX Elements have to be uppercase.
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (isLoggued) {
      if (Component)
        return <Component {...props} />;
    }
    const redirectUrl = props.location.pathname;

    return (
      <Redirect
        to={{
          pathname: "/login",
          search: `${redirectUrl}`,
          state: { from: props.location }
        }}
      />
    );
  };

  return <Route {...rest} render={render} />;
};
