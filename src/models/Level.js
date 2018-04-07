'use strict';

class Level {

  constructor(cities, roads, transports, time, goalPackage) {
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

    //move car
    let car = this.transports[0]; 
    if(car.currentCity == null){
      car.position += car.velocity*delta;
      
      let fullDistance = car.route.reduce((sum, x) => sum + x.distance);
      if(car.position >= fullDistance){
        car.finishDelivery();
      }
    }
  }

  init(codeForExecution) {
    var cities = this.cities;
    var car = this.transports[0];
    var goto = function(cityName){
		  let city = this.cities.find(x=>x.name == cityName);
      car.goto(city);
    }
    eval(codeForExecution);
  }
}