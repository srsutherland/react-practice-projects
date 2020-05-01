import React from "react";

class SocialCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      shared: false,
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.username?this.props.username:"[deleted]"}:</div>
        <div>I'm a widdle baby</div>
      </div>
    );
  }
}

export default SocialCard;
