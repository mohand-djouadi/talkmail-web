import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';

function Button({ onClick, btnText, btnLink, CustomClass }) {
  const customClasses = `button ${CustomClass}`;

  if (btnLink) {
    return (
      <Link to={btnLink} className={customClasses}>
        {btnText}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} className={customClasses} type="submit">
        {btnText}
      </button>
    );
  }
}

export default Button;
