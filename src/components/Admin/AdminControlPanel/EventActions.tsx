import React, { useState, useEffect, MouseEvent } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { CardWrapper } from "../../Common/CardWrapper";
import { syncEvents } from "../../../services/eventsServices";
import { SecureElement } from '../../Auth/SecureElement';

type EventActionsProps = {
  loading: () => void;
  ready: () => void;
};

const EventActionsComponent: React.SFC<EventActionsProps> = () => {
  const handleSyncEvents = (eventInput: MouseEvent<HTMLButtonElement>) => {
    eventInput.preventDefault();
    loading();
    syncEvents().then(() => {
      ready();
    });
  };
  return (
    <SecureElement roles={["Admin"]}>
      <CardWrapper colSize={3} cardTitle="Acciones Generales">
        <button onClick={handleSyncEvents} className="btn btn-warning shadow-2 text-uppercase btn-block">
          Sincronizar con Meetup
      </button>
      </CardWrapper>
    </SecureElement>
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

export const EventActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventActionsComponent);
