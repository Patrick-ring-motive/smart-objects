const proxyPrototype = (proto,handler={}) =>{
  const target = Object.getPrototypeOf(proto) ?? {};
  Object.setPrototypeOf(proto,new Proxy(target,handler));
  return proto;
};

const SmartMap = class SmartMap extends Map{
  get length(){
    return this.size;
  }
};

const MapEntries = new Map().entries();
const MapProto = Map.prototype;

proxyPrototype(SmartMap.prototype,{
  get(target,key,receiver){
    const $this = receiver ?? target;
    const value = MapProto.get.call($this,key) ?? Reflect.get(...arguments);
    if(value == undefined && typeof MapEntries[key] === 'function'){
      
      return MapEntries[key].bind(MapProto.entries.call($this));
    }
    return value;
  },
  set(target,key,value,receiver){
    const $this = receiver ?? target;
    MapProto.set.call($this,key,value);
    return true
  }
});

const SmartArray = class SmartArray extends Array{
  get size(){
    return this.length;
  }
};

const ArrValues = [].values();
const ArrProto = Array.prototype;

proxyPrototype(SmartArray.prototype,{
  get(target,key,receiver){
    const $this = receiver ?? target;
    const value = Reflect.get(...arguments);
    if(value == undefined && typeof ArrValues[key] === 'function'){
      
      return ArrEntries[key].bind(ArrProto.values.call($this));
    }
    return value;
  }
});

const SmartSet = class SmartSet extends Set{
  get length(){
    return this.size;
  }
};

const SetValues = new Set().values();
const SetProto = Set.prototype;

proxyPrototype(SmartSet.prototype,{
  get(target,key,receiver){
    const $this = receiver ?? target;
    const value = Reflect.get(...arguments) ?? SetProto.has.call($this);
    if(value == undefined && typeof SetValues[key] === 'function'){
      
      return SetValues[key].bind(SetProto.entries.call($this));
    }
    return value;
  }
});

const camelToKebab = str => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const SmartHeaders = class SmartHeaders extends Headers{
  get length(){
    return this.size;
  }
};

const HeadEntries = new Headers().entries();
const HeadProto = Headers.prototype;

const parse = x =>{
  try{
    return JSON.parse(x);
  }catch{
    return x;
  }
};

const stringify = x =>{
  try{
    return JSON.stringify(x);
  }catch{
    return String(x);
  }
};

const isString = x => typeof x === 'string' || x instanceof String;



proxyPrototype(SmartHeaders.prototype,{
  get(target,key,receiver){
    const $this = receiver ?? target;
    const value = parse(HeadProto.get.call($this,camelToKebab(String(key)))) ?? Reflect.get(...arguments);
    if(value == undefined && typeof HeadEntries[key] === 'function'){
      
      return HeadEntries[key].bind(HeadProto.entries.call($this));
    }
    return value;
  },
  set(target,key,value,receiver){
    const $this = receiver ?? target;
    if(!isString(value)){
      value = stringify(value);
    }
    HeadProto.set.call($this,camelToKebab(key),value);
    return true
  }
});
