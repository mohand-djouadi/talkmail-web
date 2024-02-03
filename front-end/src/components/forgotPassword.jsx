import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword({ handleClickOpen, handleClose }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const Notify = (message) => {
    toast.success(message);
  };

  const answerQst = async () => {
    try {
      const resp = await axios.post(
        'https://talkmail-server.onrender.com/api/user/forgot',
        {
          email: email,
          securityAnswer: securityAnswer,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      // If security answer is correct, proceed with password reset
      const resetResp = await axios.post(
        'https://talkmail-server.onrender.com/api/user/reset',
        {
          email: email,
          newPassword: newPassword,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      // return resp.data;

      return resetResp.data;
    } catch (error) {
      console.error('Error from server:', error);
      throw error; // Rethrow the error for the onError callback
    }
  };

  const { mutate } = useMutation(answerQst, {
    onSuccess: (response) => {
      Notify('Mot de passe réinitialisé avec succes !');

      if (response && response.message) {
        console.log('Message from server:', response.message);
      } else {
        console.log('Unexpected response structure:', response);
      }
    },
    onError: (error) => {
      console.error('Error from server:', error);
    },
  });

  return (
    <React.Fragment>
      <Dialog
        open={handleClickOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            try {
              const response = await mutate();
            } catch (error) {
              console.error('Error during mutation:', error);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Reinitialisation de mot de passe :</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour confirmer votre identité, veuillez introduire votre Email et
            répondre à cette question de sécurité, puis saisir un nouveau mot de
            passe
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Adresse mail"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <DialogContentText>
            Choisissez la question de sécurité choisie lors de votre insciption
            :
          </DialogContentText>
          <br></br>
          <br></br>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Questions de sécurité
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={selectedSecurityQuestion}
              onChange={(e) => setSelectedSecurityQuestion(e.target.value)}
            >
              <MenuItem value="animal">
                Quel est le nom de votre premier animal de compagnie ?
              </MenuItem>
              <MenuItem value="teacher">
                Quel est le nom de votre enseignant préféré ?
              </MenuItem>
              <MenuItem value="address">
                Quel est l'adresse de votre maison d'enfance ?
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="securityAnswer"
            label="Votre réponse"
            type="text"
            fullWidth
            variant="standard"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Reset</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ForgotPassword;
