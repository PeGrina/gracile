class GracileCLI{
    #options = {};
    #currentCommand = {};

    constructor(options) {
        this.#options = options;

        return this;
    }

    #render(argv){
        if(argv.length !== 0){
            this.#currentCommand = argv;
        }else{
            throw new Error('Excepted command, but get None');
        }
    }

    render(options = false){
        if(!options){
            options = this.#options;
        }
        this.#render(options.argv);
        const command = this.#currentCommand;

        options.commands.forEach(com => {
            if(command[0].match(com.pattern)) {
                com.callback(command.slice(1), options);
            }
        });
    }
}

module.exports = GracileCLI;
