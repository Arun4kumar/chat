import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats";
import Login from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import Loading from "./Loading";
import Image from "./Image";
import ProfileEditForm from "./ProfileEditForm";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/chats" component={Chats} exact />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
