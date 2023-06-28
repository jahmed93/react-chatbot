import React, { useState, useContext, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd, MdOutlineSettings } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import logo from '../assets/logo.png';
import Modal from './Modal';
import Setting from './Setting';

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    handleResize();
  }, []);

  const clearChat = () => clearMessages();

  return (
    <section className={` ${open ? 'w-screen lg:w-96' : 'w-16'} sidebar`}>
      <div className="sidebar__app-bar">
        <div className="flex items-center">
          <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'}`}>
            <span className="w-8 h-8">
              <img width="30" src={logo} alt="Logo" />
            </span>
          </div>
          <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'}`}>SelectQuote</h1>
        </div>
        <div className={'sidebar__btn-close'} onClick={() => setOpen(!open)}>
          {open ? (
            <MdChevronLeft className="text-slate-700 sidebar__btn-icon" />
          ) : (
            <MdChevronRight className="text-slate-700 sidebar__btn-icon" />
          )}
        </div>
      </div>
      <div className="nav">
        <span className="border nav__item border-neutral-600" onClick={clearChat}>
          <div className="nav__icons">
            <MdAdd />
          </div>
          <h1 className={`${!open && 'hidden'}`}>New chat</h1>
        </span>
      </div>

      <div className="nav__bottom">
        <div onClick={() => setModalOpen(true)} className="nav">
          <span htmlFor="setting-modal" className="nav__item">
            <div className="nav__icons">
              <MdOutlineSettings />
            </div>
            <h1 className={`${!open && 'hidden'}`}>Settings</h1>
          </span>
        </div>
      </div>
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
    </section>
  );
};

export default SideBar;
