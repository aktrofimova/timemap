import React, { useState } from 'react';
import { Snackbar, IconButton, Button }from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SnackbarTM = (props) => {
  const queueRef = React.useRef([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClick = message => () => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
    });

    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event, reason) => {
    // required to prevent snack from closing when user clicked somewhere
    // if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  return (
    <div>
      <Button onClick={handleClick(props.message)}>Show message A</Button>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default SnackbarTM;