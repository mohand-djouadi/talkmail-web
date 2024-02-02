import React from 'react';
import SideBarPage from '../components/SideBarPage';
import SideBarContact from '../components/SideBarContact';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';

function Chats() {
  return (
    <div
      className="page"
      style={{
        marginLeft: 85,
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <SideBarContact />
      <PageList />
      <PageSelectCont message="select contact" />
    </div>
  );
}

export default Chats;
