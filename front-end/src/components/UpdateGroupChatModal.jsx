import { Box, Button, TextField, Typography } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close'
import React, { useContext, useState } from 'react';
import { ChatState } from '../context/ChatContext';
import UserBadgeItem from './UserBadgeItem';
import axios from 'axios';
import UserListItem from './UserListItem';

function UpdateGroupChatModal({ fetchAgain, setFetchAgain, fetchMessages }) {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = useContext(ChatState);

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      console.log('Only admins can remove someone!');
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `https://talkmail-server.onrender.com/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config,
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setGroupChatName('');
  };

  const handleRename = async() => {
    if (!groupChatName) {
      return;
    };

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        'https://talkmail-server.onrender.com/api/chat/rename',
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config,
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error);
      setRenameLoading(false);
    }
    setGroupChatName('');
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    };

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`https://talkmail-server.onrender.com/api/user/search?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddUser = async(user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      console.log('Only admins can add someone');
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `https://talkmail-server.onrender.com/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setGroupChatName('');
  }
  return (
    <div>
      <Typography
        fontSize="35px"
        fontFamily="system-ui"
        display="flex"
        color="#374957"
        justifyContent="center"
      >
        {selectedChat.chatName}
      </Typography>
      <Box w="100%" display="flex" flexWrap="wrap">
        {selectedChat.users.map((u) => (
          <Box cursor="pointer" px={3} py={2} borderRadius="lg">
            <div>
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
              {/* <ul style={{ overflowY: scroll }}>
            <li style={{
              listStyle: 'none',
              padding: '.2rem',
            }}>{`${u.firstname } ${u.lastname}`} </li>
          </ul> */}
            </div>
          </Box>
        ))}
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="Chat Name"
          mb={3}
          fullWidth
          variant="outlined"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <Button isLoading={renameloading} onClick={handleRename}>
          Update
        </Button>
      </Box>
      <TextField
        placeholder="Add Users to the group.."
        mb={3}
        fullWidth
        variant="outlined"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        searchResult
          ?.slice(0, 4)
          .map((userr) => (
            <UserListItem
              key={userr._id}
              user={userr}
              handleFunction={() => handleAddUser(userr)}
            />
          ))
      )}
      <Button
        onClick={() => handleRemove(user)}
        style={{
          color: 'black',
          margin: '1.5rem 0 0 6rem',
          backgroundColor: '#557cc8',
        }}
      >
        Leave Group
      </Button>
    </div>
  );
};

export default UpdateGroupChatModal;
