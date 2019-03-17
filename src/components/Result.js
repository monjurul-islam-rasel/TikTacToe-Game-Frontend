import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Result extends Component {
  render() {
    let result = '';
    if (this.props.turn) {
      result = `${this.props.turn.toUpperCase()}'s TURN`;
    }
    if (this.props.won) {
      result = `${this.props.won.toUpperCase()} WON!`;
    } else if (this.props.draw) {
      result = 'Match Draw!';
    }
    return (
      <div>
        <h4>{result}</h4>
      </div>
    );
  }
}

Result.propTypes = {
  won: PropTypes.string,
  turn: PropTypes.string.isRequired,
  draw: PropTypes.bool.isRequired
};

export default connect(
  ({ won, turn, draw }) => ({
    won, turn, draw
  })
)(Result);

export { Result as PureResult };
