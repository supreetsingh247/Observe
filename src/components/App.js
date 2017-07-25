import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
          <div className="main-content-wrapper">
            {this.props.children}
          </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(App);
