import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { useContext } from "react";
import AuthContext, { useAuth } from "../contexts/AuthContext";

import { auth } from "../firebase";
import ProfileEditForm from "./ProfileEditForm";

export default function Chats() {
  const didMountRef = useRef(false);
  const [isShown, setIsShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();
  const ctx = useContext(AuthContext);

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": "6a7e2c70-4979-4395-960f-83a5b5f449ff",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          user.photoURL &&
            getFile(user.photoURL)
              .then((avatar) => {
                formdata.append("avatar", avatar, avatar.name);
              })
              .catch((e) => console.log("e", e.response));

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((e) => {
              ctx.alertError();

              auth.signOut();
              history.push("/");
            });
        });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history]);

  if (!user || loading) return <div />;

  const disableForm = () => {
    setIsShown(false);
  };
  const enableForm = () => {
    setIsShown(true);
  };
  return (
    <>
      {isShown && <ProfileEditForm hide={disableForm} />}
      <div className="chats-page">
        <div className="nav-bar">
          <div className="logo-tab">Unichat</div>
          <div className="logout-tab">
            <div onClick={enableForm}>Update Profile</div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        </div>

        <ChatEngine
          height="calc(100vh - 66px)"
          projectID="6a7e2c70-4979-4395-960f-83a5b5f449ff"
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </>
  );
}
