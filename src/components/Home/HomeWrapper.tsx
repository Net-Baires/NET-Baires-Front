import React, { useEffect } from "react";
import { connect } from "react-redux";
// import Script from 'react-load-script'
import { loading, ready } from '../../store/loading/actions';
// import '../../../assets/fonts/fontawesome/css/fontawesome-all.min.css'
// import '../../../assets/plugins/animation/css/animate.min.css'
// import '../../../assets/css/style-app.css'
// type EditUserParams = {
//     id: string;
//     loading: () => void;
//     ready: () => void;
// };

const HomeWrapperComponent: React.SFC = ({ children }) => {
    useEffect(() => {
        loadScript('assets/js/pcoded.min.js')
    });
    var loadScript = function (src: string) {
        const script = document.createElement("script");

        script.src = src;
        document.body.appendChild(script);
    }

    return (<>
        <div className="wrapper animsition" data-animsition-in-classname="fade-in" data-animsition-in-duration="1000" data-animsition-out-classname="fade-out" data-animsition-out-duration="1000">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top" role="navigation">
                    <div className="container">
                        <a className="navbar-brand page-scroll" href="#main"><img src="assets/logos/logo.png" alt="adminity Logo" /></a>
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
                                    <a className="nav-link page-scroll" href="#services">Important</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#!">Level 1</a>
                                        <a className="dropdown-item" href="#!">Level 2</a>
                                        <a className="dropdown-item" href="#!">Level 3</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#features">Benefits</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#reviews">Testimonials</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#pricing">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#!">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="main" id="main">

                {children}
                <div className="footer">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <img src="assets/logos/logo.png" alt="Datta Able Logo" />
                            <ul className="footer-menu">
                                <li><a href="http://demo.com">Site</a></li>
                                <li><a href="#!">Support</a></li>
                                <li><a href="#!">Terms</a></li>
                                <li><a href="#!">Privacy</a></li>
                            </ul>
                            <div className="footer-text">
                                <p>
                                    Copyright © 2018 Datta Able. All Rights Reserved.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
                <a id="back-top" className="back-to-top page-scroll" href="#main">
                    <i className="ion-ios-arrow-thin-up"></i>
                </a>
            </div>
        </div>
    </>);
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

export const HomeWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeWrapperComponent);
