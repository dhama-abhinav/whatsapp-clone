import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { SidebarChat } from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

export const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [ {user} , dispatch ]=useStateValue()

  useEffect(() => {
   const unsubscribe= db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return ()=>{
      unsubscribe()
    }
  }, []);
  console.log("roomdetails  >>" ,rooms )

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar 
          src={user?.photoURL}
        />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="search.." />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {
          rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))
        }
      </div>
    </div>
  );
};
