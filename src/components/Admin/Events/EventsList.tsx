import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getEvents } from "../../../services/eventsServices";
import { EventDetail } from "../../../services/models/Events/Event";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
type EventsProps = {
  name: string;
};
type EventsParams = {
  id: number;
};
type EventsPropsAndRouter = EventsParams & EventsProps;
export const EventsList: React.SFC<
  RouteComponentProps<EventsPropsAndRouter>
> = props => {
  const [events, setEvents] = useState(new Array<EventDetail>());
  useEffect(() => {
    getEvents().then(s => {
      setEvents(s);
    });
  }, []);
  let history = useHistory();
  const handleEditEvent = (
    event: MouseEvent<HTMLButtonElement>,
    meEvent: EventDetail
  ) => {
    event.preventDefault();
    history.push(`/admin/events/${meEvent.id}/edit`);
  };
  const { SearchBar } = Search;

  const columns = [
    {
      dataField: "id",
      text: "Id"
    },
    {
      dataField: "title",
      text: "Título"
    },
    {
      dataField: "date",
      text: "Fecha"
    },
    {
      dataField: "imageUrl",
      text: "Portada",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, event: EventDetail) => (
        <img className="img-preview-list-events" src={event.imageUrl}></img>
      )
    },
    {
      text: "Acción",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, event: EventDetail) => (
        <button
          type="button"
          onClick={e => handleEditEvent(e, event)}
          className="btn btn-primary"
        >
          Editar
        </button>
      )
    }
  ];
  return (
    <>
      <article>
        <div>
          {events && (
            <ToolkitProvider
              keyField="id"
              data={events}
              columns={columns}
              search
            >
              {(props: any) => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable
                    keyField="id"
                    {...props.baseProps}
                    pagination={paginationFactory()}
                  />
                </div>
              )}
            </ToolkitProvider>
          )}
        </div>
      </article>
    </>
  );
};
