import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import { MdSend, MdLightbulbOutline } from 'react-icons/md';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from './Modal';
import Setting from './Setting';
import PromptPerfect from './PromptPerfect';


import { changeChain } from '../metamaskApi/changeChain';
import { sendTransaction } from '../metamaskApi/sendTransaction';
import { sendERC20Token } from '../metamaskApi/sendERC20';
import { swap } from '../metamaskApi/swap';
import { gas1inch } from '../metamaskApi/gas1inch';
import { balance1inch } from '../metamaskApi/getBalances';
import { price1inch } from '../metamaskApi/price1inch';
import { callContractFunction } from '../metamaskApi/callContractFunction';
import { gasApi } from '../metamaskApi/gasApi';

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
    };
    addMessage(newMsg);
  };
  var res;
  const transact = async (object) => {
    for (const element of object) {
      if (element.Tool === 'changeChain') {
        res=await changeChain(element.Args[0].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'sendTransaction') {
        res=await sendTransaction(element.Args[1].Value, element.Args[0].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'sendERC20Token') {
        res=await sendERC20Token(element.Args[1].Value, element.Args[0].Value, element.Args[2].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'swapCurrency') {
        res=await swap(element.Args[0].Value, element.Args[1].Value, element.Args[2].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'getgasprice1inch') {
        res=await gas1inch(element.Args[0].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'getBalance') {
        res=await balance1inch();
        updateMessage(res, true);
      } else if (element.Tool === 'getprice') {
        res=await price1inch(element.Args[0].Value, element.Args[1].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'getgaspriceMetamask') {
        res=await gasApi(element.Args[0].Value);
        updateMessage(res, true);
      } else if (element.Tool === 'callContractFunction') {
        res=await callContractFunction(
          element.Args[0].Value,
          element.Args[2].Value,
          element.Args[3].Value,
          element.Args[4].hash,
        );
        updateMessage(res, true);
      }
    }
  };
  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) return;

    const cleanPrompt = formValue.trim();

    const newMsg = cleanPrompt;

    setFormValue('');
    updateMessage(newMsg, false);
    const response = await axios.post('http://localhost:5000', {
      prompt: cleanPrompt,
    });
    console.log(response.data);
    const res = JSON.parse(response.data);
    if (typeof res === 'string') {
      updateMessage(res, true);
    } else {
      updateMessage('Please follow the steps on the Metamask extension', true);
      var flow = '';
      res.map((element, index) => {
        if (element.Tool === 'changeChain') {
          flow += `Step ${index + 1}: Change chain to ${element.Args[0].Value}\n`;
        } else if (element.Tool === 'sendTransaction') {
          flow += `Step ${index + 1}: Send ${element.Args[0].Value}wei to ${
            element.Args[1].Value
          }\n`;
        } else if (element.Tool === 'sendERC20Token') {
          flow += `Step ${index + 1}: Send ${element.Args[0].Value} ${element.Args[2].Value} to ${
            element.Args[1].Value
          }\n`;
        } else if (element.Tool === 'swapCurrency') {
          flow += `Step ${index + 1}: Swap ${element.Args[0].Value} ${element.Args[1].Value} to ${
            element.Args[2].Value
          } using 1inch\n`;
        } else if (element.Tool === 'getgasprice1inch') {
          flow += `Step ${index + 1}: Get gas price for ${
            element.Args[0].Value
          } chain using 1inch Gas Price Api\n`;
        } else if (element.Tool === 'getBalance') {
          flow += `Step ${index + 1}: Get balance for ${element.Args[0].Value} chain using \n`;
        } else if (element.Tool === 'getprice') {
          flow += `Step ${index + 1}: Get price for ${element.Args[1].Value.join(',')} on ${
            element.Args[0].Value
          } chain\n`;
        } else if (element.Tool === 'getgaspriceMetamask') {
          flow += `Step ${index + 1}: Get gas data for ${
            element.Args[0].Value
          } chain using Metamask Gas Api\n`;
        } else if (element.tool === 'callContractFunction') {
          flow += `Step ${index + 1}: Call ${element.Args[0].Value} function on ${
            element.Args[1].Value
          } contract\n`;
        }
      });
      updateMessage(flow, true);
      transact(res);
    }
    // swapUsing1inch('0.00005', '1inch', 'usdc');
    // gas1inch('bsc');
    // price1inch('bsc', ['usdc', '1inch', 'wbnb']);
    // balance1inch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // 👇 Get input value
      sendMessage(e);
      inputRef.current.style.height = 'auto';
    }
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  const updatePrompt = async () => {
    const api = 'https://us-central1-prompt-ops.cloudfunctions.net/optimize';
    const secretKey = process.env.REACT_APP_API_KEY;

    try {
      setLoading(true);
      const response = await fetch(api, {
        headers: {
          'x-api-key': `token ${secretKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            prompt: formValue.trim(),
            targetModel: 'chatgpt',
          },
        }),
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      setPrompt(responseData.result.promptOptimized);
      setLoading(false);
      setModalPromptOpen(true);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleUseClicked = () => {
    setFormValue(prompt);
    setModalPromptOpen(false);
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  }, [formValue]);

  return (
    <div className="chatview">
      <main className="chatview__chatarea">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        <span ref={messagesEndRef}></span>
      </main>
      <form className="form" onSubmit={sendMessage}>
        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            rows={1}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <div className="flex items-center">
            <button type="submit" className="chatview__btn-send" disabled={!formValue}>
              <MdSend size={30} />
            </button>
            <button
              id="tooltip"
              type="button"
              className="chatview__btn-send"
              disabled={!formValue}
              onClick={updatePrompt}
            >
              {loading ? <div className="loading-spinner" /> : <MdLightbulbOutline size={30} />}
            </button>
          </div>
        </div>
        <ReactTooltip
          anchorId="tooltip"
          place="top"
          variant="dark"
          content="Help me with this prompt!"
        />
      </form>
      <Modal title="Metamask Details" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
      <Modal title="Prompt Perfect" modalOpen={modalPromptOpen} setModalOpen={setModalPromptOpen}>
        <PromptPerfect
          prompt={prompt}
          onChange={setPrompt}
          onCancelClicked={() => setModalPromptOpen(false)}
          onUseClicked={handleUseClicked}
        />
      </Modal>
    </div>
  );
};

export default ChatView;
