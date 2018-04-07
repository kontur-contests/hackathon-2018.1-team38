'use strict';

class Dummy {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}


// usage
let user = new Dummy("Вася");
user.sayHi(); // Вася