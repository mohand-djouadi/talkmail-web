const { createContext, useState, useEffect } = require('react');

const ChatState = createContext();

function ChatContext({ children }) {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    setUser(userInfo);
  }, []);
  return (
    <ChatState.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatState.Provider>
  );
}
export { ChatContext, ChatState };
