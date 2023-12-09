import React, { useEffect } from 'react';
import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import Setting from './components/Setting';
import AuthPage from './pages/AuthPage';
import Modal from './components/Modal';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    console.log(localStorage.getItem(localStorage.getItem('user')));
    if (localStorage.getItem(localStorage.getItem('user')) == 'true') {
      setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isAuth ? (
              <AuthPage
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                userID={userID}
                setUserID={setUserID}
              />
            ) : (
              <Navigate to="/chat" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            isAuth ? (
              <ChatContextProvider>
                <Modal title="Metamask Details" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                  <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
                </Modal>
                <div className="flex transition duration-500 ease-in-out">
                  <SideBar />
                  <ChatView />
                </div>
              </ChatContextProvider>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
