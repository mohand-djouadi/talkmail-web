import React, { useContext } from 'react';

import { Button } from '@mui/base';
import { SocketContext } from '../context/Context';

function Notifications() {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <div>
      {call.isRecievedCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{call.name} veut rejoindre l'appel</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Accepter
          </Button>
        </div>
      )}
    </div>
  );
}

export default Notifications;
