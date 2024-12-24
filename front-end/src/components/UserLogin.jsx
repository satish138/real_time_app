// import React, { useState } from 'react'
// import _ from 'lodash';


// const UserLogin = ({ setUser }) => {
//     const [userName, setUserName] = useState()

//     const hendelUser = () => {
//         if (!userName) return;
//         localStorage.setItem('user', userName)
//         setUser(userName)
//         localStorage.setItem('avetor', `https://fastly.picsum.photos/id/${_.random(1, 1000)}/450/300.jpg?hmac=V_LawevwSaVitpQs2t7AnuBi84UPSNl1Qp3PmKkmaXc`)
//     }

//     return (
//         <div className="container">
//             <div className="header">
//                 <h1 className="heading">Chat App</h1>
//             </div>
//             <div className="form">
//                 <input
//                     type="text"
//                     placeholder="Enter your name"
//                     onChange={(e) => setUserName(e.target.value)}
//                     className="input"
//                 />
//                 <button onClick={hendelUser} className="button">Login</button>
//             </div>
//         </div>
//     )
// }

// export default UserLogin;


import React, { useState } from 'react';
import _ from 'lodash';


const UserLogin = ({ setUser }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleUser = () => {
    if (!userName.trim()) {
      setError('Username cannot be empty!');
      return;
    }

    localStorage.setItem('user', userName);
    setUser(userName);

    // Set a random avatar for the user
    const avatarUrl = `https://fastly.picsum.photos/id/${_.random(1, 1000)}/450/300.jpg?hmac=V_LawevwSaVitpQs2t7AnuBi84UPSNl1Qp3PmKkmaXc`;
    localStorage.setItem('avatar', avatarUrl);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="heading">Chat App</h1>
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Enter your name"
          className="input"
          onChange={(e) => {
            setUserName(e.target.value);
            setError('');
          }}
          value={userName}
        />
        {error && <p className="error">{error}</p>}
        <button
          onClick={handleUser}
          className="button"
          disabled={!userName.trim()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
