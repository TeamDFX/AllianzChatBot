import React, { useState, useEffect } from "react";
import axios from "axios";

import Search from "./search";
import Messages from "./messages";

import "./index.scss";

function Content() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserName = sessionStorage.getItem("user");

  const sendMessage = (event) => {
    event.preventDefault();
    const message = inputValue;
    if (message.trim() !== "") {
      addUserMessage(` ${getUserName || ""}: ${message}`);
      setInputValue("");
      search(message);
    }
  };

  const search = async (prompt) => {
    const request = {
      prompt,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_NGROK_URL + "/chat",
        request
      );
      addBotMessage(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
  };

  const addBotMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "bot", animation: "pop-in" },
    ]);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "bot") {
      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].animation = "";

          const chatArea = document.querySelector(
            ".content-container__chat__area"
          );
          chatArea.scrollTop = chatArea.scrollHeight;

          return newMessages;
        });
      }, 2000);
    }
  }, [messages]);

  return (
    <div className="content-container">
      <div className="responsive-wrapper">
        <Messages messages={messages} />
        <Search
          inputValue={inputValue}
          setInputValue={setInputValue}
          sendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Content;
