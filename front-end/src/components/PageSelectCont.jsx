import Empty from './Empty';
import noSelect from '../assets/noSelected.png';
import Newmessage from './Newmessage';
import '../styles/PageSelectCont.css';
import { useContext } from 'react';
import { ChatState } from '../context/ChatContext';
import SingleChat from './SingleChat';
import { useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { getSenderFull } from '../context/ChatLogics';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import EmailDetailsModal from './EmailDetailsModal';

function PageSelectCont({
  fetchAgain,
  setFetchAgain,
  message,
  showNewMessage,
  showNewMessageForm,
  isEmailModalOpen,
  closeEmailModal,
  setShowNewMessage,
  setReply,
  reply,
  fwd,
  setFwd,
  selectedEmail,
}) {
  const { selectedChat, user } = useContext(ChatState);
  let locat = useLocation().pathname;
  let part = locat.split('/');
  if (part[1] === 'chats') {
    return (
      <div
        // className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 0,
          width: '45vw',
        }}
      >
        {selectedChat ? (
          !selectedChat.isGroupChat ? (
            <ProfileModal user={getSenderFull(user, selectedChat.users)} />
          ) : (
            <UpdateGroupChatModal
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          )
        ) : (
          <Empty image={noSelect} message={message} width={180} height={180} />
        )}
      </div>
    );
  } else
    return (
      <div
        className="page-content"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '34px 65px',
        }}
      >
        {showNewMessage ? (
          <Newmessage reply={reply} fwd={fwd} />
        ) : (
          <>
            {selectedEmail ? (
              <EmailDetailsModal
                emailInfo={selectedEmail}
                isModalOpen={isEmailModalOpen}
                handleClose={closeEmailModal}
                setReply={setReply}
                setShowNewMessage={setShowNewMessage}
                setFwd={setFwd}
              />
            ) : (
              <Empty
                image={noSelect}
                message={message}
                width={180}
                height={180}
              />
            )}
          </>
        )}
      </div>
    );
}
export default PageSelectCont;
