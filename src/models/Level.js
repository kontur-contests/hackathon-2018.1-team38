'use strict';

class Level {

  constructor(cities, roads, transports, time, goalPackage) {
    this.cities = cities;
    this.roads = roads;
    this.transports = transports;
    this.time = time;
    this.goalPackage = goalPackage;

    this.currentTime = 0;
    this.currentGoal = 0;
  }



  simulate(delta) {
	   

     for(var i=0; i<this.transports.length; i++) {
        var car = this.transports[i];

        car.position += car.velocity * delta;
     }

     this.currentTime += delta;

     if(this.currentTime > this.time) {
        this.currentTime = this.time;
        return 'fail';
     }

     if(this.currentGoal >= this.goalPackage) {
      return 'win';
     }

     return 'running';
  }

  init(codeForExecution) {
    var cities = this.cities;

    eval(codeForExecution);
  }
}