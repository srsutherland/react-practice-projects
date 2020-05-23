import React from "react";
import "./SocialCard.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const defaultUser = {
  username: "[deleted]",
  displayname: "Deleted User",
  avatarURL: "logo.svg",
};

class SocialCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      likespoof: 0,
      shared: false,
    };
  }

  render() {
    if (this.props.post === null || !(typeof this.props.post === 'object')) {
      console.error("tried to render empty post")
      return;
    }
    const user = this.props.user || this.props.post.user || defaultUser;
    const date = this.props.post.date;
    console.log((this.props.post.likes || 0) + this.state.likespoof)
    const likecount = (this.props.post.likes || 0) + this.state.likespoof

    return (
      <div className="SocialCard">
        <div className="avatar-container"><div className="avatar avatar-round"><img src={user.avatarURL} alt=""></img></div></div>
        <div className="post-container">
          <div>
            <span className="displayname">{user.displayname || "Unknown"}</span>
            <span className="username"> @{user.username || "unknown"}</span>
            <span className="time"> · <RelativeDate date={date}/></span>
          </div>
          <div className="comment">{this.props.post.comment}</div>
          <div className="button-container">
            <LikeButton liked={this.state.liked} count={likecount} onClick={this.likeClicked}/>
          </div>
        </div>
      </div>
    );
  }

  likeClicked = () => {
    if (!this.state.liked) { //like
      this.setState({liked: true, likespoof: this.state.likespoof + 1})
    } else { //unlike
      this.setState({liked: false, likespoof: this.state.likespoof - 1})
    }
  }
}

class LikeButton extends React.Component {
  render() {
    let liked = this.props.liked || false;
    let count = this.props.count || true;
    let size = this.props.size || "1.8em";
    let color = "lightcoral";
    if (liked) {
      return <span class="LikeButton SocialButton" style={{color: color}} onClick={this.onClick}><AiFillHeart size={size}/>{count ? count : ""}</span>
    } else {
      return <span class="LikeButton SocialButton" onClick={this.onClick}><AiOutlineHeart size={size}/>{count ? count : ""}</span>
    }
  }

  onClick = () => {
    console.log(this.props.liked)
    if (this.props.onClick instanceof Function) {
      console.log(1)
      this.props.onClick()
    }
  }
}

class RelativeDate extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.date)
    if (!this.date) {
      return
    }
    this.fulltime = this.date.toLocaleTimeString() + " " + this.date.toLocaleDateString();
    this.state = {
      relativeTime: getRelativeTime(this.props.date),
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(this.updateRelativeTime.bind(this), 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    if (!this.props.date) {
      return "";
    }
    return (
      <span className="RelativeDate" title={this.fulltime}>
        {this.state.relativeTime}
      </span>
    );
  }

  updateRelativeTime() {
    this.setState({
      relativeTime: getRelativeTime(this.date),
    });
    let timeout = 10000
    const difference = (Date.now() - this.date) / 1000
    if (difference < 60) {
      timeout = 1000
    } else if (difference < 60 * 60) {
      timeout = 20000
    } else if (difference < 60 * 60 * 24) {
      timeout = 1000000
    } else if (difference < 60 * 60 * 24 * 365) {
      return
    }
    setTimeout(this.updateRelativeTime.bind(this), timeout);
  }
}

function getRelativeTime(date) {
  const now = Date.now();

  if (!date) {
    return "";
  }
  if (date > now) {
    return "in the future";
  }
  const seconds = (now - date) / 1000; //seconds
  if (seconds < 60) {
    return `${Math.ceil(seconds)}s ago`;
  }
  const minutes = seconds / 60; //minutes
  if (minutes < 60) {
    return `${Math.round(minutes)}m ago`;
  }
  const hours = minutes / 60; //hours
  if (hours < 24) {
    return `${Math.round(hours)}h ago`;
  }
  const days = hours / 24; //days
  if (days < 7) {
    return `${Math.round(days)}d ago`;
  }
  if (days < 365) {
    return date.toLocaleString("default", { month: "short", day: "numeric" });
  } else {
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

export default SocialCard;
