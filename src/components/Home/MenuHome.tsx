import React from "react";
import { connect } from "react-redux";
import { loading, ready } from '../../store/loading/actions';
const MenuHomeComponent: React.SFC = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                    {/* <a className="navbar-brand page-scroll" href="#main"><img src="assets/images/Logo-Blanco.png" alt="adminity Logo" /></a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav my-2 my-lg-0">
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#main">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#services">Próximo Evento</a>
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
                                <a className="nav-link page-scroll" href="#features">Sponsors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#reviews">Ultimos Eventos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#pricing">Organizadores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">Contactate</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>);
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
