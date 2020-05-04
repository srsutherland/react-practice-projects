import React from "react";

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
    let dateline;
    if (date) {
      const shorttime = this.getRelativeTime(date);
      const fulltime = this.props.post.date.toLocaleString(date);
      dateline = <span class="time" title={fulltime}>{` · ${shorttime}`}</span>;
    }

    return (
      <div class="socialcard">
        <div>
          <span class="displayname">{user.displayname || "Unknown"}</span>
          <span class="displayname"> @{user.username || "unknown"}</span>
          {dateline}
        </div>
    <div>{this.props.post.comment}</div>
      </div>
    );
  }

  getRelativeTime(date) {
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
      return `${Math.ceil(minutes)}m ago`;
    }
    const hours = minutes / 60; //hours
    if (hours < 24) {
      return `${Math.ceil(hours)}h ago`;
    }
    const days = hours / 24; //days
    if (days < 7) {
      return `${Math.ceil(days)}d ago`;
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
}

export default SocialCard;
