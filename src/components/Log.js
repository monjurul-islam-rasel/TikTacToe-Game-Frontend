import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Log extends Component {

    actionLog() {
        const { log } = this.props;
        return (
            <table>
                <tbody>
                    {
                        log.map(l => {
                            return (
                                <tr key={Math.random()}>
                                    <td>
                                    {l.symbol} : Row:{l.row}, Col:{l.position}
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="log">
                {this.actionLog()}
            </div>
        );
    }
}

Log.propTypes = {
    log: PropTypes.array.isRequired,
};

export default connect(
    ({ log, game_id }) => ({
        log, game_id
    }),
    null
)(Log);

export { Log as ActionLog };
