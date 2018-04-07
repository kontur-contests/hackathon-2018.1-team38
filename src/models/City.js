'use strict';

class City {

  constructor(name, capacity, x, y, packsPerLoop){
    this.name = name;
    this.capacity = capacity;
    this.x = x;
    this.y = y;
    this.packages = [];
    this.packsPerLoop = packsPerLoop;
  }
}
