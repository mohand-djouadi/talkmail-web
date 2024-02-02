import '../styles/Button.css';

function SideBarButton({ text, link, onClick }) {
  return (
    <button className="send-button" onClick={onClick}>
      {text}
      {link}
    </button>
  );
}
export default SideBarButton;
