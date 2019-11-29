import React, { useContext, useState, MouseEvent } from "react";
import { UserContext } from "../../contexts/UserContext";
import { login as loginService } from "../../services/loginServices";
import { useHistory } from "react-router-dom";
import { Config } from "../../services/config";

var ClientOAuth2 = require("client-oauth2");
type LoginProps = {};
const Login: React.SFC<LoginProps> = props => {
  const { login, isLoggued } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  var meetupAuth = new ClientOAuth2({
    clientId: Config.integrations.meetup.clientId,
    clientSecret: Config.integrations.meetup.clientSecret,
    accessTokenUri: Config.integrations.meetup.accessTokenUri,
    authorizationUri: Config.integrations.meetup.authorizationUri,
    redirectUri: Config.integrations.meetup.redirectUri,
    scopes: Config.integrations.meetup.scopes
  });
  const redirectUrl = history.location.search.slice(
    1,
    history.location.search.length
  );
  localStorage.setItem("RedirectUrl", redirectUrl);
  var eventBriteAuth = new ClientOAuth2({
    clientId: Config.integrations.eventBrite.clientId,
    redirectUri: Config.integrations.meetup.redirectUri
  });
  const handleLogin = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const user = loginService(email, password);
    login(user);
    history.push(redirectUrl);
  };
  const handleLoginMeetup = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    window.location.replace(meetupAuth.token.getUri());
  };
  const handleLoginEventBrite = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    window.location.replace(
      `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${Config.integrations.eventBrite.clientId}&redirect_uri=${Config.integrations.eventBrite.redirectUri}`
    );
  };
  return (
    <>
      {!isLoggued && (
        <article className="authenticate-conteiner">
          <header>
            <h1>Autenticarse</h1>
          </header>
          <section>
            <p>
              <input
                onClick={handleLoginMeetup}
                type="submit"
                className="fadeIn fourth"
                value="Meetup"
              />
            </p>
          </section>
          {/* <section>
          <p> </p>
        </section> */}
        </article>
      )}
    </>
  );
};

export default Login;
