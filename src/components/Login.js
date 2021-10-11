import React, { useState, useContext } from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import firebase from "firebase/app";
import { auth } from "../firebase";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState();
  const context = useContext(AuthContext);
  const loginHandler = async (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const registerHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
          setError(error);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat</h2>
        {error && <p className="error">{error}</p>}
        {context.error && <p className="error">{context.error}</p>}
        <form onSubmit={newUser ? registerHandler : loginHandler}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="login login-input"
            aria-label="Email"
            placeholder="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="login login-input"
            type="password"
            aria-label="password"
            placeholder="password"
          />
          <button type="submit" className="login login-submit">
            {newUser ? "Register" : "Login"}
          </button>
        </form>

        <p>
          {!newUser ? "New User" : "Already a user"}
          <button
            className="button-register"
            onClick={() => setNewUser(!newUser)}
          >
            {!newUser ? "Register" : "Login"}
          </button>
        </p>

        <h4>Or</h4>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In with Google
        </div>
        <br />
        <div className="login-button facebook">
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
