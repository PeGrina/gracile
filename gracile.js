const GracileCLI = require("./gracile-cli");
const serve = require("./server/index.js");
const [fs, path] = [require("fs"), require("path")];
const options = {
  commands: [
    {
      pattern: /^--help|-h|help$/,
      callback: (anotherCommands, options) => {
        console.log(` Help of ${options.name} `);
      },
    },
    {
      pattern: /^serve$/,
      callback: (anotherCommands) => {
        const port = anotherCommands[0] || 8080;

        if (process.env.NODE_ENV === "production") {
          const server = serve.listen();
          console.log(`Server is started.`);
        } else {
          const server = serve.listen(port, () => {
            console.log(`Server is started on http://localhost:${port}`);
          });
        }
      },
    },
    {
      pattern: /^make$/,
      callback: (anotherCommands, options) => {
        options.argv = anotherCommands;
        options.command = "make";
        gracile.render(options);
      },
    },
    {
      pattern: /^router$/,
      callback: (anotherCommands, options) => {
        if (options.command === "make") {
          const routerName = anotherCommands[0],
            routersDir = path.join(__dirname, "routers"),
            routerPrototype = path.join(
              __dirname,
              "prototypes",
              "router",
              "router.prototype.js"
            ),
            routerProtoStream = fs.readFileSync(routerPrototype, {
              encoding: "utf8",
            }),
            routerStream = fs.createWriteStream(
              path.join(routersDir, routerName + ".router.js"),
              { encoding: "utf8" }
            );
          let routerProtoRendered = routerProtoStream.replace(
            /\{name\}/gi,
            routerName[0].toUpperCase() + routerName.slice(1)
          );
          routerStream.write(routerProtoRendered);
          console.log(
            "New router " +
              routerName +
              " was created by path: " +
              path.join(routersDir, routerName + ".router.js")
          );
        }
      },
    },
    {
      pattern: /^controller$/,
      callback: (anotherCommands, options) => {
        if (options.command === "make") {
          const controllerName = anotherCommands[0].toLowerCase(),
            controllersDir = path.join(__dirname, "controllers"),
            controllerPrototype = path.join(
              __dirname,
              "prototypes",
              "controller",
              "controller.prototype.js"
            ),
            controllerProtoStream = fs
              .readFileSync(controllerPrototype)
              .toString("utf8"),
            controllerStream = fs.createWriteStream(
              path.join(controllersDir, controllerName + ".controller.js"),
              { encoding: "utf8" }
            );
          let controllerProtoRendered = controllerProtoStream
            .replace(
              /\{name\}/gi,
              controllerName[0].toUpperCase() + controllerName.slice(1)
            )
            .replace(/\{name2\}/gi, controllerName.toLowerCase());
          controllerStream.write(controllerProtoRendered);
          console.log(
            "New controller " +
              controllerName +
              " was created by path: " +
              path.join(controllersDir, controllerName + ".controller.js")
          );
        }
      },
    },
  ],
  name: "gracile-cli",
  argv: process.argv.slice(2),
};

const gracile = new GracileCLI(options);
gracile.render();
