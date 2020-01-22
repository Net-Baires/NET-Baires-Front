import React, { useState, useEffect } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Draft from "react-wysiwyg-typescript";
import { EditorState, ContentState } from "draft-js";
import { isEmpty } from '../../../../services/objectsservices';
import { EventLiveDetail } from '../../../../services/models/Events/EventLiveDetail';

type AttendantCountProps = {
    eventLive: EventLiveDetail;
};

export const AttendantCount: React.SFC<AttendantCountProps> = ({
    eventLive
}) => {
    return (<div className="col-md-3 col-xl-3">
        <div className="card Active-visitor">
            <div className="card-block text-center">
                <h5 className="mb-4">Asistentes</h5>
                <i className="fas fa-user-friends f-30 text-c-green"></i>
                <h2 className="f-w-300 mt-3">
                    {!isEmpty(eventLive) &&
                        eventLive.membersDetails.totalMembersRegistered}
                </h2>
                <span className="text-muted">Total Usuario Registrados</span>
                <div className="progress mt-4 m-b-40">
                    {!isEmpty(eventLive) && (
                        <div
                            className="progress-bar progress-c-theme"
                            role="progressbar"
                            style={{
                                width: `${(eventLive.membersDetails
                                    .totalMembersAttended *
                                    100) /
                                    eventLive.membersDetails.totalMembersRegistered}%`,
                                height: "7px"
                            }}
                        ></div>
                    )}
                </div>
                <div className="row">
                    <div className="col-md-6 col-6">
                        <h4>
                            {!isEmpty(eventLive) &&
                                eventLive.membersDetails.totalMembersAttended}
                        </h4>
                        <span className="text-muted">Presentes</span>
                    </div>
                    <div className="col-md-6 col-6">
                        <h4>
                            {!isEmpty(eventLive) &&
                                eventLive.membersDetails.totalMembersRegistered -
                                eventLive.membersDetails.totalMembersAttended}
                        </h4>
                        <span className="text-muted">Ausentes</span>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}