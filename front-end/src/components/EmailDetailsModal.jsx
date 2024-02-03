import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/EmailDetailsModal.css';
import { format } from 'date-fns'
import axios from 'axios';

const EmailDetailsModal = ({
  emailInfo,
  isModalOpen,
  handleClose,
  showNewMessage,
  setReply,
  setShowNewMessage,
  setFwd,
}) => {
  const mailbox = useParams();

  if (!isModalOpen || !emailInfo) {
    return null;
  }

  const formattedDate = format(
    new Date(emailInfo.createdAt),
    'dd/MM/yyyy HH:mm:ss',
  );

  const handleReply = () => {
    setReply(emailInfo);
    setShowNewMessage(true);
  };

  const handleForward = () => {
    setFwd(emailInfo);
    setShowNewMessage(true);
  };

  const handleDownload = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
      const response = await axios.get(
        `https://talkmail-server.onrender.com/api/mail/downloadFile/${emailInfo.attachments[0].filename}`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', emailInfo.attachments[0].filename);
      console.log('Downloading file:', emailInfo.attachments[0].filename);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="email-details-modal-container">
      <div className="email-details-modal">
        <Typography variant="h5" className="Principal-text">
          Email Details
        </Typography>
        <div className="email-details-content">
          <Typography className="Date-details">{formattedDate}</Typography>
          <div className="typography-details-container">
            <Typography className="Typography-details">
              {mailbox.category !== 'outbox'
                ? `From: ${emailInfo.from?.firstname || 'N/A'}
                ${emailInfo.from?.lastname || 'N/A'}`
                : `To: ${emailInfo.to?.firstname || 'N/A'}
                ${emailInfo.to?.lastname || 'N/A'}`}
            </Typography>
            <Typography className="Typography-details">
              Email: {emailInfo.from?.email || 'N/A'}
            </Typography>
            <Typography className="Typography-details">
              Subject: {emailInfo.subject || 'N/A'}
            </Typography>
          </div>
          <img
            className="send-rec-pic"
            src={emailInfo.from?.pic}
            alt="send-pic"
            height={75}
            width={75}
          />
        </div>

        <div className="message-container">
          <Typography className="Typography-detail-message">
            {emailInfo.message || 'N/A'}
          </Typography>
          {emailInfo.attachments && emailInfo.attachments.length > 0 && (
  <div className="attachments-section">
    <Typography className="Typography-details">
      Attachments:
    </Typography>
    <ul>
      {emailInfo.attachments.map((attachment) => (
        <li key={attachment._id}>
          <button onClick={() => handleDownload(attachment)}>
            Télécharger {attachment.filename}
          </button>
        </li>
      ))}
    </ul>
  </div>
)}

        </div>
        <div className="button-container-mail">
          <Button onClick={handleReply} className="Button-modal">
            Répondre
          </Button>
          <Button onClick={handleForward} className="Button-modal">
            Transférer
          </Button>
        </div>
        <Button onClick={() => handleClose()} className="Button-modal-close">
          Close
        </Button>
      </div>
    </div>
  );
};

export default EmailDetailsModal;
