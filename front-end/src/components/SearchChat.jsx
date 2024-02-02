import { useState } from 'react';
import search from '../assets/search.png';
import '../styles/SearchChat.css';
import axios from 'axios';

function SearchChat({ users, setSearchedUser }) {
  
  function searchUser(sear) {
    const filtredUsers = users.filter((user) => {
      return (
        user.lastname.includes(sear) ||
        user.email.includes(sear) ||
        user.firstname.includes(sear) 
      );
    });
    return filtredUsers;
  }

  return (
    <input
      className="search-cht"
      type="text"
      placeholder="Search"
      name="search-chat"
      onChange={(e) => { setSearchedUser(searchUser(e.target.value)) }}
    />
  );
}
export default SearchChat;
