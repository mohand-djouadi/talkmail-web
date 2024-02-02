import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/Newmessage.css';

function Newmessage({ reply, fwd }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toCc, setToCc] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    console.log('toCc updated:', toCc);
  }, [toCc]);

  useEffect(() => {
    // Mise à jour de toCc lorsque to change
    // console.log('to: ', to);
    setToCc(to.split(/\s+/).filter((email) => email.trim() !== ''));
  }, [to]);

  const submitForm = async (e) => {
    e.preventDefault();

    setToCc(to.split(/\s+/).filter((email) => email.trim() !== ''));
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const formData = new FormData();
      toCc.forEach((email) => {
        formData.append('to', email);
      });
      formData.append('subject', subject);
      formData.append('message', message);
      if (file) {
        formData.append('attachments', file);
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }


      const response = await axios.post(
        'https://talkmail-server.onrender.com/api/mail/sendemail',

        formData,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      alert('Email sent successfully!');

      // Réinitialisation des champs après l'envoi
      setTo('');
      setSubject('');
      setMessage('');
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      if (error.response) {
        console.error('Server respons Data:', error.response.data);
      }
    }
  };

  useEffect(() => {
    if (reply !== null) {
      setTo(reply.from.email);
      setSubject(`Re : ${reply.subject}`);
      setMessage('');
    }
  }, [reply]);

  useEffect(() => {
    if (fwd !== null) {
      setTo('');
      setSubject(`FWD : ${fwd.subject}`);
      setMessage(fwd.message);
    }
  }, [fwd]);

  return (
    <body>
      <form className="form-sendMsg" onSubmit={submitForm}>
        <br></br>
        <p className="mail-send">
          {subject === '' ? 'new mail' : `${subject}`}
        </p>
        <br></br>
        <input
          className="input-sendMsg"
          type="text"
          placeholder="e.g., email1@talkmail.dz email2@talkmail.dz"
          required
          value={to}
          name="to"
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        <input
          className="input-sendMsg"
          type="text"
          placeholder="subject"
          required
          value={subject}
          name="subject"
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="textarea-sendMsg"
          placeholder="Message"
          required
          value={message}
          name="message"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div>
          <input type="file" onChange={handleFile} ref={fileInputRef} />
        </div>

        <Button btnText="Envoyer" />
      </form>
    </body>
  );
}

export default Newmessage;
