import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar.jsx';
/*
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};
*/
function getWeek(  ) {

    // Create a copy of this date object
    var target  = new Date();

    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr   = (target.getDay() + 6) % 7;

    // Set the target to the thursday of this week so the
    // target date is in the right year
    target.setDate(target.getDate() - dayNr + 3);

    // ISO 8601 states that week 1 is the week
    // with january 4th in it
    var jan4    = new Date(target.getFullYear(), 0, 4);

    // Number of days between target date and january 4th
    var dayDiff = (target - jan4) / 86400000;

    // Calculate week number: Week 1 (january 4th) plus the
    // number of weeks between target date and january 4th
    var weekNr = 1 + Math.ceil(dayDiff / 7);

    return weekNr;

}
class App extends Component {
    constructor(props){
        super(props);
        this.onFormChange = this.onFormChange.bind(this);
        this.onChangeWeek = this.onChangeWeek.bind(this);
        this.state= {
            team:'int',
            semester:1,
            week:getWeek(),
            days:[]
        }
    }
    componentDidMount(){
        this.getData(this.state.team,this.state.semester,this.state.week);
    }

    onFormChange(e){
        console.log(this.refs.team.value);
        this.getData(this.refs.team.value, this.refs.semester.value)
    }
    onChangeWeek(e){
        var w=this.state.week;
        if(e.target.dataset.ref==='prev'){
            w--;
            if(w===0){
                w=1;
            }
        } else {
            w++;

            if(w===53){
                w=52;
            }
        }
        this.setState({
            week:w
        });
        this.getData(this.state.team,this.state.semester,w);
    }
    getData(team, sem, week){
        document.querySelector('.App-logo').classList.add('animated');
        week = week || this.state.week;
        console.log(team, sem, week);
        var that = this;
        fetch("data.json")
            .then(function(e){return e.json()})
            .then(function(e){
                that.setState(
                    {
                        team:team,
                        semester:sem,
                        week:week,
                        days:e.teams[team].semesters[sem].weeks[week].days
                    }
                );
                document.querySelector('.App-logo').classList.remove('animated');
            });
    }
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <div className="pull">
                <img src={logo} className="App-logo" alt="logo" />
                <form onChange={this.onFormChange}>
                    <label>Line:
                        <select name="team" ref="team">
                            <option>int</option>
                            <option>dk</option>
                        </select>
                    </label>
                    <label>Semester:
                        <select name="semester" ref="semester">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </label>
                </form>
            </div>
            <header>
                <h2>MMD Schedule</h2>
                <h3>{this.state.team} - {this.state.semester}</h3>
            </header>
        </div>
          <h2><a href="#" onClick={this.onChangeWeek} data-ref="prev">Prev</a> <a href="#" data-ref="next" onClick={this.onChangeWeek}>Next</a></h2>
        <Calendar week={this.state.week} days={this.state.days} team={this.state.team} semester={this.state.semester}/>
          <form id="editor">
            <textarea></textarea>
              <button>Save</button>
          </form>
      </div>
    );
  }
}

export default App;
