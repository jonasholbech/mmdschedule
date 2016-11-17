import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar.jsx';
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            team:'loading',
            semester:1,
            week:new Date().getWeek(),
            days:[]
        }
    }
    componentDidMount(){
        this.getData('int',1,this.state.week);
    }

    getData(team, sem, week){
        var that = this;
        fetch("data.json")
            .then(function(e){return e.json()})
            .then(function(e){
                console.log(e.teams[team].semesters[sem].weeks[week]);
                that.setState(
                    {
                        team:team,
                        semester:sem,
                        week:week,
                        days:e.teams[team].semesters[sem].weeks[week].days
                    }
                );
            });
    }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MMD Schedule</h2>
            <h3>{this.state.team} - {this.state.semester}</h3>
        </div>
        <Calendar week={this.state.week} days={this.state.days}/>
          <form id="editor">
            <textarea></textarea>
              <button>Save</button>
          </form>
      </div>
    );
  }
}

export default App;
