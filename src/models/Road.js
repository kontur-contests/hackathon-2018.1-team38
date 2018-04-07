'use strict';

class Road {

  constructor(from, to){
    this.from = from;
    this.to = to;

    this.distance = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
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