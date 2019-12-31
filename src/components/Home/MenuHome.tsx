import React, { useContext } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { SecureElement } from '../Auth/SecureElement';
const MenuHomeComponent: React.SFC = () => {
  const { isLoggued } = useContext(UserContext);
  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top"
        role="navigation"
      >
        <div className="container">
          {/* <a className="navbar-brand page-scroll" href="#main"><img src="assets/images/Logo-Blanco.png" alt="adminity Logo" /></a> */}
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
              {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#!">Level 1</a>
                                    <a className="dropdown-item" href="#!">Level 2</a>
                                    <a className="dropdown-item" href="#!">Level 3</a>
                                </div>
                            </li> */}
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
                <NavLink className="nav-link  page-scroll" to="/events/live">
                  Eventos en vivo
                  </NavLink>
              </li>
              <li className="nav-item">
                {isLoggued && (<>
                  <SecureElement roles={["Admin", "Organizer"]}>
                    <NavLink className="nav-link  page-scroll" to="/admin/panel">
                      App
                  </NavLink>
                  </SecureElement>
                  <SecureElement roles={["Member"]}>
                    <NavLink className="nav-link  page-scroll" to="/member/panel">
                      App
                  </NavLink>
                  </SecureElement>
                </>)}
              </li>
              <li className="nav-item">
                {isLoggued ? (
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

const mapStateToProps = () => ({});
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
