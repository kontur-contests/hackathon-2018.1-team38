'use strict';

class Road {

  constructor(city1, city2){
    this.city1 = city1;
    this.city2 = city2;

//
    this.distance = Math.sqrt(Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2));
  }


  getRelativeCoordinate(relativeDistance) {
  	if(relativeDistance > this.distance) {
  		console.error("Relative disatance greater than distance");

  		return;
  	}

  	var normalizeVector = {
  		x: (this.city2.x - this.city1.x)/this.distance,
  		y: (this.city2.y - this.city1.y)/this.distance
  	};

  	var resultCoordinate = { x: this.city1.x, y: this.city1.y };
  	resultCoordinate.x += normalizeVector.x * relativeDistance;
  	resultCoordinate.y += normalizeVector.y * relativeDistance;

  	return resultCoordinate;
  }
}