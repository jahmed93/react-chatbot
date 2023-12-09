import React from 'react';
import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import { useState } from 'react';
import Setting from './components/Setting';
import AuthPage from './pages/AuthPage';
import Modal from './components/Modal';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {!isAuth ? (
        <AuthPage isAuth={isAuth} setIsAuth={setIsAuth} userID={userID} setUserID={setUserID} />
      ) : (
        <ChatContextProvider>
          <Modal title="Metamask Details" modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </Modal>
          <div className="flex transition duration-500 ease-in-out">
            <SideBar />
            <ChatView />
          </div>
        </ChatContextProvider>
      )}
    </>
  );
};

export default App;
