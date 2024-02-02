import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Empty from './Empty';
import noMails from '../assets/noMails.png';
import noFiles from '../assets/noFiles.png';
import noContact from '../assets/noContact.png';
import '../styles/PageList.css';
import MailList from '../components/MailList';
import ChatBox from './ChatBox';
import { useContext } from 'react';
import ChatContext, { ChatState } from '../context/ChatContext';
import SingleChat from './SingleChat';

function PageList(showNewMail, showNewMailList, currentMailBox) {
  // console.log('test', { showNewMail, showNewMailList, currentMailBox });
  let locat = useLocation().pathname;
  let part = locat.split('/');
  const { chats, selectedChat } = useContext(ChatState);
  if (part[1] === 'mails') {
    return (
      <div
        className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 45,
        }}
      >
        {showNewMail ? (
          <MailList currentMailBox={showNewMail.currentMailBox} />
        ) : (
          <Empty
            image={noMails}
            message="you have no mail here"
            width={290}
            height={290}
          />
        )}
      </div>
    );
  } else if (part[1] === 'files') {
    return (
      <div
        className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 45,
        }}
      >
        <Empty
          image={noFiles}
          message="you have no files here"
          width={290}
          height={290}
        />
      </div>
    );
  } else if (part[1] === 'chats') {
    return (
      <div
        // className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          padding: ' 5rem 0 0 0',
          margin: ' 4rem 0 0 0',
          width: '90vw',
          borderRight: '2px solid #aeefeb',
        }}
      >
        {selectedChat ? (
          <SingleChat></SingleChat>
        ) : (
          <Empty
            image={noContact}
            message="Select a user to start chatting"
            width={290}
            height={290}
          />
        )}
      </div>
    );
  }
}
export default PageList;
