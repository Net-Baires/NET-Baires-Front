import { SyntheticEvent, useState, useEffect } from "react";
import React from "react";
import { CardWrapper } from "../../Common/CardWrapper";
import "isomorphic-fetch";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getBadgeByName } from "../../../services/badgesServices";
import { GetBadgeResponse } from "../../../services/models/BadgeDetail";
import { DialogQuestion } from "../../Common/DialogQuestion";
import { loading, ready } from "../../../store/loading/actions";
import { connect } from "react-redux";
import { isEmpty } from "../../../services/objectsservices";

type SelectOneBadgeStateProps = {
  loading: () => void;
  ready: () => void;
};
type SelectOneBadgeProps = {
  assignBadge: (badgeId: number, name: string) => void;
  readyToAssign?: boolean;
};
const SelectOneBadgeComponent: React.SFC<
  SelectOneBadgeProps & SelectOneBadgeStateProps
> = ({ loading, assignBadge, readyToAssign = true }) => {
  const [open, setOpen] = useState(false);
  const [isLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [options, setOptions] = useState<GetBadgeResponse[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<GetBadgeResponse>(
    {} as GetBadgeResponse
  );

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    getBadgeByName("").then((x) => {
      setOptions(x);
    });
    return () => {};
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (readyToAssign && !isEmpty(selectedBadge)) setOpenDialog(true);
  };
  const handleAccept = () => {
    assignBadge(selectedBadge.id, selectedBadge.name);
  };

  return (
    <>
      {selectedBadge && (
        <DialogQuestion
          title="Esta por asignar un Badge"
          description={`Se encuentra por asignar el badge ${selectedBadge.name} al código de grupo correspondiente. Una vez hecho esto no puedo eliminar ni volver para atras esta acción. Esta seguro que desea continuar?`}
          openPopup={openDialog}
          callbackClose={() => setOpenDialog(false)}
          callbackAccept={handleAccept}
        ></DialogQuestion>
      )}
      <CardWrapper
        cardBodyClassName="card-body-md"
        colSize={4}
        cardTitle="Seleccionar Badge"
      >
        <div className="card-block text-center">
          <form>
            <div className="form-group">
              <img
                style={{ maxHeight: "150px", maxWidth: "100%" }}
                src={
                  selectedBadge != null &&
                  selectedBadge.imageUrl != "" &&
                  selectedBadge.imageUrl != null
                    ? selectedBadge.imageUrl
                    : "assets/images/NotFound.png"
                }
                alt="dashboard-user"
              ></img>
            </div>
            <div className="form-group">
              <label>Buscar Badge</label>

              <Autocomplete
                getOptionLabel={(option) => option.name}
                className="badges-autocomplete"
                onChange={(e, value) => setSelectedBadge(value)}
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccionar Badge"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </form>

          <div className="designer m-t-30">
            <a
              onClick={handleSelect}
              href="#!"
              className="btn btn-primary shadow-2 text-uppercase btn-block"
            >
              Asignar
            </a>
          </div>
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
  },
});

export const SelectOneBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOneBadgeComponent);
