import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import SearchOutlined from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams } from "react-router-dom"
import db from "./firebase"
import firebase from "firebase"
import { useStateValue } from "./StateProvider"

function Chat() {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    /*eslint-disable*/
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => (setRoomName
            (snapshot.data().name)) // this goes inside and pulls the data and then it'll get the room name
            );
            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => // here we're mapping through messages object 
                doc.data())) // then getting the data from the messages object and bubbling it into an array and popping it into the mesages array
                );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input)

        db.collection("rooms")
        .doc(roomId).collection("messages")
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {""}
                    {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message  ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                            {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                       
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input}onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
