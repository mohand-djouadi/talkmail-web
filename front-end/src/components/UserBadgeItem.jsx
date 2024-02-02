import { Box } from '@mui/material';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

function UserBadgeItem ({user, handleFunction, admin}) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="8%"
      m={1}
      
      fontSize={1}
      backgroundColor="rgb(85, 124, 200)"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      <p style={{display: 'inline-block', fontSize: 15 }}>{user.firstname} {user.lastname}
      {admin === user._id && <span>(Admin)</span>}{' '}</p>
      <CloseIcon style={{ fontSize: 10, margin: '.6rem 0 0 .5rem' }} cursor="pointer"></CloseIcon>
    </Box>
  );
};

export default UserBadgeItem;
