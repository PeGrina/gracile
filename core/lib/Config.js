module.exports = class Config {
  #priv = [];
  // eslint-disable-next-line no-useless-constructor
  constructor (options) {
    this.#priv = options.private;
    this.conf = options.config;
  }

  #getVar (name){
    return this.#config[name];
  }

  getEl (name){
    if(this.#priv.indexOf(name) !== -1){
      return undefined;
    }
    return this.#getVar(name);
  }

  addEl (name, value){
    this.#config[name] = value;
  }

  get config(){
    const conf = {};
    for (let el in this.conf){
      if(this.#priv.indexOf(el) === -1){
        conf[el] = this.conf[el];
      }
    }
  }
  get #config(){
    return this.conf;
  }
};

module.exports = Config;
