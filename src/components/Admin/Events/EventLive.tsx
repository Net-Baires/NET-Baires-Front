import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-scanner";
import { hasAny } from "../../../services/objectsservices";
import { reportAssitance } from "../../../services/eventsServices";

type EventLiveProps = {
  name: string;
};
type EventLiveParams = {
  id: number;
};
type EventLivePropsAndRouter = EventLiveParams & EventLiveProps;
export const EventLive: React.SFC<
  RouteComponentProps<EventLivePropsAndRouter>
> = () => {
  const [attended, setAttended] = useState(new Array<string>());
  const [showReader, setShowReader] = useState(true);
  const handleScan = (data: string) => {
    if (data) {
      setShowReader(false);
      reportAssitance(data).then(x => {
        setShowReader(true);
        const emailOfUser = data.split("|");
        var newArry = [...attended, emailOfUser[0]];
        setAttended(newArry);
        localStorage.setItem("attendedList", JSON.stringify(newArry));
      });
    }
  };
  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    event.preventDefault();
    const positionToDelete = attended.indexOf(email);
    const newArry = [
      ...attended.slice(0, positionToDelete),
      ...attended.slice(positionToDelete + 1, attended.length)
    ];
    setAttended(newArry);
    localStorage.setItem("attendedList", JSON.stringify(newArry));
  };

  const handleSync = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleError = (err: any) => {
    console.error(err);
  };
  const previewStyle = {
    height: 400,
    width: 400
  };
  return (
    <>
      <div className="card border-primary mb-3 qr-panel">
        <div className="card-header">Lector</div>
        <div className="card-body">
          {showReader && (
            <QrReader
              delay={100}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          )}
        </div>
      </div>

      {hasAny(attended) && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {attended.map(x => (
                <tr key={x}>
                  <td>{x}</td>
                  <td>
                    <button
                      onClick={e => handleDelete(e, x)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={e => handleSync(e)}
            type="button"
            className="btn btn-success"
          >
            Sincronizar
          </button>
        </>
      )}
    </>
  );
};
