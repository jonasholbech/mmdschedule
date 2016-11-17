import React, { Component } from 'react';
import Day from './Day.jsx'

class Week extends Component {
    render() {
        var days = [];
        for (var key in this.props.days) {
            //console.log(key);
            if(this.props.days.hasOwnProperty(key)){
                days.push(<td key={key}><Day day={key} slots={this.props.days[key].slots} /></td>)
            }
        }
/*
        this.props.days.forEach((day)=>{
           days.push(<Day day={day} />)
        });*/
        return (
            <table className="Week">
                <thead>
                    <tr><th colSpan="6">Week {this.props.week}</th></tr></thead>
                <tbody>
                    <tr>
                        {days}
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Week;
