// import React, { useEffect, useState } from 'react'
// import ChatList from './ChatList'
// import InputText from './InputText'
// import UserLogin from './UserLogin'
// import socketIOClient from 'socket.io-client'
// import { set } from 'lodash'

// const ChatContener = () => {
//     const [user, setUser] = useState(localStorage.getItem('user'))
//     const socketio = socketIOClient('http://localhost:3002')
//     const [chat, setChat] = useState([])

//     useEffect(() => {
//         socketio.on('chat', (chats) => {
//             setChat(chats)
//         })
//     })

// const sendToSocket = (chat) =>{
//     socketio.emit('chat',chat)
// }

//     const addMessage = (chat) => {
//         const newChat = { ...chat, user: localStorage.getItem('user'), avator: localStorage.getItem('avator') }
//         setChat([...chats, newChat])
//         sendToSocket([...chats, newChat])
//     }
// const Logout = ()=>{
// localStorage.removeItem('user')
// localStorage.removeItem('avator')
// setUser('')
// }

//     return (
//         <div>
//             {user ? (
//                 <div>
//                     <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
//                         <h4>UserName : Satish</h4>
//                         <button onClick={()=>Logout} style={{ height: "2rem", width: "150px" }}>Logout</button>
//                     </div>
//                     <ChatList chats={chat} />
//                     <InputText addMessage={addMessage} />
//                 </div>
//             ) :
//                 <UserLogin setUser={setUser} />
//             }
//         </div>
//     )
// }

// export default ChatContener
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatList from './ChatList';
import InputText from './InputText';
import UserLogin from './UserLogin';


const ChatContener = () => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [chat, setChat] = useState([]);
    const socketio = socketIOClient('http://localhost:3002');

    useEffect(() => {
        socketio.on('new-message', (chats) => {
            setChat(chats);
        });

        return () => {
            socketio.off('new-message');
        };
    }, []);

    const sendToSocket = (newChat) => {
        socketio.emit('new-message', newChat);
    };

    const addMessage = (chatMessage) => {
        const newChat = {
            ...chatMessage,
            user: localStorage.getItem('user'),
            avatar: localStorage.getItem('avatar'),
        };
        setChat((prevChats) => {
            const updatedChats = [...prevChats, newChat];
            sendToSocket(updatedChats);
            return updatedChats;
        });
    };

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('avatar');
        setUser(null);
    };

    return (
        <div className="chat-container">
            {user ? (
                <div className="chat-content">
                    <div className="user-info">
                        <h4 className="username">UserName: {user}</h4>
                        <button onClick={Logout} className="logout-button">Logout</button>
                    </div>
                    <ChatList chats={chat} />
                    <InputText addMessage={addMessage} />
                </div>
            ) : (
                <UserLogin setUser={setUser} />
            )}
        </div>
    );
};

export default ChatContener;
