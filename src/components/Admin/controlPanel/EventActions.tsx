import React, { useState, useEffect, MouseEvent } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { CardWrapper } from "../../Common/CardWrapper";
import { syncEvents } from "../../../services/eventsServices";

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
    <CardWrapper colSize={4} cardTitle="Acciones sobre Evento">
      <button onClick={handleSyncEvents} className="btn shadow-4 btn-warning">
        Sincronizar con Meetup
      </button>
    </CardWrapper>
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
