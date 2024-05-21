import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import img1 from "../assets/images/chat.svg";
import img2 from "../assets/images/bookmark.svg";
import avatar from "../assets/images/profile picture.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import chatLogo from "../assets/images/chat-logo.svg";

export default function Saved({ user }) {
  const getChatsForUser = async (userId) => {
    try {
      const userChatsRef = collection(db, `users/${userId}/chats`);
      const querySnapshot = await getDocs(userChatsRef);
      const chats = querySnapshot.docs.map((doc) => doc.data());
      console.log("Chats:", chats);
      return chats;
    } catch (error) {
      console.error("Error getting chats:", error);
    }
  };
  const [messages, setMessages] = useState();
  useEffect(async () => {
    const data = await getChatsForUser(user?.id);
    setMessages(data);
  }, [user]);

  console.log(messages);

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
        <div className="chat-container">
          {messages?.map((chat, index) => (
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
      </div>
    </div>
  );
}
