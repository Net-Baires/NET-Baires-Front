import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ATHS from "add-to-homescreen-control";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { errorToast } from "../../services/toastServices";
var mobile = require("is-mobile");

type DialogInstallPwaProps = {};

export const DialogInstallPwa: React.SFC<DialogInstallPwaProps> = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [installing, setInstalling] = React.useState(false);
  const [installed, setInstalled] = React.useState(false);

  useEffect(() => {
    var isInstalled: boolean = window.matchMedia("(display-mode: standalone)")
      .matches;
    if (!isInstalled)
      setTimeout(() => {
        setOpenDialog(true);
      }, 10000);
  }, []);
  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => { }, []);
  const installHandler = () => {
    setInstalling(true);
    ATHS.prompt()
      .then(({ outcome }: any) => {
        setInstalling(false);
        setInstalled(true);
        setOpenDialog(false);
        console.log(
          "user interacted with ATHS banner with outcome of",
          outcome
        );
      })
      .catch((err: any) => {
        errorToast("Se produjo un error al intentar instalar la PWA.");
        setOpenDialog(false);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog open={openDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Instalar NET-Baires App
        </DialogTitle>
        <DialogContent>
          {!installing ? (
            <>
              <div
                className={classes.imageTitleContainer}
                style={{ textAlign: "center" }}
              >
                <img
                  className={classes.imageTitle}
                  src="assets/images/Logo-Blanco.png"
                />
              </div>
              <DialogContentText>
                Instale nuestra PWA, para estar al tanto de todos los eventos y
                para poder participar en todas nuestras actividades
              </DialogContentText>
            </>
          ) : !installed ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
              <h5>Instalando, por favor aguarde.</h5>
            </div>
          ) : (
                <div style={{ textAlign: "center" }}>
                  <CheckIcon style={{ color: "green" }} />
                  <h5>Aplicación instalada Exitosamente.</h5>
                  <button
                    data-tip="Sincronizar evento"
                    type="button"
                    onClick={e => handleClose(e)}
                    className="btn btn-info events-actions-button"
                  >
                    Cerrar
              </button>
                </div>
              )}
        </DialogContent>
        <DialogActions>
          {!installing && (
            <>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={installHandler} color="primary">
                Instalar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageTitleContainer: {
      textAlign: "center"
    },
    imageTitle: {
      height: "80px",
      marginBottom: "0px"
    }
  })
);
