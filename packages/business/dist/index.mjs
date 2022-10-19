var o = Object.defineProperty;
var c = (t, e, r) => e in t ? o(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var i = (t, e, r) => (c(t, typeof e != "symbol" ? e + "" : e, r), r);
class b {
  constructor(e, r, a) {
    this.remoteDataSource = e, this.localDataSource = r, this.networkInfo = a;
  }
  async getConcreteNumberTrivia(e) {
    if (await this.networkInfo.isConnected()) {
      const r = await this.remoteDataSource.getConcreteNumberTrivia(e);
      return this.localDataSource.cacheNumberTrivia(r), r;
    }
    return this.localDataSource.getCachedNumberTrivia();
  }
  async getRandomNumberTrivia() {
    if (await this.networkInfo.isConnected()) {
      const e = await this.remoteDataSource.getRandomNumberTrivia();
      return this.localDataSource.cacheNumberTrivia(e), e;
    }
    return this.localDataSource.getCachedNumberTrivia();
  }
}
const u = (t) => typeof t == "string" ? Number(t) : t, v = (t) => async (e) => (e = u(e), await t.getConcreteNumberTrivia(e)), T = (t) => async () => await t.getRandomNumberTrivia();
class s {
  constructor(e, r, a, n = "trivia") {
    this.number = e, this.text = r, this.found = a, this.type = n;
  }
  serialize() {
    return JSON.stringify(this);
  }
  deserialize(e) {
    return typeof e == "string" && (e = JSON.parse(e)), Object.assign(this, e), this;
  }
  validate() {
    return this.text.length > 0 && this.number > 0;
  }
}
class h extends Error {
}
class m extends Error {
}
class d {
  constructor(e) {
    this.storage = e;
  }
  async getCachedNumberTrivia() {
    const e = await this.storage.getItem("cachedNumberTrivia");
    if (e)
      return new s(0, "", !1).deserialize(e);
    throw new m("No trivia cached");
  }
  async cacheNumberTrivia(e) {
    await this.storage.setItem("cachedNumberTrivia", e.serialize());
  }
}
class g {
  constructor(e) {
    this.httpClient = e;
  }
  async getConcreteNumberTrivia(e) {
    const r = await this.httpClient.get(`http://numbersapi.com/${e}?json`);
    return new s(0, "", !1).deserialize(await r.json());
  }
  async getRandomNumberTrivia() {
    const e = await this.httpClient.get("http://numbersapi.com/random?json");
    return new s(0, "", !1).deserialize(await e.json());
  }
}
class N {
  constructor() {
    i(this, "get", async (e) => {
      try {
        return await fetch(e);
      } catch (r) {
        throw new h(r.message);
      }
    });
  }
}
class w {
  constructor() {
    i(this, "data", {});
  }
  get length() {
    return Object.keys(this.data).length;
  }
  clear() {
    this.data = {};
  }
  getItem(e) {
    return this.data[e] || null;
  }
  key(e) {
    return Object.keys(this.data)[e] || null;
  }
  removeItem(e) {
    delete this.data[e];
  }
  setItem(e, r) {
    this.data[e] = r;
  }
}
class y {
  async isConnected() {
    var e;
    return ((e = globalThis.navigator) == null ? void 0 : e.onLine) || !1;
  }
}
export {
  y as BrowserNetworkInfo,
  N as HttpClient,
  s as NumberTrivia,
  d as NumberTriviaLocalDataSource,
  g as NumberTriviaRemoteDataSource,
  b as NumberTriviaRepository,
  w as SessionStorage,
  v as makeGetConcreteNumberTrivia,
  T as makeGetRandomNumberTrivia
};
