import React, { Component } from 'react';
import Day from './Day.jsx'

class Week extends Component {
    render() {
        var days = [];
        for (var key in this.props.days) {
            if(this.props.days.hasOwnProperty(key)){
                days.push(<Day key={key} day={key} week={this.props.week} slots={this.props.days[key].slots} team={this.props.team} semester={this.props.semester} />)
            }
        }

        return (
            <article className="Week">
                <h2>Week {this.props.week}</h2>
                <section className="week">
                    {days}
                </section>
            </article>
        );
    }
}

export default Week;
