// UserContext.js
import React from 'react';

const UserContext = React.createContext();

export default UserContext;

// UserProvider.js
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const login = async (email, password) => {
    try {
      const url = `/account/login/${email}/${password}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.length !== 0) {
        setAuth(true);
        setEmail(email);
        setUser(email);
      } else {
        throw new Error('Login failed: Enter a valid username and password');
      }
    } catch (error) {
      throw new Error('An error occurred during login');
    }
  };

  const logout = () => {
    setAuth(false);
    setEmail('');
    setPassword('');
    setUser('');
  };

  const contextValue = {
    auth,
    email,
    password,
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserProvider;

// Login.js
import React, { useState, useContext } from 'react';
import UserContext from './UserContext';

function Login() {
  const ctx = useContext(UserContext);
  const [status, setStatus] = useState(null);

  const handleLogin = () => {
    if (ctx.email !== '' && ctx.password !== '') {
      ctx.login(ctx.email, ctx.password)
        .then(() => {
          console.log('Logged in! ' + ctx.email);
          setStatus(null);
        })
        .catch((error) => {
          setStatus(error.message);
        });
    } else {
      setStatus('Enter an email and password');
    }
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <Card
      bgcolor="primary"
      header="Customer Login"
      text=""
      status={status}
      body={
        <>
          {status && <p>{status}</p>}
          <CardForm setShow={ctx.logout} showName="none" showAmount="none" />
          <button type="submit" className="btn btn-light" onClick={handleLogin}>
            Login
          </button>
        </>
      }
    />
  );
}

// LoggedIn.js
import React, { useContext } from 'react';
import UserContext from './UserContext';

function LoggedIn(props) {
  const ctx = useContext(UserContext);

  const handleLogout = () => {
    ctx.logout();
    props.setShow(true);
    props.setCurrUser('');
  };

  return (
    <>
      <h5>You are logged in!</h5>
      <br />
      <button type="submit" className="btn btn-light" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
