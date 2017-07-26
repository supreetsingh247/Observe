import React from 'react';
import styles from './Header.css';
import image from '../../resources/profilePhoto.jpg';

const Header = ({ talkListen, wordsPerMinute, wordsPerSentence, loadingStats }) => {
  return (
    <div clasName="container">
      <div className="row">
        <div className="border col-sm-12">
          <span className="large grey" style={{ 'margin-left': '30px' }}>CALLS</span>
          <div className="search">
            <input className="input" type="text" placeholder="Search through all calls" />
            <i className="fa fa-search" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="stats-div col-sm-10">
          <div clasName="container">
            <div className="row">
              <div className="col-sm-2">
                <span>Demo Meeting</span><br></br>
                <span className="x-small grey">July 27, 2017 | 2184</span>
              </div>
              {!loadingStats ?
                <div className="col-sm-10">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="row">
                        <div className="col-sm-2">
                          <img className="img-circle" height={28} width={28} src={image} alt="rep" />
                        </div>
                        <div className="col-sm-10">
                          <span>Demo Representative</span><br></br>
                          <span className="x-small grey">SALES REP</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="row">
                        <div className="col-sm-3">
                          <span className="xxx-large">{talkListen}</span>
                        </div>
                        <div className="col-sm-9 marginTopSmall">
                          <span className="x-small grey">Talk to Listen Radio</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="row">
                        <div className="col-sm-3">
                          <span className="xxx-large">{wordsPerMinute}</span>
                        </div>
                        <div className="col-sm-9 marginTopSmall">
                          <span className="x-small grey">Words Per Minute</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="row">
                        <div className="col-sm-3">
                          <span className="xxx-large">{wordsPerSentence}</span>
                        </div>
                        <div className="col-sm-9 marginTopSmall">
                          <span className="x-small grey">Words Per Sentence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : <p>Loading Stats</p>
              }
            </div>
          </div>
        </div>
        <div className="col-sm-1">
        </div>
      </div>
    </div>
  );
};

export default Header;