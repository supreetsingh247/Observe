import React, { PropTypes } from 'react';
import styles from './Chat.css';

const ChatWindow = ({ chatData }) => {
  const baa = 'abc';
  console.log(chatData);
  const getTime = seconds => new Date(seconds * 1000).toISOString().substr(11, 8);
  return (
    <div id="chat">
      {chatData.map(data => (
        <div key={data.conv_no}>
          {data.speaker === "Rep" &&
            <div id={data.start_time}>
              <p className="user1">
                <span className="x-small grey">{getTime(data.start_time)}</span><br></br>
                {data.line}
              </p>
            </div>
          }
          {data.speaker === "Prospect" &&
            <div id={data.start_time}>
              <p className="user2">
                <span className="x-small grey">{getTime(data.start_time)}</span><br></br>
                {data.line}
              </p>
            </div>
          }
          </div>
      )
      )}
    </div>
  );
}

export default ChatWindow;