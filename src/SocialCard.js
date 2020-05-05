import React from "react";
import "./SocialCard.css";

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
      shared: false,
    };
  }

  render() {
    const user = this.props.user || this.props.post.user || defaultUser;
    const date = this.props.post.date;

    return (
      <div className="SocialCard">
        <div className="avatar-container"><div className="avatar avatar-round"><img src={user.avatarURL} alt=""></img></div></div>
        <div className="post-container">
          <div>
            <span className="displayname">{user.displayname || "Unknown"}</span>
            <span className="username"> @{user.username || "unknown"}</span>
            <span className="time"> · <RelativeDate date={date}/></span>
          </div>
          <div>{this.props.post.comment}</div>
        </div>
      </div>
    );
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
      <span className="relativetime" title={this.fulltime}>
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
