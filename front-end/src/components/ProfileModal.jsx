import { Image } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import React from 'react';

function ProfileModal ({user}) {
  return (
    <div style={{display:'flex', justifyContent:'space-around', alignItems:'space-evently', flexDirection:'column'}}>
      <Avatar
        mr={5}
        size="md"
        cursor="pointer"
        name={user.firstname}
        src={user.pic}
        style={{ width: '8rem', height: '8rem', margin: '0 0 2rem 0' }}
      />
      <h1 style={{ color: '#374957', margin: '2rem 0', fontFamily: 'system-ui' }}>
        {user.firstname} {user.lastname}
      </h1>
      <Typography
        
        fontFamily="Work sans"
      >
        Email : {user.email}
      </Typography>
    </div>
  );
};

export default ProfileModal;