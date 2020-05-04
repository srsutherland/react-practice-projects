import React from "react";
import "./App.css";
import SocialCard from "./SocialCard";

const me = {
  username: "srsutherland",
  displayname: "Sean Sutherland",
  avatarURL: "https://avatars3.githubusercontent.com/u/12262958",
};

const comment1 = {
  user: me,
  comment: "According to all known laws of aviation, the honeybee",
  date: Date.now(),
  replies: 0,
  likes: 0,
  shares:0,
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SocialCard post={comment1} user={me} />
      </header>
    </div>
  );
}

export default App;
