import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Picker from 'emoji-picker-react';
import { ChatState } from '../context/ChatContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import ScrollableChat from './ScrollableChat';
import '../styles/mailist.css';
import { getSender } from '../context/ChatLogics';
import '../styles/EmojiInput.css';
import Newmessage from './Newmessage';

const ENDPOINT = 'https://talkmail-server.onrender.com';
var socket, selectedChatCompare;

const EmojiIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <circle cx="15.5" cy="9.5" r="1.5" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z" />
    </svg>
  );
};

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event) => {
    setNewMessage((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };

  const { user, selectedChat, setSelectedChat } = useContext(ChatState);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://talkmail-server.onrender.com/api/message/${selectedChat._id}`,
        config,
      );

      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  });

  const sendMessage = async (event) => {
    // if (event.key === 'Enter' && newMessage) {
    socket.emit('stop typing', selectedChat._id);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'https://talkmail-server.onrender.com/api/message',
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config,
      );

      socket.emit('new message', data);
      setNewMessage('');
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
    // }
  };
  const sendByKeyBoard = (e) => {
    if (e.key === 'Enter' && newMessage) {
      sendMessage();
    }
  };

  const typingHandler = (e) => {
    // setNewMessage(e.target.value);

    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // notiff
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <div
      className="convItem"
      style={{
        marginBottom: '4.5rem',
        width: '45vw',
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'space-around',
        border: '1px solid #557bc8',
      }}
    >
      <Typography
        fontSize={{ base: '28px', md: '30px' }}
        pb={3}
        px={2}
        style={{
          backgroundColor: '#557bc8',
          padding: '1rem',
          borderRadius: '1rem 1rem 0 0 ',
        }}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <h5 style={{ float: 'left', fontFamily: 'system-ui' }}>
          {!selectedChat.isGroupChat
            ? getSender(user, selectedChat.users)
            : selectedChat.chatName.toUpperCase()}
        </h5>
        <Button
          display={{ base: 'flex', md: 'none' }}
          onClick={() => setSelectedChat('')}
        >
          <CloseIcon cursor="pointer" style={{ float: 'right' }}></CloseIcon>
        </Button>
      </Typography>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        style={{ flex: 1, backgroundColor: 'rgba(240, 240, 240, 0.5)' }}
      >
        <div style={{ flex: 1 }}>
          {loading ? (
            <div>loading</div>
          ) : (
            <div display="flex" style={{ height: '50vh' }}>
              <ScrollableChat messages={messages} />
            </div>
          )}
        </div>
      </Box>
      <FormControl
        onKeyDown={sendByKeyBoard}
        style={{
          width: '94.5%',
          height: '50px',
          alignSelf: 'center',
          padding: '.8rem 1rem',
          backgroundColor: '#557bc8',
          borderRadius: '0 0 1rem 1rem',
        }}
      >
        {/* <TextField
          style={{ width: '100%', marginTop: '.3rem' }}
          fullWidth
          size="md"
          variant="outlined"
          background="#FFF"
          placeholder="Enter a message... "
          onChange={typingHandler}
          value={newMessage}
        /> */}
        <div className="input-container">
          <div className="input-emoji-wrapper">
            <input
              className="input-field"
              type="Text"
              placeholder="Text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="emoji-icon"
              onClick={() => setShowPicker((val) => !val)}
            >
              <EmojiIcon />
            </button>
          </div>

          <button className="send-button" onClick={sendMessage}>
            send
          </button>
          {showPicker && (
            <div className="picker-container">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </FormControl>
    </div>
  );
}
export default SingleChat;