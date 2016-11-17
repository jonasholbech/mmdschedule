import React, { Component } from 'react';
import Week from './Week.jsx';

class Calendar extends Component {
    render() {
        return (
            <div className="Calendar">
                <Week week={this.props.week} days={this.props.days} team={this.props.team} semester={this.props.semester}/>
            </div>
        );
    }
}

export default Calendar;
