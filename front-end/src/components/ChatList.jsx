// import React from 'react'

// const ChatList = ({chats}) => {

//     const user = localStorage.getItem('user')

//     function SenderChat({massage,username,avetar}){
//         return(
//             <div className='sender'>
//                 <img src={avetar} style={{height:"40px",width:'40px',borderRadius:"50%"}} alt="" />
//                 <h4>{username}</h4>
//                 <p>   {massage}</p>
//             </div>
//         )
//     }

//     function ReceiverChat({massage,username,avetar}){
//         return(
//             <div className='recever'>
//                 <img src={avetar} style={{height:"40px",width:'40px',borderRadius:"50%"}} alt="" />
//                 <h4>{username}</h4>
//                 <p> {massage}</p>
//             </div>
//         )
//     }

//   return (
//     <div className='chat_list'>
//         {
//             chats.map((chat,index)=>{
//         if(chat.user===user){
//            return <SenderChat
//            key={index}
//            massage={chat.massage}
//            username={chat.user}
//            avetar={chat.avetar}/>
//         }else{
//             return <ReceiverChat
//             key={index}
//             massage={chat.massage}
//             username={chat.user}
//             avetar={chat.avetar}/>
//         }
//             })
//         }
    
     
//     </div>
//   )
// }

// export default ChatList
import React from 'react';
import './ChatList.css'; // Importing the CSS file

const ChatList = ({ chats = [] }) => {
  const currentUser = localStorage.getItem('user') || 'Guest';

  function ChatBubble({ message, username, avatar, isSender }) {
    return (
      <div className={`bubble-container ${isSender ? 'sender' : 'receiver'}`}>
        {!isSender && <img src={avatar} className="avatar" alt="User Avatar" />}
        <div className={`bubble ${isSender ? 'sender-bubble' : 'receiver-bubble'}`}>
          <h4 className="username">{username}</h4>
          <p className="message">{message}</p>
        </div>
        {isSender && <img src={avatar} className="avatar" alt="User Avatar" />}
      </div>
    );
  }

  return (
    <div className="chat-container">
      {chats.map((chat, index) => (
        <ChatBubble
          key={index}
          message={chat.message}
          username={chat.user}
          avatar={chat.avatar}
          isSender={chat.user === currentUser}
        />
      ))}
    </div>
  );
};

export default ChatList;
