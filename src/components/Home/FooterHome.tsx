import React from "react";
import { connect } from "react-redux";
import { loading, ready } from '../../store/loading/actions';

const FooterHomeComponent: React.SFC = () => {

    return (<div className="footer">
        <div className="container">
            <div className="col-md-12 text-center">
                <img className="logo-footer-home" src="https://net-baires.azureedge.net/images/NET-Baires-Logo-Blanco.png" alt="Net-Baires Logo" />
                {/* <ul className="footer-menu">
                    <li><a href="http://demo.com">Site</a></li>
                    <li><a href="#!">Support</a></li>
                    <li><a href="#!">Terms</a></li>
                    <li><a href="#!">Privacy</a></li>
                </ul> */}
                <div className="footer-text">
                    <p>
                        Copyright © 2019 NET-Baires. All Rights Reserved.
                            </p>
                </div>
            </div>
        </div>
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

export const FooterHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterHomeComponent);
