import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import notification from '../assets/notification.png';
import logout from '../assets/logout.png';

function Header({ handleLogout }) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  const hadnleLogoutClick = () => {
    const confirmLogout = window.confirm(
      'Voulez vous vraimant vous déconnecter ?',
    );
    if (confirmLogout) {
      sessionStorage.removeItem('user')
      handleLogout();
      navigate('/index.html');
    }
  };

  return (
    <header>
      <div className="profile-pic">
        <img src={user.pic} alt="Profile" width="30" height="30" />
      </div>
      <p className="user-session">
        {user && `${user.firstname} ${user.lastname}`}
      </p>
      <ul className="menu">
        <li>
          <img
            src={notification}
            alt="notification-icon"
            width={32}
            height={32}
          />
        </li>
        <li>
          <Link to="/index.html" onClick={hadnleLogoutClick}>
            <img
              src={logout}
              alt="logout-icon"
              style={{ color: 'gray' }}
              width={28}
              height={30}
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
