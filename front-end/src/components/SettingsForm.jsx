import '../styles/SettingsForm.css';

function SettingsForm() {
  return (
    <form className="settings-form">
      <div className="setting-box">
        <label className="option">Thème</label>
        <div className="values">
          <input type="radio" id="default" name="theme" />
          <label for="default">Par défaut</label>
        </div>
        <div className="values">
          <input type="radio" id="dark" name="theme" />
          <label for="light">Sombre</label>
        </div>
        <div className="values">
          <input type="radio" id="ight" name="theme" />
          <label for="dark">Claire</label>
        </div>
      </div>
      <div className="setting-box">
        <label className="option">Action pour les notification</label>
        <div className="values">
          <input type="radio" id="archiver" name="notAction" />
          <label for="archiver">Archiver</label>
        </div>
        <div className="values">
          <input type="radio" id="supprimer" name="notAction" />
          <label for="supprimer">Supprimer</label>
        </div>
      </div>
      <div className="setting-box">Gestion des notifications</div>
      <div className="setting-box">
        <label className="option">Densité de la list des conversations</label>
        <div className="values">
          <input type="radio" id="parDef" name="densite" />
          <label for="parDef">Par défaut</label>
        </div>
        <div className="values">
          <input type="radio" id="compact" name="densite" />
          <label for="normal">Compact</label>
        </div>
        <div className="values">
          <input type="radio" id="normal" name="densite" />
          <label for="normal">Normal</label>
        </div>
      </div>
      <div className="setting-box">
        <label className="option">Type de réponse au mails/chats</label>
        <div className="values">
          <input type="radio" id="repTous" name="reponse" />
          <label for="rep">Répondre à tous</label>
        </div>
        <div className="values">
          <input type="radio" id="rep" name="reponse" />
          <label for="repTous">Répondre</label>
        </div>
      </div>
      <div className="setting-checkbox">
        <label className="option">Confirmer les actions:</label>
        <div className="values">
          <input type="checkbox" id="suppression" name="suppression" />
          <label for="suppression">Confirmer avant suppression</label>
        </div>
        <div className="values">
          <input type="checkbox" id="archivage" name="archivage" />
          <label for="archivage">Confirmer avant archivage</label>
        </div>
        <div className="values">
          <input type="checkbox" id="envoi" name="envoi" />
          <label for="envoi">Confirmer avant l'envoie</label>s
        </div>
      </div>
    </form>
  );
}
export default SettingsForm;
