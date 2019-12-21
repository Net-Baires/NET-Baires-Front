import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { EventToSync } from "../../../services/models/Events/EventToSync";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { GetAdminLiveEventDetail } from "../../../services/eventsServices";

type AdminEventLivePanelProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type AdminEventLivePanelParams = {
  id: string;
};

type AdminEventLivePanelPropsAndRouter = AdminEventLivePanelParams &
  AdminEventLivePanelProps;
const AdminEventLivePanelComponent: React.SFC<RouteComponentProps<
  AdminEventLivePanelPropsAndRouter
> &
  AdminEventLivePanelProps> = ({ loading, ready, ...props }) => {
  const history = useHistory();
  const [eventDetail, setEventDetail] = useState({});
  useEffect(() => {
    loading();
    GetAdminLiveEventDetail(+props.match.params.id).then(s => {
      setEventDetail(s);
      ready();
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-xl-4">
          <div className="card Active-visitor">
            <div className="card-block text-center">
              <h5 className="mb-4">Asistentes</h5>
              <i className="fas fa-user-friends f-30 text-c-green"></i>
              <h2 className="f-w-300 mt-3">1,285</h2>
              <span className="text-muted">Total Usuario Registrados</span>
              <div className="progress mt-4 m-b-40">
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: "45%", height: "7px;" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="row card-active">
                <div className="col-md-6 col-6">
                  <h4>20%</h4>
                  <span className="text-muted">Presentes</span>
                </div>
                <div className="col-md-6 col-6">
                  <h4>80%</h4>
                  <span className="text-muted">Ausentes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-md-6">
          <div className="card Recent-Users">
            <div className="card-header">
              <h5>Ultimos Usuarios Recibidos</h5>
              <div className="card-header-right">
                <div className="btn-group card-option">
                  <button
                    type="button"
                    className="btn dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="feather icon-more-horizontal"></i>
                  </button>
                  <ul className="list-unstyled card-option dropdown-menu dropdown-menu-right">
                    <li className="dropdown-item full-card">
                      <a href="#!">
                        <span>
                          <i className="feather icon-maximize"></i> maximize
                        </span>
                        <span style={{ display: "none" }}>
                          <i className="feather icon-minimize"></i> Restore
                        </span>
                      </a>
                    </li>
                    <li className="dropdown-item minimize-card">
                      <a href="#!">
                        <span>
                          <i className="feather icon-minus"></i> collapse
                        </span>
                        <span style={{ display: "none" }}>
                          <i className="feather icon-plus"></i> expand
                        </span>
                      </a>
                    </li>
                    <li className="dropdown-item reload-card">
                      <a href="#!">
                        <i className="feather icon-refresh-cw"></i> reload
                      </a>
                    </li>
                    <li className="dropdown-item close-card">
                      <a href="#!">
                        <i className="feather icon-trash"></i> remove
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-block px-0 py-3">
              <div className="table-responsive">
                <table className="table table-hover">
                  <tbody>
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src="assets/images/user/avatar-1.jpg"
                          alt="activity-user"
                        ></img>
                      </td>
                      <td>
                        <h6 className="mb-1">Isabella Christensen</h6>
                        <p className="m-0">Lorem Ipsum is simply dummy</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fas fa-circle text-c-green f-10 m-r-15"></i>
                          11 MAY 12:56
                        </h6>
                      </td>
                      <td>
                        <a
                          href="#!"
                          className="label theme-bg2 text-white f-12"
                        >
                          Reject
                        </a>
                        <a href="#!" className="label theme-bg text-white f-12">
                          Approve
                        </a>
                      </td>
                    </tr>
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src="assets/images/user/avatar-2.jpg"
                          alt="activity-user"
                        ></img>
                      </td>
                      <td>
                        <h6 className="mb-1">Mathilde Andersen</h6>
                        <p className="m-0">Lorem Ipsum is simply</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fas fa-circle text-c-red f-10 m-r-15"></i>
                          11 MAY 10:35
                        </h6>
                      </td>
                      <td>
                        <a
                          href="#!"
                          className="label theme-bg2 text-white f-12"
                        >
                          Reject
                        </a>
                        <a href="#!" className="label theme-bg text-white f-12">
                          Approve
                        </a>
                      </td>
                    </tr>
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src="assets/images/user/avatar-3.jpg"
                          alt="activity-user"
                        ></img>
                      </td>
                      <td>
                        <h6 className="mb-1">Karla Sorensen</h6>
                        <p className="m-0">Lorem Ipsum is simply dummy</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fas fa-circle text-c-green f-10 m-r-15"></i>
                          9 MAY 17:38
                        </h6>
                      </td>
                      <td>
                        <a
                          href="#!"
                          className="label theme-bg2 text-white f-12"
                        >
                          Reject
                        </a>
                        <a href="#!" className="label theme-bg text-white f-12">
                          Approve
                        </a>
                      </td>
                    </tr>
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src="assets/images/user/avatar-1.jpg"
                          alt="activity-user"
                        ></img>
                      </td>
                      <td>
                        <h6 className="mb-1">Ida Jorgensen</h6>
                        <p className="m-0">Lorem Ipsum is simply</p>
                      </td>
                      <td>
                        <h6 className="text-muted f-w-300">
                          <i className="fas fa-circle text-c-red f-10 m-r-15"></i>
                          19 MAY 12:56
                        </h6>
                      </td>
                      <td>
                        <a
                          href="#!"
                          className="label theme-bg2 text-white f-12"
                        >
                          Reject
                        </a>
                        <a href="#!" className="label theme-bg text-white f-12">
                          Approve
                        </a>
                      </td>
                    </tr>
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src="assets/images/user/avatar-2.jpg"
                          alt="activity-user"
                        ></img>
                      </td>
                      <td>
                        <h6 className="mb-1">Albert Andersen</h6>
                        <p className="m-0">Lorem Ipsum is</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fas fa-circle text-c-green f-10 m-r-15"></i>
                          21 July 12:56
                        </h6>
                      </td>
                      <td>
                        <a
                          href="#!"
                          className="label theme-bg2 text-white f-12"
                        >
                          Reject
                        </a>
                        <a href="#!" className="label theme-bg text-white f-12">
                          Approve
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Configuraciones evento en Vivo</h5>
            </div>
            <div className="card-body">
              {/* <h5>Form controls</h5> */}
              <hr></hr>
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <div className="form-group row">
                      <label
                        for="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Asistencia General
                      </label>
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-danger form-control"
                          title=""
                          data-toggle="tooltip"
                          data-original-title="btn btn-danger"
                        >
                          Activar
                        </button>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        for="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Comentarios en Vivo
                      </label>
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-danger form-control"
                          title=""
                          data-toggle="tooltip"
                          data-original-title="btn btn-danger"
                        >
                          Activar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export const AdminEventLivePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventLivePanelComponent);
