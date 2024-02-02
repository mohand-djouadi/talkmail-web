import React, { useState, useEffect } from 'react';
import '../styles/AccountSettingsForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function AccountSettingsForm({ email, handleLogout }) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState(user.pic);
  const [loading, setLoading] = useState(false);
  const profilePicture = localStorage.getItem('profilePicture');
  const [tfa, setTfa] = useState(user.twoFA);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm(
      'Voulez vous vraimant vous déconnecter ?',
    );
    if (confirmLogout) {
      handleLogout();
      navigate('/index.html');
    }
  };

  // const handleProfilePicChange = (e) => {
  //   postDetails(e.target.files[0]);
  // };

  // const postDetails = async (pics) => {
  //   setLoading(true);

  //   if (pics === undefined) {
  //     setLoading(false);
  //     console.log('No picture selected');
  //     return;
  //   }

  //   if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
  //     const data = new FormData();
  //     data.append('file', pics);
  //     data.append('upload_preset', 'TalkMail');
  //     data.append('cloud_name', 'dwgulyxkt');

  //     try {
  //       const response = await fetch(
  //         'https://api.cloudinary.com/v1_1/dwgulyxkt/image/upload',
  //         {
  //           method: 'post',
  //           body: data,
  //         },
  //       );

  //       if (!response.ok) {
  //         throw new Error('Error uploading image to Cloudinary');
  //       }

  //       const imageData = await response.json();

  //       console.log('Image uploaded to Cloudinary:', imageData);

  //       // Logg l url
  //       console.log('Profile picture URL:', imageData.url);

  //       setProfilePic(imageData.url.toString());
  //       setLoading(false);
  //     } catch (err) {
  //       console.error('Error uploading image to Cloudinary:', err);
  //       setLoading(false);
  //     }
  //   } else {
  //     setLoading(false);
  //     console.log('Invalid file type. Please upload a JPEG or PNG image.');
  //     return;
  //   }
  // };

  // const handleConfirmProfilePicChange = () => {
  //   const confirmation = window.confirm(
  //     'Do you want to update your profile picture?',
  //   );
  //   if (confirmation) {
  //     updateProfilePicture(profilePic);
  //   } else {
  //     console.log('Profile picture update cancelled by the user');
  //   }
  // };

  // const updateProfilePicture = async (newProfilePicUrl) => {
  //   console.log('Sending profile picture update with URL:', newProfilePicUrl);
  //   try {
  //     const response = await axios.put(
  //       'http://localhost:4001/api/user/changepic',
  //       { newPic: newProfilePicUrl },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     return response.data;

  //     console.log('Profile picture updated in the backend:', response.data);
  //   } catch (error) {
  //     console.error('Error updating profile picture in the backend:', error);
  //   }
  // };

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const response = await changePassword();
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.',
    );

    if (confirmDelete) {
      try {
        const response = await deleteUser();

        handleLogout();
        navigate('/index.html');
      } catch (error) {
        console.error('Deleting user failed', error);
      }
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.put(
        'https://talkmail-server.onrender.com/api/user/changepassword',
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json',
          },
        },
      );
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Ancien mot de passe incorrect. Veuillez réessayer.');
      } else {
        alert(
          "Une erreur s'est produite lors de la modification du mot de passe.",
        );
      }
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://talkmail-server.onrender.com/api/user/delete/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('error deleting user', error);

      throw error;
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmChange = () => {
    localStorage.setItem('profilePicture', profilePic);
    toast.success('Photo changée avec succès');
  };

  const twoFactors = async () => {
    try {
      const response = await axios.put(
        'https://talkmail-server.onrender.com/api/user/2FA',
        {
          twoFA: tfa,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setTfa(response.data.twoFA);
      return response.data;
    } catch (error) {
      console.error('Error from server:', error);
      throw error;
    }
  };

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }, []);

  return (
    <div className="account-settings-form">
      <div className="setting-box">
        <div className="btn-pic-change"></div>
        <label className="option">Changer la photo de profil</label>
        <img
          src={
            profilePic ||
            profilePicture ||
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
          }
          alt="Profile Pic"
          className="profile-pic"
        />
        <input
          className="file-input-style-file"
          placeholder="Charger votre photo de profil"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
        />
        <button className="btn-pic-annuler" onClick={() => setProfilePic('')}>
          Annuler
        </button>
        <button
          className="btn-pic-confirmer"
          disabled={!profilePic}
          onClick={handleConfirmChange}
        >
          Confirmer le changement
        </button>
      </div>

      <div className="setting-box">
        <label className="option">Modifier le mot de passe</label>
        <input
          type="password"
          placeholder="Ancien mot de passe"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <div className="button-container">
          <button onClick={handleSubmit}>
            Enregistrer le nouveau mot de passe
          </button>
          <button className="delete-account-button" onClick={handleDelete}>
            Supprimer le compte
          </button>
          <Link to="/index.html" onClick={handleLogoutClick}>
            <button className="logout-button">Logout</button>
          </Link>
        </div>
        <label>
          Activer l'authentification à deux facteurs
          <input type="checkbox" checked={tfa} onChange={() => twoFactors()} />
        </label>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AccountSettingsForm;
