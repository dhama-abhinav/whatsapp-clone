import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase'

export const Chat = () => {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [ {user} ,dispatch] =useStateValue()

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) =>
           doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>>>", input);

    db.collection('rooms').doc(roomId).collection('messages')
    .add({
      message : input,
      user : user.displayName,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {/* <p>Last seen at ...</p> */}
          <p>
            last seen{" "}
            {
              new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
            }
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(message => (
            <p className={`chat__message ${
              message.name === user.displayName && `chat__reciever`}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {
                new Date(message.timestamp?.toDate()).toUTCString()
              }
            </span>
          </p>
        ))}
        
      </div>

      <div className="chat__footer">
        <IconButton>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="type message here"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <IconButton>
          <SettingsVoiceIcon />
        </IconButton>
      </div>
    </div>
  );
};
