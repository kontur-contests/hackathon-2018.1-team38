'use strict';

class Level {

  constructor(cities, roads, transports, time, goalPackage, graph) {
    this.cities = cities;
    this.roads = roads;
    this.transports = transports;
    this.time = time;
    this.goalPackage = goalPackage;
    this.graph = graph;
    this.currentTime = 0;
    this.currentGoal = 0;
    this.citiesPacks = {};
  }





  populatePackages(delta) {
      this.cities.forEach(

        function(city) {
          this.citiesPacks[city.name] = this.citiesPacks[city.name] || 0;
          this.citiesPacks[city.name] += (city.packsPerLoop*delta);


          if(this.citiesPacks[city.name] > 1) {
            let numberOfNewPackage = (~~(this.citiesPacks[city.name]));

            for(var i=0; i<numberOfNewPackage; i++) {
              let cityIndex = (~~(Math.random() * this.cities.length));
              if(this.cities[cityIndex] == city) {
                cityIndex = (cityIndex + 1) % this.cities.length;
              }

             city.addPackage(new Package(city, this.cities[cityIndex]));
            }

            this.citiesPacks[city.name] = 0;
          }          
          
      }

      ,this);
  }


  simulate(delta) {
      
    this.populatePackages(delta);	   

     for(var i=0; i<this.transports.length; i++) {
        let car = this.transports[i];

        if(car.currentCity == null && car.route.length > 0) {
          car.position += car.velocity * delta;
        } else {
          car.idle(car.currentCity);
        }
     }

     this.currentTime += delta;

     if(this.currentTime > this.time) {
        this.currentTime = this.time;
        return 'fail';
     }

     if(this.currentGoal >= this.goalPackage) {
      return 'win';
     }

    //move car
    let car = this.transports[0]; 
    if(car.currentCity == null){
      //car.position += car.velocity*delta;
      
      let fullDistance = car.route.reduce((sum, x) => sum + x.distance);
      if(car.position >= fullDistance.distance){
        car.finishDelivery();
      }
    }

     return 'running';
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