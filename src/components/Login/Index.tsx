import React, { useContext, useEffect, MouseEvent } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory, NavLink } from "react-router-dom";
import { Config } from "../../services/config";
import { loadScript, loadStyles } from '../../services/helpers/scriptshelpers';

var ClientOAuth2 = require("client-oauth2");
type LoginProps = {};
const Login: React.SFC<LoginProps> = () => {
  const { isLoggued } = useContext(UserContext);
  let history = useHistory();
  useEffect(() => {
    loadScript("assets/js/vendor-all.min.js");
    loadScript("assets/plugins/bootstrap/js/bootstrap.min.js");
    loadScript('assets/js/pcoded.js')
    loadStyles('assets/css/style-login.css');
  });
  var meetupAuth = new ClientOAuth2({
    clientId: Config.integrations.meetup.clientId,
    clientSecret: Config.integrations.meetup.clientSecret,
    accessTokenUri: Config.integrations.meetup.accessTokenUri,
    authorizationUri: Config.integrations.meetup.authorizationUri,
    redirectUri: Config.integrations.meetup.redirectUri,
    scopes: Config.integrations.meetup.scopes
  });
  let redirectUrl = history.location.search.slice(
    1,
    history.location.search.length
  );
  if (redirectUrl == "")
    redirectUrl = "/admin/panel";
  localStorage.setItem("RedirectUrl", redirectUrl);


  const handleLoginMeetup = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.replace(meetupAuth.token.getUri());
  };
  return (
    <>
      {!isLoggued && (
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r"></span>
              <span className="r s"></span>
              <span className="r s"></span>
              <span className="r"></span>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon"></i>
                </div>
                <h3 className="mb-4">Autenticate</h3>
                {/* <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email"></input>
                </div> */}
                {/* <div className="input-group mb-4">
                  <input type="password" className="form-control" placeholder="password"></input>
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"></input>
                    <label className="cr"> Save credentials</label>
                  </div>
                </div> */}
                <button onClick={handleLoginMeetup} className="btn btn-primary shadow-2 mb-4">Autenticate con Meetup</button>
                <p className="mb-2 text-muted">
                  <NavLink
                    exact
                    className="nav-link-slide-bar"
                    activeClassName="active"
                    to="/#!"
                  >
                    Volver a la Home
                  </NavLink>
                </p>
                {/* <p className="mb-0 text-muted">Don’t have an account? <a href="auth-signup.html">Signup</a></p> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
