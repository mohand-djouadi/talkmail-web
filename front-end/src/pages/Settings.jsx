import React, { useState } from 'react';
import SideBarPage from '../components/SideBarPage';
import AccountSettingsForm from '../components/AccountSettingsForm';
import PageList from '../components/PageList';

function Settings({ handleLogout }) {
  const [currentSettings, setCurrentSettings] = useState('Parametre de compte');

  const user = JSON.parse(sessionStorage.getItem('user'));

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
      {/* <SideBarPage
        elements={['']}
        path="settings"
        setCurrentSettings={setCurrentSettings}
      /> */}

      <AccountSettingsForm
        handleLogout={handleLogout}
        currentSettings={currentSettings}
      />
    </div>
  );
}

export default Settings;
