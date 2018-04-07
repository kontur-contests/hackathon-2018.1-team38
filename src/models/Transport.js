'use strict';

class Transport {

  constructor(type, capacity, velocity){
    this.type = type;
    this.capacity = capacity;
    this.velocity = velocity;
    this.packages = [];
    this.route = null;
    this.direction = false;
    this.position = 0;
  }
}
