import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/homeActions';
import audioFile from '../resources/audio.mp3';
import Header from './Header/Header';
import Chat from './ChatSection/Chat';

const styles = {
  table : {
    'font-family': 'arial',
    'border-collapse': 'collapse',
    'width': '100%'
},
td: {
    border: '1px solid #dddddd',
    'text-align': 'left',
    padding: '8px'
}

}
class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      stats: {},
      gettingStats: true,
      transcript: [],
      gettingTranscript: false,
      showPlay: true,
      showPause: false,
      chatData: {},
      displayChatData: {},
      searchTerm: '',
      currentPosition: null,
    };
    // this.test = this.test.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleChatSearch = this.handleChatSearch.bind(this);
  }

  componentDidMount() {
    this.props.actions.getStats();
    this.props.actions.getTranscript();
    this.slider.value = 0;
    this.currentTimeInterval = null;
    // Get duration of the song and set it as max slider value
    this.audio.onloadedmetadata = function() {
      this.setState({ duration: this.audio.duration});
    }.bind(this);
    // Sync slider position with song current time
    this.audio.onplay = () => {
      this.currentTimeInterval = setInterval( () => {
        this.slider.value = this.audio.currentTime;
        this.moveChat(this.audio.currentTime);
        }, 500);
    };
    this.audio.onpause = () => {
      clearInterval(this.currentTimeInterval);
    };
    // Seek functionality
    this.slider.onchange = (e) => {
      this.audio.currentTime = e.target.value;
      this.moveChat(e.target.value);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stats && nextProps.stats.talk_listen) {
      this.setState({ stats: nextProps.stats });
    }
    this.setState({ gettingStats: nextProps.gettingStats });
    if (nextProps.transcript && nextProps.transcript.length > 0) {
      this.setState({ 
        transcript: nextProps.transcript,
        displayChatData: nextProps.transcript,
      });
    }
    this.setState({ gettingTranscript: nextProps.gettingTranscript });
    // Update chatData and displaychatData on new props
  }

  moveChat(pos) {
    const { transcript } = this.state;
    let position = 0;
    if (transcript && transcript.length > 0) {
      for (let i = 0; i < transcript.length; i += 1) {
        if (pos <= parseInt(transcript[i].start_time)) {
          position = parseInt(transcript[i].start_time);
          break;
        }
      }
      const myElement = document.getElementById(position);
      const topPos = myElement.offsetTop;
      document.getElementById('chat').scrollTop = topPos;
    }
  }

  handlePlay() {
    this.audio.play();
    this.setState({
      showPlay: false,
      showPause: true,
    }); 
  }

  handlePause() {
    this.audio.pause(); 
    this.setState({
      showPlay: true,
      showPause: false,
    });  
  }

  handleSeek(e) {
    const value = e.currentTarget.value;
    const currentTime = this.audio.currentTime;
    if (value === 'forward') this.audio.currentTime = currentTime + 15;
    else this.audio.currentTime = currentTime - 15;
    this.slider.value = this.audio.currentTime;
    console.log(Math.round(this.audio.currentTime));
  }

  handleChatSearch(e) {
    const keyWord = e.currentTarget.value;
    let newData = [];
    this.setState({ searchTerm: keyWord }, () => {
      newData = this.state.transcript.filter(item => item.line.indexOf(keyWord) > -1);
      this.setState({ displayChatData: newData });
    });  
  }

  render() {
    console.log(this.props.gettingTranscript);
    const { stats, transcript, displayChatData } = this.state;
    return (
      <div>
        <Header 
          talkListen={stats && stats.talk_listen}
          wordsPerMinute={stats && stats.works_per_minute}
          wordsPerSentence={stats && stats.words_per_sentence}
          loadingStats={this.state.gettingStats}
        />
        <audio ref={(audio) => { this.audio = audio }} src={audioFile} />
        <input 
          type="button"
          value="backward"
          onClick={this.handleSeek} 
        />
        {this.state.showPlay &&
        <input 
          type="button" 
          value="Play"
          onClick={this.handlePlay} 
      />}
        {this.state.showPause &&
        <input 
          type="button"
          value="Pause"
          onClick={this.handlePause} 
        />}
        <input 
          type="button"
          value="forward"
          onClick={this.handleSeek} 
        />
        <p><input 
          ref={(slider) => { this.slider = slider }}
          type="range"
          name="points"
          min="0" max={this.state.duration} 
        /> 
        </p>
        {transcript && transcript.length > 0 &&
        <Chat 
          searchTerm={this.state.searchTerm}
          handleChatSearch={this.handleChatSearch}
          displayChatData={displayChatData}
        />
        }
        {this.state.gettingTranscript && 
          <p>Loading Transcript</p>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stats: state.stats,
    gettingStats: state.gettingStats,
    transcript: state.transcript,
    gettingTranscript: state.gettingTranscript,
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);  