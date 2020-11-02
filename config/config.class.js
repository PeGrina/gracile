class Config{
  #path = "";

  constructor(path) {
    this.#path = path;
  }

  get config(){
    return require(this.#path);
  }
  getVariable(name){
    return this.config[name];
  }
}

module.exports = Config;
