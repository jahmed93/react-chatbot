import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
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
    <div>
      {ai ? (
        <div key={id} className={`flex-row-reverse messageai px-10 rounded-lg my-1`}>
          <div className="message__wrapper">
            <ReactMarkdown
              className={'message__markdown text-left'}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || 'language-js');
                  return !inline && match ? (
                    <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}{' '}
                    </code>
                  );
                },
              }}
            >
              {text}
            </ReactMarkdown>

            <div className="text-left message__createdAt">{moment(createdAt).calendar()}</div>
          </div>

          <div className="message__pic">
            <div className="avatar">
              <div className="w-8 border rounded-full">
                {ai ? (
                  <img width="30" src={logo} alt="Logo" />
                ) : (
                  <img src={person} alt="profile pic" />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          key={id}
          className={`flex items-start message px-10 rounded-lg padding my-1 justify-end justify-content: flex-end`}
        >
          <div className="message__wrapper">
            <ReactMarkdown
              className={'message__markdown text-right'}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || 'language-js');
                  return !inline && match ? (
                    <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}{' '}
                    </code>
                  );
                },
              }}
            >
              {text}
            </ReactMarkdown>

            <div className="text-right message__createdAt">{moment(createdAt).calendar()}</div>
          </div>

          <div className="message__pic text-right">
            <div className="avatar">
              <div className="w-8 border rounded-full text-right">
                {ai ? (
                  <img width="30" src={logo} alt="Logo" />
                ) : (
                  <img src={person} alt="profile pic" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
