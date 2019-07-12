const WebSocket = require("isomorphic-ws");
const R = require("rambda");

const addPropObj = (name, prop, obj) => (obj[name] = prop);
const tapAndCarrying = (target, ...arg) => R.tap(R.curry(target)(...arg));
const addProp = tapAndCarrying.bind(null, addPropObj);

const message = r => console.log(r.data);

function connect() {
  R.pipe(
    url => new WebSocket(url),
    addProp("onopen", _ => {}),
    addProp("onerror", _ => {}),
    addProp("onclose", _ => setTimeout(connect, 5000)),
    addProp("onmessage", message)
  )("ws://localhost:3000/");
}
connect();
