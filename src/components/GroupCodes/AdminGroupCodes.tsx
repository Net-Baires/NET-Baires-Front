import React, { useState } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from '../../store/loading/actions';
import { CardHeaderWrapper } from '../Common/CardHeaderWrapper';
import { GroupCode } from '../Admin/Events/Components/GroupCode';
import { GroupCodeResponse } from '../../services/models/Events/EventLiveDetail';
import { isEmpty } from '../../services/objectsservices';
type AdminGroupCodesProps = {
  loading: () => void;
  ready: () => void;
};

const AdminGroupCodesComponent: React.SFC<AdminGroupCodesProps>
  = () => {
    const [groupCode, setGroupCode] = useState({ code: 'LSM35J8' } as GroupCodeResponse);
    return (
      <>
        {!isEmpty(groupCode) &&
          <div className="row">
            <CardHeaderWrapper cardTitle={`Panel de ácciones sobre el código : ${groupCode.code}`} ></CardHeaderWrapper>
          </div>
        }
      </>
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

export const AdminGroupCodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminGroupCodesComponent);
