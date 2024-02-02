import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SideBarButton from './SideBarButton';
import SearchChat from './SearchChat';
import ContactInv from './ContactInv';
import noConvers from '../assets/noConvers.png';
import userIcon from '../assets/user.png'
import '../styles/SideBarContact.css';
import ContactLink from './ContactLink'
import Empty from './Empty';
import { useQuery } from 'react-query'; // useQuery pour le GET, useMutate c pr POST PUT DELETE
import React, { memo } from 'react'; // React.memo sert a ne pas faire de re render bla lma3na ;p
import { ChatState } from '../context/ChatContext';
import ChatBox from './ChatBox';

function SideBarContact() {
  const { chats } = useContext(ChatState);
  const [fetchAgain, setFetchAgain] = useState(false);
  
  return (
    <div className="side-bar-contact">
      {chats ? (
        <ChatBox className="contact-nav" fetchAgain={fetchAgain}></ChatBox>
      ) : (
        <Empty message="Select a user to start" width={290} height={290} />
      )}
      
    </div>
  );
}
export default SideBarContact;
