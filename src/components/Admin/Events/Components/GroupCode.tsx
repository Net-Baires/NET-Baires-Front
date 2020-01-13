import React, { SyntheticEvent, useState } from "react";
import { loading, ready } from "../../../../store/loading/actions";
import { connect } from "react-redux";
import {
  EventLiveDetail,
  GroupCodeResponse
} from "../../../../services/models/Events/EventLiveDetail";
import { CardWrapper } from "../../../Common/CardWrapper";
import { TextField } from "@material-ui/core";
import { createGroupCode } from "../../../../services/eventsServices";
import { successToast } from "../../../../services/toastServices";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import CloseIcon from "@material-ui/icons/Close";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {
  updateGroupCode,
  deleteGroupCode
} from "../../../../services/groupCodesServices";
import { UpdateGroupCode } from "../../../../services/models/UpdateGroupCode";
import { DialogQuestion } from "../../../Common/DialogQuestion";
import { useHistory } from "react-router-dom";
type GroupCodeProps = {
  eventLive: EventLiveDetail;
  updatedEvent: () => void;
  loading: () => void;
  ready: () => void;
};

const GroupCodeComponent: React.SFC<GroupCodeProps> = ({
  eventLive,
  loading,
  updatedEvent,
  ready
}) => {
  const history = useHistory();
  const [detail, setDetail] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    loading();
    createGroupCode(eventLive.id, detail).then(x => {
      ready();
      updatedEvent();
      setDetail("");
      successToast(`Nuevo código creado: ${x.code}`);
    });
  };
  const handleUpdateGroupCode = (
    event: any,
    groupCode: GroupCodeResponse,
    groupUpdate: UpdateGroupCode
  ) => {
    setAnchorEl(null);
    event.preventDefault();
    loading();
    updateGroupCode(groupCode.id, groupUpdate).then(() => {
      ready();
      if (groupUpdate.open) updatedEvent();
    });
  };
  const handleDelete = (event: any, groupCode: GroupCodeResponse) => {
    setAnchorEl(null);
    event.preventDefault();
    setOpenPopup(true);
    loading();
    deleteGroupCode(groupCode.id).then(() => {
      ready();
      updatedEvent();
    });
  };
  const handlePanel = (e: any, groupCode: GroupCodeResponse) => {
    history.push(
      `/app/events/${eventLive.id}/live/groupcodes/${groupCode.id}/panel`
    );
    "/events/:id/live/groupcodes/:id/panel";
  };
  const handleAccept = () => {};
  return (
    <>
      <DialogQuestion
        title="Eliminar Código de Grupo"
        description={`El código que intenga eliminar tiene miembros registrados. Esta seguro que desea eliminarlo de todas formas?`}
        openPopup={openPopup}
        callbackAccept={handleAccept}
      ></DialogQuestion>

      {eventLive.groupCodes && (
        <CardWrapper
          cardBodyClassName="general-small-card-body-size"
          colSize={6}
          cardTitle="Código para grupos"
        >
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="d-none d-sm-block">Id</th>
                  <th>Código</th>
                  <th className="d-none d-sm-block">Detalle</th>
                  <th>Registrados</th>
                  <th className="d-none d-sm-block">Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {eventLive.groupCodes.map(groupCode => (
                  <tr>
                    <td className="d-none d-sm-block">{groupCode.id}</td>
                    <td>
                      <h6 className="mb-1">{groupCode.code}</h6>
                      {/* <p className="m-0">Apple</p> */}
                    </td>
                    <td className="d-none d-sm-block">
                      <h6 className="mb-1">{groupCode.detail}</h6>
                      {/* <p className="text-c-green m-0">+ 84 Daily</p> */}
                    </td>
                    <td>
                      <h6 className="m-b-0">{groupCode.membersCount}</h6>
                    </td>
                    <td className="d-none d-sm-block">
                      {groupCode.open ? (
                        <a href="#!" className="label theme-bg text-white f-12">
                          Abierto
                        </a>
                      ) : (
                        <a
                          href="#!"
                          className="label theme-bg2 text-white f-12"
                        >
                          Cerrado
                        </a>
                      )}
                    </td>
                    <td>
                      <h6 className="m-b-0">
                        <div>
                          <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            className="btn btn-glow-primary btn-primary"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                          >
                            ...
                          </Button>
                          <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <StyledMenuItem
                              onClick={e => handleDelete(e, groupCode)}
                            >
                              <ListItemIcon>
                                <HighlightOffIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Eliminar" />
                            </StyledMenuItem>
                            <StyledMenuItem
                              onClick={e => handlePanel(e, groupCode)}
                            >
                              <ListItemIcon>
                                <OpenWithIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Abrir Portal" />
                            </StyledMenuItem>
                            {groupCode.open ? (
                              <StyledMenuItem
                                onClick={e =>
                                  handleUpdateGroupCode(e, groupCode, {
                                    open: false
                                  })
                                }
                              >
                                <ListItemIcon>
                                  <CloseIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Cerrar" />
                              </StyledMenuItem>
                            ) : (
                              <StyledMenuItem
                                onClick={e =>
                                  handleUpdateGroupCode(e, groupCode, {
                                    open: true
                                  })
                                }
                              >
                                <ListItemIcon>
                                  <LockOpenIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Abrir" />
                              </StyledMenuItem>
                            )}
                          </StyledMenu>
                        </div>
                      </h6>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardWrapper>
      )}
      <CardWrapper colSize={3} cardTitle="Crear Código para Grupos">
        <TextField
          value={detail}
          onChange={e => setDetail(e.target.value)}
          className="text-field-cotainer-full-width"
          id="outlined-basic"
          label="Descripción"
          variant="outlined"
        />
        <div className="designer m-t-30">
          <a
            onClick={handleSearch}
            href="#!"
            className="btn btn-primary shadow-2 text-uppercase btn-block"
          >
            Crear Código
          </a>
        </div>
      </CardWrapper>
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

export const GroupCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCodeComponent);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
