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
import { Add } from '@mui/icons-material';
import UserListItem from './UserListItem';
import GroupChatModal from './GroupChatModal';
import '../styles/ChatBox.css';
import '../styles/SearchChat.css';
import { getSender } from '../context/ChatLogics';

function ChatBox({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const fetchChats = async () => {
    const userToken = JSON.parse(sessionStorage.getItem('user')).token;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        'https://talkmail-server.onrender.com/api/chat',
        config,
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
          <div>loadin</div>
        ) : (
          searchResult?.slice(0, 4).map((userr) => (
            <UserListItem
              key={userr._id}
              user={userr}
              handleFunction={() => accessChat(userr)}
              color="white"
            >
              {userr.lastname}
            </UserListItem>
          ))
        )}
        {chats.map((chat) => (
          <Box
            onClick={() => setSelectedChat(chat)}
            cursor="pointer"
            backgroundColor={selectedChat === chat ? '#374957' : '#1a2e62'}
            color={selectedChat === chat ? 'white' : 'white'}
            style={{}}
            px={3}
            py={2}
            borderRadius="lg"
            key={chat._id}
          >
            <Typography>
              {!chat.isGroupChat
                ? chat.users && chat.users.length > 0
                  ? getSender(user, chat.users)
                  : 'unknown sender'
                : chat.chatName}
            </Typography>
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
      <GroupChatModal>
        <Button
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
