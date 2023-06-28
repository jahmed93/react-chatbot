import React, { useEffect, useState } from 'react';

const Setting = ({ modalOpen, setModalOpen }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const saveKey = async (e) => {
    e.preventDefault();
    setErrorMsg('');
  };

  useEffect(() => {
    if (modalOpen) {
      setName(name);
      setEmail(email);
    }
  }, [name, email, modalOpen]);

  return (
    <form onSubmit={saveKey} className="flex flex-col items-center justify-center gap-2">
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
      />

      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
      />
      <button
        className="w-full max-w-xs btn bg-blue-500 text-white border-none hover:bg-blue-500"
        onClick={() => setModalOpen(false)}
      >
        save to localStorage
      </button>

      <p>{errorMsg}</p>
    </form>
  );
};

export default Setting;
