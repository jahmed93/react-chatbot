import React from 'react';

const Setting = ({ prompt, onChange, onCancelClicked, onUseClicked }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <textarea
        className="chatview__textarea-message h-96 overflow-y-scroll"
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="w-full mt-2 max-w-xs btn bg-blue-500 text-white border-none hover:bg-blue-500"
        onClick={onUseClicked}
      >
        Use this prompt
      </button>
      <button
        className="w-full max-w-xs btn bg-slate-100 text-slate-500 hover:bg-slate-200"
        onClick={onCancelClicked}
      >
        Cancel
      </button>
    </div>
  );
};

export default Setting;
