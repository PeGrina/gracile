const GracileCLI = require('./gracile-cli');
const serve = require('./server/index.js');
const [fs,path] = [require('fs'), require('path')];
const chokidar = require('chokidar');

const options = {
    commands: [
        {
            pattern: /^--help|-h|help$/,
            callback: (anotherCommands, options) => {
                console.log(` Help of ${options.name} `);
            }
        },
        {
            pattern: /^serve$/,
            callback: (anotherCommands) => {
                const port = anotherCommands[0] || 8080;

                if(process.env.NODE_ENV === 'production'){
                    const server = serve.listen();
                    console.log(`Server is started.`);
                }else {
                    const server = serve.listen(port, () => {
                        console.log(`Server is started on http://localhost:${port}`);
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
                if(options.command === 'make'){
                    const routerName = anotherCommands[0],
                          routersDir = path.join(__dirname, 'routers'),
                          routerPrototype = path.join(__dirname, 'prototypes', 'router', 'router.prototype.js'),
                          routerProtoStream = fs.readFileSync(routerPrototype, { encoding: 'utf8' }),
                          routerStream = fs.createWriteStream(path.join(routersDir, routerName + '.router.js'), { encoding: 'utf8' });
                    let routerProtoRendered = routerProtoStream.replace(/\{name\}/gi, routerName[0].toUpperCase() + routerName.slice(1));
                    routerStream.write(routerProtoRendered);
                    console.log('New router ' + routerName + ' was created by path: ' + path.join(routersDir, routerName + '.router.js'));
                }
            }
        }
    ],
    name: 'gracile-cli',
    argv: process.argv.slice(2)
}

const gracile = new GracileCLI(options);
gracile.render();
