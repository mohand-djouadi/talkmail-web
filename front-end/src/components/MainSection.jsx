import React from 'react';
import Button from '../components/Button';
import Main from '../assets/home-img.png';
import '../styles/MainSection.css';

function MainSection() {
  return (
    <div className="main-section">
      <div className="text-btn">
        <h1 className="slogan">
          Améliorez vos échanges avec <span>TalkMail !</span> <br></br>Là où la
          messagerie instantanée et l'e-mail fusionnent pour une expérience
          inédite.
          <br></br>
        </h1>
        <br></br>
        <br></br>
        <Button
          btnLink="/signup"
          btnText="Démarrer"
          CustomClass="button-link2"
        />
      </div>

      <div className="main-img">
        <img src={Main} alt="main-pct"></img>
      </div>
    </div>
  );
}
export default MainSection;
