import React, { Component } from 'react';
import Slot from './Slot.jsx'

class Day extends Component {
    getDateOfISOWeek(d, w, y) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return parseInt(ISOweekStart.getDate(), 10)+parseInt(d, 10)-1 + "/" + (parseInt(ISOweekStart.getUTCMonth(), 10)+1);
    }
    render() {
        //key, day, slots
        var slots=[];

        for (var key in this.props.slots) {
            if(this.props.slots.hasOwnProperty(key)) {
                slots.push(<tr key={key}><Slot slot={key} text={this.props.slots[key]}/></tr>);
            }
        }

        return (
            <table className="Day">
                <thead>
                <tr>
                <td>{this.getDateOfISOWeek(this.props.day,47,2016)}</td>
                </tr>
                </thead>
                <tbody>
                {slots}
                </tbody>
            </table>
        );
    }
}

export default Day;
