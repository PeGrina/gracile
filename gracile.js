const GracileCLI = require('./gracile-cli');
const serve = require('./server/index.js');
const [fs, path] = [require('fs'), require('path')];
const options = {
  commands: [
    {
      pattern: /^--help|-h|help$/,
      callback: (anotherCommands, options) => {
        console.log(`/=====${options.name}=====\\
Help of ${options.name} 
Usage: node gracile <command> <options>
Commands:
serve <port> <host> - Start the server with specified port or 8080 and host or 127.0.0.1
make <object> <object_options> - Make specified object (see down)
Objects:
router <name> - Router with specified name
controller <name> - Controller with specified name
        `);
      }
    },
    {
      pattern: /^serve$/,
      // eslint-disable-next-line complexity
      callback: (anotherCommands, options) => {
        const port = anotherCommands[0] || 8080;
        const host = anotherCommands[1] || '127.0.0.1';

        if (process.env.NODE_ENV === 'production') {
          serve.listen(port, host);
          console.log('Server is started.');
        } else {
          serve.listen(port, host, () => {
            console.log(`Server is started on http://${host}:${port}`);
          });
        }
      }
    },
    {
      pattern: /^make$/,
      callback: (anotherCommands, options) => {
        options.argv = anotherCommands;
        options.command = 'make';
        gracile.render(options);
      }
    },
    {
      pattern: /^router$/,
      callback: (anotherCommands, options) => {
        if (options.command === 'make') {
          const routerName = anotherCommands[0];
          const routersDir = path.join(__dirname, 'routers');
          const routerPrototype = path.join(
            __dirname,
            'prototypes',
            'router',
            'router.prototype.js'
          );
          const routerProtoStream = fs.readFileSync(routerPrototype, {
            encoding: 'utf8'
          });
          const routerStream = fs.createWriteStream(
            path.join(routersDir, routerName + '.router.js'),
            { encoding: 'utf8' }
          );
          const routerProtoRendered = routerProtoStream.replace(
            /\{name\}/gi,
            routerName[0].toUpperCase() + routerName.slice(1)
          );
          routerStream.write(routerProtoRendered);
          console.log(
            'New router ' +
              routerName +
              ' was created by path: ' +
              path.join(routersDir, routerName + '.router.js')
          );
        }
      }
    },
    {
      pattern: /^controller$/,
      callback: (anotherCommands, options) => {
        if (options.command === 'make') {
          const controllerName = anotherCommands[0].toLowerCase();
          const controllersDir = path.join(__dirname, 'controllers');
          const controllerPrototype = path.join(
            __dirname,
            'prototypes',
            'controller',
            'controller.prototype.js'
          );
          const controllerProtoStream = fs
            .readFileSync(controllerPrototype)
            .toString('utf8');
          const controllerStream = fs.createWriteStream(
            path.join(controllersDir, controllerName + '.controller.js'),
            { encoding: 'utf8' }
          );
          const controllerProtoRendered = controllerProtoStream
            .replace(
              /\{name\}/gi,
              controllerName[0].toUpperCase() + controllerName.slice(1)
            )
            .replace(/\{name2\}/gi, controllerName.toLowerCase());
          controllerStream.write(controllerProtoRendered);
          console.log(
            'New controller ' +
              controllerName +
              ' was created by path: ' +
              path.join(controllersDir, controllerName + '.controller.js')
          );
        }
      }
    }
  ],
  name: 'gracile-cli',
  argv: process.argv.slice(2)
};

const gracile = new GracileCLI(options);
gracile.render();
