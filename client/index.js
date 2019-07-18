const WebSocket = require("isomorphic-ws");
const R = require("rambda");

const addPropObj = (name, prop, obj) => (obj[name] = prop);
const tapAndCarrying = (target, ...arg) => R.tap(R.curry(target)(...arg));
const addProp = tapAndCarrying.bind(null, addPropObj);

const modules = {};
const addModules = R.curry(addPropObj);

console.log(addModules);

function connect() {
  R.pipe(
    url => new WebSocket(url),
    addProp("onopen", _ => {}),
    addProp("onerror", _ => {}),
    addProp("onclose", _ => setTimeout(connect, 5000)),
    addProp("onmessage", R.curry(message)(modules)),
    addModules("ws")
  )("ws://localhost:3000/");
}
connect();

function message(modules, string) {
  modules.ws.send("ok: " + string);
}

const createFunc = string => new Function(string);
const callFunc = f => f();
const sendReturnValue = (sendF, value) => sendF(value);
