'use strict';

class Road {

  constructor(from, to){
    this.from = from;
    this.to = to;

    this.distance = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
  }


  getRelativeCoordinate(relativeDistance) {
  	//if(this.distance - relativeDistance < -10) {
  	//	console.error("Relative disatance greater than distance");

  	//	return;
  	//}

  	var normalizeVector = {
  		x: (this.to.x - this.from.x)/this.distance,
  		y: (this.to.y - this.from.y)/this.distance
  	};

  	var resultCoordinate = { x: this.from.x, y: this.from.y };
  	resultCoordinate.x += normalizeVector.x * relativeDistance;
  	resultCoordinate.y += normalizeVector.y * relativeDistance;

  	return resultCoordinate;
  }

  getDirection() {
  	var leftOrRight = (this.to.x - this.from.x) > 0 ? 'right' : 'left';
  	var topOrBottom = (this.to.y - this.from.y) > 0 ? 'bottom' : 'top';

  	return leftOrRight + '-' +topOrBottom;
  }
}