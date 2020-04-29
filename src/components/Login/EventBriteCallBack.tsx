import { RouteComponentProps, useLocation, useHistory } from "react-router";
import React, { useEffect, useContext } from "react";
import { loginWithEventBriteToken } from "../../services/loginServices";
import { UserContext } from "../../contexts/UserContext";
import Loading from "./Loading";
type EventBriteCallBackProps = {
  name: string;
};
type EventBriteCallBackParams = {
  id: number;
};
type EventBriteCallBackPropsAndRouter = EventBriteCallBackParams &
  EventBriteCallBackProps;
export const EventBriteCallBack: React.SFC<RouteComponentProps<
  EventBriteCallBackPropsAndRouter
>> = () => {
  const { login } = useContext(UserContext);
  let history = useHistory();
  let search = useLocation().search;
  const token = search.slice(search.indexOf("=") + 1, search.length);
  useEffect(() => {
    loginWithEventBriteToken(token)
      .then((response: any) => {
        login(response.token);
        const redirectUrl = localStorage.getItem("RedirectUrl") as string;
        localStorage.setItem("RedirectUrl", "/");
        history.push(redirectUrl);
      })
      .catch(() => {});
  }, []);
  return (
    <div>
      <Loading></Loading>
    </div>
  );
};

export default EventBriteCallBack;
