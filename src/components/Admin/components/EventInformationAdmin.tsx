import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { EventInformation } from "../../../services/models/Member";
import { isEmpty } from "../../../services/objectsservices";
import { updateEventInformationSync } from "../../../services/syncCommunicationServices";
import {
  Backdrop,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import {
  removeEventInformation,
  updateEventInformation,
} from "../../../services/eventInformationServices";
import {
  getEventInformation,
  addEventInformation,
} from "../../../services/eventInformationServices";
type EventInformationAdminProps = {
  eventId: number;
  updateEventInformationCallback: () => void;
};

export const EventInformationAdmin: React.SFC<EventInformationAdminProps> = ({
  eventId,
  updateEventInformationCallback,
}) => {
  const [eventInformationList, setEventInformationList] = useState(
    new Array<EventInformation>()
  );
  const [newEventInformation, setNewEventInformation] = useState(
    {} as EventInformation
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadEventInformation();
  }, []);
  const loadEventInformation = () => {
    setLoading(true);
    clean();
    getEventInformation(eventId).then((x) => {
      setEventInformationList(x);
      setLoading(false);
    });
  };
  const addHandler = (eventInput: MouseEvent<HTMLButtonElement>) => {
    eventInput.preventDefault();
    addEventInformation(eventId, newEventInformation).then(() => {
      loadEventInformation();
      if (newEventInformation.visible) {
        updateEventInformationSync(eventId);
        updateEventInformationCallback();
      }
    });
  };
  const removeHandler = (
    eventInput: MouseEvent<HTMLButtonElement>,
    eventInformation: EventInformation
  ) => {
    eventInput.preventDefault();
    removeEventInformation(eventId, eventInformation.id).then(() => {
      loadEventInformation();
      updateEventInformationSync(eventId);
    });
  };
  const handleEventInformationVisible = (
    eventInput: ChangeEvent<HTMLInputElement>,
    eventInformation: EventInformation
  ) => {
    eventInput.preventDefault();

    eventInformation.visible = !eventInformation.visible;
    setLoading(true);
    updateEventInformation(eventId, eventInformation.id, eventInformation)
      .then(() => {
        setEventInformationList(
          eventInformationList.reduce((acc, item) => {
            if (item.id != eventInformation.id) acc.push(item);
            else acc.push(eventInformation);
            return acc;
          }, [] as EventInformation[])
        );
        setLoading(false);
        updateEventInformationSync(eventId);
        if (eventInformation.visible) updateEventInformationCallback();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const clean = () =>
    setNewEventInformation({
      title: "",
      description: "",
      visible: false,
    } as EventInformation);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descripción</th>
            <th scope="col">Visible</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(eventInformationList) &&
            eventInformationList.map((eventInformation) => (
              <tr>
                <td>{eventInformation.title}</td>
                <td>{eventInformation.description}</td>
                <td>
                  {" "}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={eventInformation.visible}
                        onChange={(e) =>
                          handleEventInformationVisible(e, eventInformation)
                        }
                      />
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={(e) => removeHandler(e, eventInformation)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td>
              <input
                onChange={(e) =>
                  setNewEventInformation({
                    ...newEventInformation,
                    title: e.target.value,
                  })
                }
                placeholder="Título"
                type="text"
                value={newEventInformation.title}
                className="form-control"
              ></input>
            </td>
            <td>
              <input
                onChange={(e) =>
                  setNewEventInformation({
                    ...newEventInformation,
                    description: e.target.value,
                  })
                }
                placeholder="Descripción"
                type="text"
                value={newEventInformation.description}
                className="form-control"
              ></input>
            </td>
            <td>
              <FormControlLabel
                control={
                  <Switch
                    checked={newEventInformation.visible}
                    onChange={() =>
                      setNewEventInformation({
                        ...newEventInformation,
                        visible: !newEventInformation.visible,
                      })
                    }
                  />
                }
              />
            </td>
            <td>
              <button
                onClick={(e) => addHandler(e)}
                type="button"
                className="btn btn-success "
              >
                <i className="fas fa-check"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Backdrop style={{ zIndex: 99999, position: "absolute" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
