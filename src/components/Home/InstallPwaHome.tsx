import React from "react";
import { connect } from "react-redux";
import { loading, ready } from '../../store/loading/actions';

const InstallPwaHomeComponent: React.SFC = () => {

    return (<div className="home-install-pwa row">
        <div className="col-sm-2"></div>
        <div className="col-sm-2 btn-install-container">
            <button className="btn btn-primary btn-action btn-fill">Instalar</button>
        </div>
        <div className="col-sm-6">
            Enterate de todas las novedades y se parte de todos nuestros eventos. Instala nuestra App !!!!
</div>
        <div className="col-sm-2"></div>
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

export const InstallPwaHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(InstallPwaHomeComponent);
