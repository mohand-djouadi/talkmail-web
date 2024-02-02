import React, { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/mailist.css';
import empStar from '../assets/empStar.png';
import star from '../assets/star.png';
import trash from '../assets/delete.png';
import imp from '../assets/important.png';
import { useQuery } from 'react-query';

function MailList({
  currentMailBox,
  openEmailModal,
  setStar,
  setBin,
  emailInfo,
  setImp,
}) {
  const mailboxFetch = currentMailBox || 'inbox';
  const [selectedEmail, setSelectedEmail] = useState(null);
  // console.log('render');
  const {
    data: mails,
    isLoading,
    isError,
  } = useQuery(['mails', mailboxFetch], fetchMails);

  const mailId = emailInfo ? emailInfo._id : null;

  async function fetchMails() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.get(
        `https://talkmail-server.onrender.com/api/retrieve/retrievemails/${user._id}`,
        {
          params: {
            mailbox: mailboxFetch,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      return Array.isArray(response.data[mailboxFetch])
        ? response.data[mailboxFetch]
        : [];
    } catch (error) {
      console.error('Error fetching mails:', error);
      throw error;
    }
  }

  const handleRowClick = (email) => {
    // console.log('avant de cliquer sur un email');
    openEmailModal(email);
    // console.log('apres avoir cliquer sur un email');
  };

  const handleToggleStar = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));

      const response = await axios.put(
        `https://talkmail-server.onrender.com/api/mail/togglestar`,
        { mailId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      await fetchMails();
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const handleBin = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));

      const response = await axios.put(
        `https://talkmail-server.onrender.com/api/mail/movetobin`,
        { mailId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      await fetchMails();
    } catch (error) {
      console.error('Error moving to bin:', error);
    }
  };

  const handleImp = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));

      const response = await axios.put(
        `https://talkmail-server.onrender.com/api/mail/important`,
        { mailId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      await fetchMails();
    } catch (error) {
      console.error('Error moving to imp:', error);
    }
  };

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des mails</div>;
  }

  return (
    <div className="mail-item">
      <p className="mail-send">
        {currentMailBox === 'outbox'
          ? 'Mails envoyés:'
          : currentMailBox === 'inbox'
            ? 'Mails reçus:'
            : currentMailBox === 'starred'
              ? 'Favoris:'
              : currentMailBox === 'bin'
                ? 'Supprimés:'
                : currentMailBox === 'important'
                  ? 'Mails importants:'
                  : ''}
      </p>
      <TableContainer className="mailist-container" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                {currentMailBox === 'outbox' ? 'Vers' : 'De'}
              </TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Objet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Aucun mail disponible
                </TableCell>
              </TableRow>
            ) : (
              mails.map((mail) => (
                <TableRow key={mail._id} onClick={() => handleRowClick(mail)}>
                  <TableCell component="th" scope="row">
                    {currentMailBox === 'outbox' &&
                    mail.to[0] &&
                    mail.to[0].firstname
                      ? `${mail.to[0].firstname || 'N/A'} ${
                          mail.to[0].lastname || ''
                        }`
                      : currentMailBox === 'inbox' && mail.from
                        ? `${mail.from.firstname || 'N/A'} ${
                            mail.from.lastname || ''
                          }`
                        : currentMailBox === 'starred' && mail.from
                          ? `${mail.from.firstname || 'N/A'} ${
                              mail.from.lastname || ''
                            }`
                          : currentMailBox === 'bin' && mail.from
                            ? `${mail.from.firstname || 'N/A'} ${
                                mail.from.lastname || ''
                              }`
                            : currentMailBox === 'important' && mail.from
                              ? `${mail.from.firstname || 'N/A'} ${
                                  mail.from.lastname || ''
                                }`
                              : 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    {currentMailBox === 'outbox' && mail.to[0]
                      ? mail.to[0].email || 'N/A'
                      : currentMailBox === 'inbox' && mail.from
                        ? mail.from.email || 'N/A'
                        : currentMailBox === 'starred' && mail.from
                          ? mail.from.email || 'N/A'
                          : currentMailBox === 'bin' && mail.from
                            ? mail.from.email || 'N/A'
                            : currentMailBox === 'important' && mail.from
                              ? mail.from.email || 'N/A'
                              : 'N/A'}
                  </TableCell>
                  <TableCell align="right">{mail.subject || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <div>
                      <img
                        src={trash}
                        alt="delete-mail"
                        width={15}
                        height={15}
                        style={{ marginRight: '.5rem' }}
                        // onClick={setBin(true)}
                        onClick={handleBin}
                      />
                      <img
                        src={mail.starred ? star : empStar}
                        alt="favori-mail"
                        width={15}
                        height={15}
                        style={{ marginRight: '.5rem' }}
                        // onClick={setStar(true)}
                        onClick={handleToggleStar}
                      />
                      <img
                        src={imp}
                        alt="important-mail"
                        width={15}
                        height={15}
                        style={{ marginRight: '.5rem' }}
                        // onClick={setBin(true)}
                        onClick={handleImp}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MailList;
