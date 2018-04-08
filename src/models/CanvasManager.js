'use strict';

class CanvasManager {

  constructor(wrapper, canvasDom, canas, timer, goal, status, info, runButton, width, height){
    this.canvasDom = canvasDom;
    this.wrapper = wrapper;
    this.canvas = canvas;
    this.timer = timer;
    this.goal = goal;
   // this.status = status;


    this.runButton = $(runButton);
    this.info = info;

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
    this.carLabels = {};



    this.carSprite = {
      width: 20,
      height: 15
    };
  }

  displayStatus(status) {
    if(this.previousStatus == status) {
      return;
    }

    
    //this.status.innerHTML = status;
    this.previousStatus = status;


    if(status == 'win') {
      this.runButton.html('Запустить')
    this.runButton.removeClass('btn-outline-warning');
     this.runButton.removeClass('btn-outline-danger');
     this.runButton.addClass('btn-outline-success');
    }

    if(status == 'running') {
      this.runButton.html('Перезапустить')

      this.runButton.removeClass('btn-outline-success');
     this.runButton.removeClass('btn-outline-danger');
     this.runButton.addClass('btn-outline-warning');
    }

    if(status == 'fail') {
     this.runButton.html('Начать снова') 

     this.runButton.removeClass('btn-outline-success');
     this.runButton.removeClass('btn-outline-warning');
     this.runButton.addClass('btn-outline-danger');
    }
  }

  clearLevel() {
    this.canvasDom.innerHTML = '';
    this.info.innerHTML ='';
    this.cityDoms = {};
    this.cityNameDoms = {};
    this.carDoms = {};
    this.carLabels = {};

    this.ctx.clearRect(0, 0, this.width, this.height);
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
      
      this.carLabels[transport.id] = this.createCarLabelDom(transport);
      
      this.canvasDom.appendChild(this.carLabels[transport.id]);
    }

    this.drawBackground();
    this.drawCities(this.level.cities);
    this.drawCityLabels(this.level.cities);
    this.update();
  }


  createCityNameDom(name, packages, x, y) {
    var element = document.createElement('div');
    element.className = 'city-name';
    element.innerHTML = name + "(" + packages +")";

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

  createCarLabelDom() {
        var element = document.createElement('div');
    element.className = 'car-label';

    return element;
  }

  update() {

    //this.drawBackground();

    this.drawTimer(this.level.currentTime, this.level.time);
    this.drawGoal(this.level.currentGoal, this.level.goalPackage);
    this.drawCityLabels(this.level.cities);
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

      cityDom.style.left = (city.x - 5) + "px";
      cityDom.style.top = (city.y - 5) + "px";
    }
  }

  drawCityLabels(cities) {
    for(var i = 0; i < cities.length; i++) {
      var city = cities[i];

      var cityName = this.cityNameDoms[city.name];
      cityName.style.left = city.x + "px";
      cityName.style.top = city.y + 5 + "px";
      cityName.innerHTML = city.name + "(" + city.packages.length + ")";
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
    var carLabel = this.carLabels[transport.id];

    if(transport.route != null && transport.route.length > 0) {
      this.drawTransportMove(transport, carDom, carLabel);
    } else if(transport.currentCity != null) {
      this.drawTransportInCity(transport, carDom, carLabel);
    }


    if(transport.route.length > 0) {

      let infoBuilder = 'Пункт назначения - ' + transport.route[transport.route.length - 1].to.name + '<br />';
      
      if(transport.packages.length > 0) {
        infoBuilder += '<br/>Посылки<br/>';
      }
      var calculatePackages = {};


      for(let i=0; i<transport.packages.length; i++) {
        let pack = transport.packages[i];

        if(calculatePackages.hasOwnProperty(pack.to.name)) {
          var obj = calculatePackages[pack.to.name];
          obj.count++;
          obj.goods.push(pack.name);
        } else {
          calculatePackages[pack.to.name] = {
            count: 1,
            goods: [pack.name]
          };
        }
      }


      if(Object.keys(calculatePackages).length > 0) {
        infoBuilder += '<ul class="packages">';
        for(var key in calculatePackages) {
        
        infoBuilder += '<li>' + key + '[' + calculatePackages[key].count + ']';

        if(calculatePackages[key].goods.length > 0) {
          infoBuilder += '<ul class="packages">';
              calculatePackages[key].goods.forEach(x=> infoBuilder += "<li>"+x+"</li>");
              infoBuilder += '</ul>';
        }

        infoBuilder += '</li>';
        }

        infoBuilder += '</ul>';
      }

      this.info.innerHTML = infoBuilder;
        
    } else {
      this.info.innerHTML = '';
    }
  }


  drawTransportMove(transport, dom, label) {
    var currentRoute = null;
    var relativeDistance = 0;
    if(transport.route.length == 1) {
      currentRoute = transport.route[0];
      relativeDistance = transport.position;
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

    var direction = currentRoute.getDirection();

    if(!dom.hasOwnProperty('originalClassName'))  {
      dom.originalClassName = dom.className;
    }

    dom.className = dom.originalClassName + " " + direction;

    label.innerHTML =  '['+transport.packages.length + '/'+transport.capacity+']';
    label.style.left = (relativeCoordinate.x - this.carSprite.width/2) + 'px';
    label.style.top = (relativeCoordinate.y + this.carSprite.height/2) + 'px';
  }

  drawTransportInCity(transport, dom, label) {
    var city = transport.currentCity;

    dom.style.left = this.cityDoms[city.name].style.left;
    dom.style.top = this.cityDoms[city.name].style.top;


    label.innerHTML =  '['+transport.packages.length + '/'+transport.capacity+']';
    label.style.left = transport.currentCity.x + 'px';
    label.style.top = transport.currentCity.y + 'px';
  }

  drawRoads() {

  }


  drawBackground() {
    //this.canvasDom.style.backgroundColor = "#18273d";


    for(var i=0; i<this.level.roads.length; i++) {
      var road = this.level.roads[i];

      this.ctx.beginPath();
      this.ctx.setLineDash([]);
      this.ctx.moveTo(road.from.x,road.from.y);
      this.ctx.lineTo(road.to.x,road.to.y);
      this.ctx.strokeStyle = '#fff';

      this.ctx.lineWidth=8;
      this.ctx.stroke();


      this.ctx.beginPath();
      this.ctx.setLineDash([]);
      this.ctx.moveTo(road.from.x,road.from.y);
      this.ctx.lineTo(road.to.x,road.to.y);
      this.ctx.strokeStyle = '#333';

      this.ctx.lineWidth=7;
      this.ctx.stroke();



      this.ctx.beginPath();
      this.ctx.setLineDash([4, 4]);
      this.ctx.moveTo(road.from.x,road.from.y);
      this.ctx.lineTo(road.to.x,road.to.y);
      this.ctx.strokeStyle = '#fff';

      this.ctx.lineWidth=1;
      this.ctx.stroke();
    }
  }
}