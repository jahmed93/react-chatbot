import React from 'react';
import moment from 'moment';
import person from '../assets/person.png';
import logo from '../assets/logo.png';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false } = props.message;

  return (
    <div
      key={id}
      className={`${ai && 'flex-row-reverse bg-sky-100'} message`}>

      <div className='message__wrapper'>
        <div
          className={`message__markdown ${ai ? 'text-left' : 'text-right'}`}
        >
        	{text}
        </div>

        <div
          className={`${ai ? 'text-left' : 'text-right'} message__createdAt`}>
          {moment(createdAt).calendar()}
        </div>
      </div>

      <div className='message__pic'>
        {ai ? (
          <div className='avatar'>
            <div className='w-8 border rounded-full'>
              <img width="30" src={logo} alt='Logo' />
            </div>
          </div>
        ) : (
          <div className='avatar'>
            <div className='w-8 border rounded-full'>
              <img src={person} alt='profile pic' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
