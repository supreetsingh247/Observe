import React from 'react';
import ChatWindow from './ChatWindow';
import styles from './Chat.css';

const Chat = ({ searchTerm, handleChatSearch, displayChatData }) => {
  return (
    <div clasName="container">
      <div className="row">
        <div className="col-sm-1">
        </div>
        <div style={{ padding: "0px" }} className="chat-div col-sm-10 outerDiv">
          <div className="row">
            <div className="col-sm-3" style={{ textAlign: 'center' }}>
              <div className="search-chat">
                <input
                    type="text"
                    className="input-search"
                    value={searchTerm}
                    onChange={handleChatSearch}
                    placeholder={"Search in this call"}
                  />
                <i className="fa fa-search" aria-hidden="true" />
              </div>
            </div>
            <div className="col-sm-9">
              <div className="chatBox">
                <ChatWindow
                  chatData={displayChatData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1">
        </div>
      </div>
    </div>
  );
};

export default Chat;