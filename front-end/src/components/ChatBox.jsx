import React, { useContext, useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContext';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import {
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  ModalClose,
  ModalDialog,
  Stack,
} from '@mui/joy';
import { Add, Call } from '@mui/icons-material';
import UserListItem from './UserListItem';
import GroupChatModal from './GroupChatModal';
import '../styles/ChatBox.css';
import '../styles/SearchChat.css';
import { getSender } from '../context/ChatLogics';
// import ringtone from '../sounds/incomingcall.mp3';

function ChatBox({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [callingUser, setCallingUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats, selectedChat } =
    useContext(ChatState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVoiceCall = async (chatId, user) => {
    // Ouvrir la modal et définir les informations de la personne appelée
    setOpenModal(true);
    setCallingUser(user);

    try {
      const user = JSON.parse(sessionStorage.getItem('user'))
      // Envoyer une demande au serveur pour démarrer l'appel vocal avec l'ID de la conversation ou de l'utilisateur
      const { data } = await axios.post(
        `https://talkmail-server.onrender.com/api/chat/${chatId}/voice-call`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      console.log('Voice call started:', data);
      // Gérer la réponse du serveur et les actions nécessaires
    } catch (error) {
      console.log('Error starting voice call:', error);
    }
  };

  const fetchChats = async () => {
    const userToken = JSON.parse(sessionStorage.getItem('user')).token;

    try {
      
      const { data } = await axios.get(
        'https://talkmail-server.onrender.com/api/chat',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://talkmail-server.onrender.com/api/user/search?search=${search}`,
        config,
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'https://talkmail-server.onrender.com/api/chat',
        { userId },
        config,
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="contact-nav">
      <Input
        placeholder="Search"
        className="search-cht"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="contact-list" style={{ color: 'white' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          searchResult?.slice(0, 4).map((user) => (
            <UserListItem
              className="chat-box-text"
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user)}
              color="white"
            >
              {user.lastname}
            </UserListItem>
          ))
        )}
        {chats.map((chat) => (
          <Box
            className="chat-box-text"
            onClick={() => setSelectedChat(chat)}
            cursor="pointer"
            border={1}
            backgroundColor={selectedChat === chat ? '#89badf' : '#557cc8c4'}
            color={selectedChat === chat ? 'white' : 'white'}
            style={{}}
            px={3}
            py={2}
            borderRadius="lg"
            key={chat.id}
          >
            <Typography className="chat-box-text">
              {!chat.isGroupChat
                ? chat.users && chat.users.length > 0
                  ? getSender(user, chat.users)
                  : 'Unknown sender'
                : chat.chatName}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleVoiceCall(chat._id)}
              startIcon={<Call />}
            >
              Voice Call
            </Button>
            {chat.latestMessage && (
              <p fontSize="xs">
                <b>{chat.latestMessage?.sender?.firstname} : </b>

                {chat.latestMessage.content.length > 50
                  ? chat.latestMessage.content.substring(0, 51) + '...'
                  : chat.latestMessage.content}
              </p>
            )}
          </Box>
        ))}
      </div>
      {/* Modal pour l'appel vocal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Contenu de la modal */}
          <Typography variant="h5" align="center" gutterBottom>
            Appel en cours...
          </Typography>
          {callingUser && (
            <>
              <img
                src={
                  localStorage.getItem('profilePic') ||
                  'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
                }
                alt="Profile Pic"
                className="profile-pic"
              />{' '}
              <Typography variant="h6" align="center" gutterBottom>
                {callingUser.name}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
      <GroupChatModal>
        <Button
          className="chat-box-text"
          style={{ margin: '1.5rem', backgroundColor: '#557cc8' }}
          variant="filled"
          onClick={handleClickOpen}
        >
          New Group Chat
        </Button>
      </GroupChatModal>
    </div>
  );
}

export default ChatBox;
