import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/homeActions';
import audioFile from '../resources/audio.mp3';

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
    };
    // this.editStudent =  this.editStudent.bind(this);
  }

  componentDidMount() {
    this.props.actions.getStats();
    this.props.actions.getTranscript();
  }

  componentWillReceiveProps(nextProps) {
 
  }

  componentWillUnmount() {
    //this.props.actions.clearItems();
  }

  render() {
    console.log(this.props.transcript);
    console.log(this.props.gettingTranscript);
    return (
      <div>
        hello
        <audio controls>
          <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio>
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