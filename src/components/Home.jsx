// src/components/Home.js
import React, { useState } from "react";

import logo from "../assets/images/logo.svg";
import img1 from "../assets/images/chat.svg";
import img2 from "../assets/images/bookmark.svg";

import avatar from "../assets/images/profile picture.svg";
import chatLogo from "../assets/images/chat-logo.svg";
import sendImg from "../assets/images/send.svg";
import { NavLink } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Home = ({ user }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMsg, setCurrentMsg] = useState();
  console.log(user);
  const API_KEY = "sk-proj-9e4a7iFH90QMoAmRuJtAT3BlbkFJJqMwmQc3t8y1MwuqeDg1";

  const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: "system",
    content:
      " talk like you are doctor and only replay for medical Question like first aid , treatmeant with patient etc... idf.",
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  console.log(messages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    const newMessage = {
      message: currentMsg,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };
    console.log(chatMessages);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  const addChatForUser = async () => {
    try {
      const userChatsRef = collection(db, `users/${user.uid}/chats`);
      const docRef = await addDoc(userChatsRef, { messages });
      console.log("Chat added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding chat:", error);
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="side-bar col-2 ">
        <div className="img-holder">
          <img src={logo} alt="" />
        </div>
        <div className="links d-flex flex-column">
          <NavLink
            to={"/home"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={img1} alt="" />
            Chat
          </NavLink>
          <NavLink
            to={"/saved"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={img2} alt="" />
            Saved
          </NavLink>
        </div>
        <div className="user-data d-flex align-items-center">
          <div className="img-holder">
            <img src={avatar} alt="" />
          </div>
          <p>Rita</p>
        </div>
      </div>

      <div className="layout-content">
        <div
          onClick={addChatForUser}
          style={{ cursor: "pointer", width: "fit-content" }}
          className=" saved"
        >
          asdasds
        </div>
        <div className="chat-container">
          {messages.map((chat, index) => (
            <div
              key={index}
              className={`message ${
                chat.sender === "ChatGPT" ? "bot" : "user"
              }`}
            >
              <div className="img-holder">
                <img
                  src={` ${chat.sender === "ChatGPT" ? chatLogo : avatar}`}
                  alt=""
                />
              </div>
              <p>{chat.message}</p>
            </div>
          ))}
          {/* <div className={`message user`}>
            <div className="img-holder">
              <img src={avatar} alt="" />
            </div>
            <p>Hello there, i need some advice about first aid.</p>
          </div>
          <div className={`message bot`}>
            <div className="img-holder">
              <img src={chatLogo} alt="" />
            </div>
            <p>
              Of course! I'd be happy to help. What specific questions or
              concerns do you have about first aid? Whether it's about treating
              injuries, dealing with emergencies, or anything else related to
              first aid, feel free to ask, and I'll do my best to provide you
              with the information you need.
            </p>
          </div> */}
        </div>
        <div className="input-container">
          <div className="d-flex gap-3">
            <input
              type="text"
              value={currentMsg}
              onChange={(e) => setCurrentMsg(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>
              <img src={sendImg} alt="" />
            </button>
          </div>
          <p className="text-center privacy mt-4">
            ChatMate can make mistakes. Consider checking important information.{" "}
            <span className="blue">Your Privacy & ChatMate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
