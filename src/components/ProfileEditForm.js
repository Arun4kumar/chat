import React, { useState } from "react";
import axios from "axios";
import "firebase/app";
import firebase from "firebase/app";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import Image from "./Image";
import Model from "./Model";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const ProfileEditForm = (props) => {
  const { displayName, photoURL, email } = auth.currentUser;
  const ctx = useContext(AuthContext);
  const [emailNew, setEmail] = useState(email);

  const [username, setUsername] = useState(displayName);
  const [passwordNew, setPassword] = useState();
  const [photo, setPhotoUrl] = useState(photoURL);
  const getPhotoUrl = (url) => {
    setPhotoUrl(url);
  };
  const history = useHistory();
  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }
  const submitHandler = (e) => {
    e.preventDefault();

    auth.currentUser
      .updateProfile({ displayName: username, photoURL: photo })
      .then((res) => {
        const { email, secret, uid } = auth.currentUser;
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("secret", uid);
        photo &&
          getFile(photo)
            .then((avatar) => {
              formdata.append("avatar", avatar, avatar.name);
            })
            .catch((e) => console.log("e", e.response));

        axios
          .patch("https://api.chatengine.io/users/me", formdata, {
            headers: {
              "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
            },
          })
          .then(() => {})
          .catch((e) => {
            ctx.alertError();

            auth.signOut();
            history.push("/");
          });
      })
      .catch((error) => {
        console.log(error);
      });

    {
      emailNew !== email &&
        auth.currentUser
          .updateEmail(email)
          .then((res) => {
            console.log(auth.currentUser);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    {
      passwordNew &&
        auth.currentUser
          .updatePassword(passwordNew)
          .then((res) => {
            console.log(auth.currentUser);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };
  return (
    <Model>
      <h2>Update Profile</h2>
      <button
        className="profile-close"
        onClick={() => {
          props.hide();
        }}
      >
        X
      </button>
      {photo && <img className="image-preview" src={photo} alt="profile.png" />}
      <Image getPhotoData={getPhotoUrl} />
      <form className="form" onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          value={displayName}
          className="login login-input"
          aria-label="Username"
          placeholder="username"
        />

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={emailNew}
          type="email"
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
          Update
        </button>
      </form>
    </Model>
  );
};

export default ProfileEditForm;
