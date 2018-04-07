'use strict';

class Road {

  constructor(city1, city2){
    this.city1 = city1;
    this.city2 = city2;

//
    this.distance = Math.sqrt(Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2));
  }
}