var fs = require('fs');
var teams = ['int', 'dk'];
var semesters=["1","2","3"];
var weeks = [];
var i;
for (i = 1; i <= 52; i++) {
    weeks.push(i+"");
}
var days = ["1","2","3","4","5"];
var slots=["1","2","3","4"];

var o = {
    "teams":{}
};
var str = "abcdefghijklmnopqrstuvxyz";
var parts = str.split('');
var strLength= parts.length;
function randomString(){
    var words = Math.floor(Math.random()*10+1);
    var myStr="";
    while(words>0){
        var length = Math.floor(Math.random()*10+1);
        while(length>0){
            myStr+=parts[Math.floor(Math.random()*strLength)];
            length--;
        }
        myStr+=" ";
        words--;
    }
    //console.log(myStr);
    return myStr;
}
teams.forEach(function(team){
   o.teams[team]={};
   o.teams[team].semesters={};
   semesters.forEach(function(sem){
       o.teams[team].semesters[sem]={"weeks":{}};
        weeks.forEach(function(week){
           o.teams[team].semesters[sem].weeks[week]={"days":{}};
           days.forEach(function(day){
               o.teams[team].semesters[sem].weeks[week].days[day]={"slots":{}};
               slots.forEach(function(slot){
                   o.teams[team].semesters[sem].weeks[week].days[day].slots[slot]=randomString();
               })
           })
        });
   })
});
//console.log(o.teams.int.semesters["1"].weeks["1"]);
fs.writeFile("data.json", JSON.stringify(o));