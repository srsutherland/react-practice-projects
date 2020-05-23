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
  comment: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyways. Because bees don't care what humans think is impossible.",
  date: Date.now(),
  replies: 0,
  likes: 0,
  shares:0,
}

function App() {
  return (
    <div className="App">
      <section className="social-container"><SocialCard post={comment1} user={me} /></section>
    </div>
  );
}

export default App;
