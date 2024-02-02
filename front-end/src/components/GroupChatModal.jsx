import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ChatState } from '../context/ChatContext';

import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';

function GroupChatModal({ children }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setSelectedChat, chats, setChats, selectedChat } =
    useContext(ChatState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'https://talkmail-server.onrender.com/api/chat/group',
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config,
      );

      setChats([data, ...chats]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log('user already added');
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <div>
      <Button variant="filled" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        fullWidth
        style={{ padding: '40px' }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          id="alert-dialog-title"
          fontSize="25px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
        >
          <Typography>
            {groupChatName !== '' ? groupChatName : 'Create Group Chat'}
          </Typography>
        </DialogTitle>
        <DialogContent display="flex" flexDir="column" alignItems="center">
          <TextField
            placeholder="Chat Name"
            mb={3}
            fullWidth
            variant="outlined"
            onChange={(e) => setGroupChatName(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            placeholder="Add Users to the group.."
            mb={3}
            fullWidth
            variant="outlined"
            onChange={(ee) => handleSearch(ee.target.value)}
          />
          <Box w="100%" display="flex" flexWrap="wrap">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              ></UserBadgeItem>
            ))}
          </Box>
          {loading ? (
            <div>loading</div>
          ) : (
            searchResult
              ?.slice(0, 4)
              .map((userr) => (
                <UserListItem
                  key={userr._id}
                  user={userr}
                  handleFunction={() => handleGroup(userr)}
                ></UserListItem>
              ))
          )}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSubmit}>
            Create
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GroupChatModal;
