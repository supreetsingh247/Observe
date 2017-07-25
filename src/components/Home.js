import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/homeActions';
import audioFile from '../resources/audio.mp3';
import Header from './Header';

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
      transcript: {},
      gettingTranscript: false,
      showPlay: true,
      showPause: false,
    };
    // this.test = this.test.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
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
        }, 500);
    };
    this.audio.onpause = () => {
      clearInterval(this.currentTimeInterval);
    };
    // Seek functionality
    this.slider.onchange = (e) => {
      clearInterval(this.currentTimeInterval);
      this.audio.currentTime = e.target.value;
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stats && nextProps.stats.talk_listen) {
      this.setState({ stats: nextProps.stats });
    }
    this.setState({ gettingStats: nextProps.gettingStats });
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

  render() {
    
    console.log(this.state.stats);
    console.log(this.props.gettingTranscript);
    return (
      <div>
        <Header />
        {this.state.gettingStats && 
          <p>Loading Stats</p>
        }
        {this.state.stats && this.state.stats.talk_listen && 
        <div>
          <p>{this.state.stats.talk_listen} Talk to Listen Radio</p>
          <p>{this.state.stats.works_per_minute} Words Per Minute</p>
          <p>{this.state.stats.words_per_sentence} Words Per Sentence</p>
        </div>
        } 
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