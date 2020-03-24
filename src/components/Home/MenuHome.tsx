import React, { useContext } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { SecureElement } from '../Auth/SecureElement';
import { AppState } from '../../store';
type MenuHomeStateProps = {
  eventsLive: boolean;
  onlineEvent: boolean;
}
const MenuHomeComponent: React.SFC<MenuHomeStateProps> = ({ eventsLive, onlineEvent }) => {
  const { isLogged } = useContext(UserContext);
  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top"
        role="navigation"
      >
        <div className="container">
          {/* <a className="navbar-brand page-scroll" href="#main"><img src="https://net-baires.azureedge.net/images/NET-Baires-Logo-Blanco.png" alt="adminity Logo" /></a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav my-2 my-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link  page-scroll" to="/#!">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#nuestrosOrganizadores">
                  Organizadores
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#ultimosEventos">
                  Últimos Eventos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#speakers">
                  Speakers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#sponsors">
                  Sponsors
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  page-scroll" to="/badges">
                  Badges
                  </NavLink>
              </li>
              {eventsLive &&
                <li className="nav-item">
                  <NavLink className="nav-link  page-scroll" to="/events/live">
                    Eventos en vivo
                  </NavLink>
                </li>
              }
              {onlineEvent &&
                <li className="nav-item">
                  <NavLink className="nav-link  page-scroll" to="/live">
                    Miranos en vivo
                  </NavLink>
                </li>
              }
              <li className="nav-item">
                {isLogged() && (<>
                  <SecureElement roles={["Admin", "Organizer"]}>
                    <NavLink className="nav-link  page-scroll" to="/app/panel">
                      App
                  </NavLink>
                  </SecureElement>
                  <SecureElement roles={["Member"]}>
                    <NavLink className="nav-link  page-scroll" to="/app/panel">
                      App
                  </NavLink>
                  </SecureElement>
                </>)}
              </li>
              <li className="nav-item">
                {isLogged() ? (
                  <NavLink className="nav-link  page-scroll" to="/logout">
                    Desconectate
                  </NavLink>
                ) : (
                    <NavLink className="nav-link  page-scroll" to="/login">
                      Conectate
                  </NavLink>
                  )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  eventsLive: state.home.eventsLive,
  onlineEvent: state.home.onlineEvent
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const MenuHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuHomeComponent);
