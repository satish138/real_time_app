// import React, { useState } from 'react';

// const InputText = ({ addMessage }) => {
//   const [massage, setMassage] = useState('');

//   const sendMassage = () => {
//     if (!massage) return
//     addMessage({ massage })
//     setMassage('')
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '5vh' }}>
//       <textarea
//         style={{ width: '400px', borderRadius: '10px' }}
//         name="message"
//         id="message"
//         placeholder="Message"
//         rows="6"
//         value={massage}
//         onChange={(e) => setMassage(e.target.value)}
//       />
//       <button style={{ width: '60px', marginLeft: '20px' }} onClick={sendMassage}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default InputText;

import React, { useState } from 'react';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!message.trim()) {
      alert('Message cannot be empty!');
      return;
    }
    // Pass the message back to the parent component via addMessage
    addMessage({ message });
    setMessage('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        margin: '10px 0',
        position: 'fixed',
        bottom: '10px',
        left: '560px',
      }}
    >
      <label htmlFor="message" style={{ display: 'none' }}>Message:</label>
      <textarea
        id="message"
        name="message"
        placeholder="Type your message here..."
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: '300px',
          height: '2rem',
          borderRadius: '10px',
          border: '1px solid #ccc',
          padding: '10px',
          fontSize: '14px',
          resize: 'none',
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default InputText;
