import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from 'react-query';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormOTP({ handleCloseOtp, currentOtp, handleLogin, Notify }) {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentOtp == otp) {
      Notify('Connexion réussie !', () => {
        handleLogin();
        navigate('/mails/inbox');
      });
    }
  };

  return (
    <Dialog onClose={handleCloseOtp}>
      <DialogTitle>Two Factors Authentication</DialogTitle>

      <DialogContentText>
        Veuillez saisir le code OTP envoyé vers votre e-mail de sécurité
      </DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="OTP"
        label="Votre code OTP"
        type="text"
        fullWidth
        variant="standard"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <Button onClick={handleCloseOtp}>Annuler</Button>
      <Button onClick={(e) => handleSubmit(e)}>Valider</Button>
    </Dialog>
  );
}

export default FormOTP;
