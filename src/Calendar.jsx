import React, { Component } from 'react';
import Week from './Week.jsx';

class Calendar extends Component {
    render() {
        return (
            <div className="Calendar">
                <h2>Calendar</h2>
                <Week week={this.props.week} days={this.props.days}/>
            </div>
        );
    }
}

export default Calendar;
