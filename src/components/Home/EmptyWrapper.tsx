import React from "react";
import { connect } from "react-redux";
import { loading, ready } from '../../store/loading/actions';

const EmptyWrapperComponent: React.SFC = ({ children }) => {
    return (<>
        ddddddddddddddddddddddddddddddd
        {children}
        bbbb
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

export const EmptyWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmptyWrapperComponent);
