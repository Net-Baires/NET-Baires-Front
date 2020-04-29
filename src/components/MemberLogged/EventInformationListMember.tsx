import React, { useState, useEffect } from "react";
import { subscribeUpdateEventInformationSync } from "../../services/syncCommunicationServices";
import { EventInformation } from "../../services/models/Member";
import { getVisibleEventInformation } from "../../services/eventInformationServices";
import { isEmpty } from "../../services/objectsservices";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { CardWrapper } from "../Common/CardWrapper";

type EventInformationListMemberProps = {
  eventId: number;
};

export const EventInformationListMember: React.SFC<EventInformationListMemberProps> = ({
  eventId,
}) => {
  const [eventInformationList, setEventInformationList] = useState(
    new Array<EventInformation>()
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadEventDetail();
    subscribeUpdateEventInformationSync((data) => {
      if (+data.eventId === eventId) {
        loadEventDetail();
      }
    });
  }, []);
  const loadEventDetail = () => {
    setLoading(true);
    getVisibleEventInformation(eventId).then((x) => {
      setEventInformationList(x);
      setLoading(false);
    });
  };

  return (
    <>
      {!isEmpty(eventInformationList) && (
        <CardWrapper
          cardBodyClassName="general-small-card-body-size"
          cardTitle="Información del Evento"
          colSize={4}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(eventInformationList) &&
                eventInformationList.map((eventInformation) => (
                  <tr>
                    <td>{eventInformation.title}</td>
                    <td>{eventInformation.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Backdrop
            style={{ zIndex: 99999, position: "absolute" }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </CardWrapper>
      )}
    </>
  );
};
