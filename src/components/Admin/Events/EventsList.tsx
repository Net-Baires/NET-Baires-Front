import React, { useState, useEffect, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { getEvents } from "../../../services/eventsServices";
import { EventDetail } from "../../../services/models/Events/Event";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { CardWrapper } from "../../Common/CardWrapper";
import { formatStringDate } from '../../../helpers/DateHelpers';
import { loading, ready } from '../../../store/loading/actions';
import { connect } from 'react-redux';
type EventsProps = {
  name: string;
  loading: () => void;
  ready: () => void;
  id: number;
};
const EventsListComponent: React.SFC<EventsProps> = ({ loading, ready }) => {
  const [events, setEvents] = useState(new Array<EventDetail>());
  useEffect(() => {
    loading();
    getEvents().then(s => {
      setEvents(s);
      ready();
    });
  }, []);
  let history = useHistory();
  const handleEditEvent = (
    event: MouseEvent<HTMLButtonElement>,
    meEvent: EventDetail
  ) => {
    event.preventDefault();
    history.push(`/app/events/${meEvent.id}/edit`);
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
      text: "Fecha",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, event: EventDetail) => (
        <label >{formatStringDate(event.date)}</label>
      )
    },
    {
      text: "Plataforma",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, event: EventDetail) => (
        event.platform == "Meetup" ?
          <img className="img-platform-events-list" src="./assets/images/meetuplogo.png"></img>
          : <img className="img-platform-events-list" src="./assets/images/eventbritelogo.png"></img>
      )
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
    <CardWrapper cardTitle="Mis eventos">
      <article>
        <div className="mis-eventos-container">
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

export const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsListComponent);
