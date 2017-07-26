import React, { PropTypes } from 'react';

const ChatWindow = ({ chatData }) => {
  const baa = 'abc';
  console.log(chatData);
  return (
    <div>
      {chatData.map(data => (
        <div key={data.conv_no}>
          {data.speaker === "Rep" &&
            <div id={data.start_time}>
              <p>User1</p>
              <p>{data.line}</p>
            </div>
          }
          {data.speaker === "Prospect" &&
            <div id={data.start_time}>
              <p>User2</p>
              <p>{data.line}</p>
            </div>
          }
          </div>
      )
      )}
    </div>
  );
}

export default ChatWindow;