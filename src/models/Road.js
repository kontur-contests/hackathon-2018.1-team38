'use strict';

class Road {

  constructor(from, to){
    this.from = from;
    this.to = to;

    this.distance = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
  }
}