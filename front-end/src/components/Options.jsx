import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { SocketContext } from '../context/Context';

function Options({ children }) {
  const { me, callAccepted, name, setName, leaveCall, callUser, callEnded } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  return (
    <Container>
      <Paper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Account info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me}>
                <Button variant="contained" color="primary" fullWidth>
                  copy your id
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="Id to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullwidth
                  onClick={leaveCall}
                >
                  Quitter L'Appel
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => callUser(idToCall)}
                >
                  Rejoindre
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}

export default Options;
