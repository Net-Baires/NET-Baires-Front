import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

type DialogQuestionProps = {
  openPopup: boolean;
  title: string;
  description: string;
  callbackAccept: () => void;
  callbackCancel?: () => void;
  callbackClose?: () => void;
};
const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export const DialogQuestion: React.SFC<DialogQuestionProps> = ({
  title,
  description,
  openPopup,
  callbackAccept,
  callbackCancel,
  callbackClose,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    setOpen(openPopup);
  }, [openPopup]);
  const handleClose = () => {
    if (callbackClose != null) callbackClose();
    setOpen(false);
    if (callbackCancel != null) callbackCancel();
  };
  const handleCloseAccept = () => {
    setOpen(false);
    callbackAccept();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseAccept} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
