'use strict';

class Level {

  constructor(cities, roads, transports, time, goalPackage){
    this.cities = cities;
    this.roads = roads;
    this.transports = transports;
    this.time = time;
    this.goalPackage = goalPackage;
  }

  simulate(delta) {
	   var needGenerate = (~~(Math.random() * 100)) > 20;

	   if(needGenerate) {
		    this.cities[0].addPackage(new Package(this.cities[0], this.cities[1]));
	   }
  }

  init(codeForExecution) {
  	var cities = this.cities;

  	eval(codeForExecution);
  }
}