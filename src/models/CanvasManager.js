'use strict';

class CanvasManager {

  constructor(wrapper, canvasDom, canas, timer, goal, status, width, height){
    this.canvasDom = canvasDom;
    this.wrapper = wrapper;
    this.canvas = canvas;
    this.timer = timer;
    this.goal = goal;
    this.status = status;

    this.previousStatus = null;

    this.canvas.height = height;
    this.canvas.width = width;

    this.ctx = this.canvas.getContext("2d");
    this.height = height;
    this.width = width;

    this.level = null;


    this.canvasDom.style.height= height + 'px';
    this.canvasDom.style.width= width+ 'px';
    this.wrapper.style.height= height + 'px';
    this.wrapper.style.width= width+ 'px';
    this.canvas.style.height= height + 'px';
    this.canvas.style.width= width+ 'px';


    this.cityDoms = {};
    this.cityNameDoms = {};
    this.carDoms = {};



    this.carSprite = {
      width: 20,
      height: 15
    };
  }

  displayStatus(status) {
    if(this.previousStatus == status) {
      return;
    }


    this.status.innerHTML = status;
    this.previousStatus = status;
  }

  clearLevel() {
    this.canvasDom.innerHTML = '';
    this.cityDoms = {};
    this.cityNameDoms = {};
    this.carDoms = {};

  }

  loadLevel(level) {
    this.level = level;
    this.cityDoms = {};
    this.carDoms = {};
    this.cityNameDoms = {};

    for(var i = 0; i < this.level.cities.length; i++) {
      var city = this.level.cities[i];

      this.cityDoms[city.name] = this.createCityDom(city.name, city.x, city.y);
      this.cityNameDoms[city.name] = this.createCityNameDom(city.name, city.x, city.y);

      this.canvasDom.appendChild(this.cityDoms[city.name]);
      this.canvasDom.appendChild(this.cityNameDoms[city.name]);
    }

    for(var i = 0; i < this.level.transports.length; i++) {
      var transport = this.level.transports[i];

      this.carDoms[transport.id] = this.createCarDom(transport);

      this.canvasDom.appendChild(this.carDoms[transport.id]);
    }

    this.drawBackground();
    this.drawCities(this.level.cities);
    this.update();
  }


  createCityNameDom(name, x, y) {
    var element = document.createElement('div');
    element.className = 'city-name';
    element.innerHTML = name;

    return element;
  }

  createCityDom(name, x, y) {
    var element = document.createElement('div');
    element.className = 'city-marker';

    return element;
  }


  createCarDom() {
    var element = document.createElement('div');
    element.className = 'car-marker';

    return element;
  }

  update() {

    //this.drawBackground();

    this.drawTimer(this.level.currentTime, this.level.time);
    this.drawGoal(this.level.currentGoal, this.level.goalPackage);

    this.drawTransports(this.level.transports);
  }

  drawTimer(currentTime, time)  {
    this.timer.innerHTML = currentTime.toFixed(2) + " : " + time + " s";
  }

  drawGoal(currentGoal, goalPackage) {
    this.goal.innerHTML = currentGoal + " / " + goalPackage;
  }

  drawCities(cities) {
     for(var i = 0; i < cities.length; i++) {
      var city = cities[i];

      var cityDom = this.cityDoms[city.name];

      cityDom.style.left = (city.x - 3) + "px";
      cityDom.style.top = (city.y - 3) + "px";


      var cityName = this.cityNameDoms[city.name];
      cityName.style.left = city.x + "px";
      cityName.style.top = city.y + 5 + "px";

    }
  }

  drawTransports(transports) {
    for (var transportId in transports){
      if (transports.hasOwnProperty(transportId)) {
         this.drawTransport(transports[transportId]);
      }
    }
  }


  drawTransport(transport) {
    var carDom = this.carDoms[transport.id];

    if(transport.route != null && transport.route.length > 0) {
      this.drawTransportMove(transport, carDom);
    } else if(transport.currentCity != null) {
      this.drawTransportInCity(transport, carDom);
    }
  }


  drawTransportMove(transport, dom) {
    var currentRoute = null;
    var relativeDistance = 0;
    if(transport.route.length == 1) {
      currentRoute = transport.route[0];
    } else {
      var previousRouteDistance = 0;
      for(var i=0; i<transport.route.length; i++) {
        if(transport.position >= previousRouteDistance &&
          transport.position < transport.route[i].distance + previousRouteDistance) {
            currentRoute = transport.route[i];

            relativeDistance = transport.position - previousRouteDistance;
            break;
        } else {
          previousRouteDistance += transport.route[i].distance;
        }
      }
    }

    if(currentRoute == null) {
      return;
    }


    var relativeCoordinate = currentRoute.getRelativeCoordinate(relativeDistance);


    dom.style.left = (relativeCoordinate.x - this.carSprite.width/2) + 'px';
    dom.style.top = (relativeCoordinate.y - this.carSprite.height/2) + 'px';

  }

  drawTransportInCity(transport, dom) {
    var city = transport.currentCity;

    dom.style.left = this.cityDoms[city.name].style.left;
    dom.style.top = this.cityDoms[city.name].style.top;
  }

  drawRoads() {

  }


  drawBackground() {
    //this.canvasDom.style.backgroundColor = "#18273d";


    for(var i=0; i<this.level.roads.length; i++) {
      var road = this.level.roads[i];

      this.ctx.beginPath();
      this.ctx.setLineDash([]);
      this.ctx.moveTo(road.city1.x,road.city1.y);
      this.ctx.lineTo(road.city2.x,road.city2.y);
      this.ctx.strokeStyle = '#ccc';


      this.ctx.stroke();
    }
  }
}