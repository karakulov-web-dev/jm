const R = require("rambda");

class Clients {
  constructor() {
    this.clients = Object.create(null);
  }
  createClient(ws) {
    return {
      ws
    };
  }
  addId(item) {
    return {
      ...item,
      id: String(Math.random()).substr(2)
    };
  }
  addById(item) {
    try {
      this.clients[`id${item.id}`] = item.ws;
    } catch (e) {
      console.log(e);
    }
  }
  newClient(ws) {
    this.clearInactive();
    R.pipe(
      this.createClient,
      this.addId,
      this.addById.bind(this)
    )(ws);
  }
  get() {
    this.clearInactive();
    return {
      ...this.clients
    };
  }
  clearInactive() {
    this.clients = Object.entries(this.clients)
      .filter(item => {
        if (item[1].readyState !== 1) {
          item[1].terminate();
          return false;
        }
        return true;
      })
      .reduce((p, c, i, a) => {
        p[c[0]] = c[1];
        return p;
      }, {});
  }
}

module.exports = Clients;
