import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'; // Corrected the import

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function CodeBlockPage({ block }) {
  const [codeContent, setCodeContent] = useState(block.content);
  const [title, setTitle] = useState(block); // Corrected the state variable name

  const codeBlock = useRef('');

  const socket = io('http://localhost:5000'); // Renamed Socket to socket
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/findOneCodeBlock/${block._id}`)
      .then(res => {
        setCodeContent(res.data.content);
        codeBlock.current.value = res.data.content;
      })
      .catch(err => {
        console.log(err);
      });
    socket.emit('join', {
      room: block._id,
    });
    socket.on('updateBack', ({ content }) => {
      console.log('herer');
      setCodeContent(content);
      codeBlock.current.value = content; // Corrected the state setter function name
    });

    socket.on('updateTitleBack', ({ title }) => {
      setTitle(title);
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []); // Added an empty dependency array to run the effect only once when mounted

  const updateCode = async e => {
    e.preventDefault();
    setCodeContent(codeBlock.current.value);
    socket.emit('update', {
      id: block._id,
      content: codeBlock.current.value,
    });
  };

  const updateTitle = async e => {
    e.preventDefault();
    socket.emit('updateTitle', {
      id: block._id,
      title: title,
    });
  };

  return (
    <div>
      {block._id}
      <textarea
        ref={codeBlock}
        className="TextArea"
        onChange={e => updateCode(e)}
      ></textarea>
    </div>
  );
}

export default CodeBlockPage;
