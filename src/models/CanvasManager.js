'use strict';

class CanvasManager {

  constructor(canvasElement, height, width){
    this.canvasElement = canvasElement;
    this.level = null;


    this.canvasElement.style.height= height + 'px';
    this.canvasElement.style.width= width+ 'px';


    this.citiesDom = {};

  }



  loadLevel(level) {
    this.level = level;
    this.citiesDom = [];

    for(var i = 0; i < this.level.cities.length; i++) {
      var city = this.level.cities[i];

      this.citiesDom[city.name] = this.createCityDom(city.name, city.x, city.y);

      this.canvasElement.appendChild(this.citiesDom[city.name]);
    }
  }


  createCityDom(name, x, y) {
    var element = document.createElement('div');
    element.className = 'city-marker';

    element.style.left = x + "px";
    element.style.top = y + "px";

    return element;
  }


  createCarDom() {
    
  }

  update() {

    this.drawBackground();

    this.drawCities(this.level.cities);
    this.drawTransports(this.level.transports);
  }


  drawCities(cities) {
     for(var i = 0; i < cities.length; i++) {
      var city = cities[i];

      var cityDom = this.citiesDom[city.name];

      cityDom.style.left = city.x + "px";
      cityDom.style.top = city.y + "px";
    }
  }

  drawTransports(transports) {

  }

  drawRoads() {

  }


  drawBackground() {
    this.canvasElement.style.backgroundColor = "#18273d";
  }
}