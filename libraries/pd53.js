/*
The P5 + D3 = PD53 Library 
Made by lovely people at Data Design + Art, @HSLU Luzern Switzerland

See https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
to get started with some basics to write P5js libraries
*/

console.log(
  "👋 Happy Coding with PD53! Made with ❤️ by data & design ethusiast at Data Design+Art, HSLU Luzern Switzerland"
);

// map() insprired d3.scaleLinear function
// d3 reference: https://d3js.org/d3-scale/linear
p5.prototype.scaleLinear = function (value, domainStart, domainStop, rangeStart, rangeStop) {
  const scale = d3.scaleLinear().domain([domainStart, domainStop]).range([rangeStart, rangeStop]);
  const mappedVal = scale(value);
  return mappedVal;
};

// d3 reference: https://d3js.org/d3-scale/point
// I guess this needs to receive arrays... ?
p5.prototype.scalePoint = function (value, domainArray, rangeStart, rangeStop) {
  // extend: if domain & range not array log error & help
  const scale = d3.scalePoint().domain(domainArray).range([rangeStart, rangeStop]);
  const mappedVal = scale(value);
  return mappedVal;
};

// d3 reference:
// let rScale = d3.scaleSqrt().domain([0, 100]).range([0, 50]);
p5.prototype.scaleSqrt = function (value, domainStart, domainStop, rangeStart, rangeStop) {
  const scale = d3.scaleSqrt().domain([domainStart, domainStop]).range([rangeStart, rangeStop]);
  const mappedVal = scale(value);
  return mappedVal;
};

// d3 reference:
//let quantizeScale = d3.scaleQuantize().domain([0, 100]).range(["lightblue", "orange", "lightgreen", "pink"]);
/**
 * Maps a value from one range to another using a quantize scale.
 * @function scaleQuantize
 * @param {number} value The value to map.
 * @param {number} domainStart The start of the domain range.
 * @param {number} domainStop The end of the domain range.
 * @param {Array<any>} rangeArray An array representing the range values.
 * @returns {number} The mapped value.
 */
p5.prototype.scaleQuantize = function (value, domainStart, domainStop, rangeArray) {
  const scale = d3.scaleQuantize().domain([domainStart, domainStop]).range(rangeArray);
  const mappedVal = scale(value);
  return mappedVal;
};

// d3 reference:
//var quantileScale = d3.scaleQuantile().domain(myData).range(['lightblue', 'orange', 'lightgreen']);
/**
 * Maps a value from one range to another using a quantile scale.
 * @function scaleQuantile
 * @param {number} value The value to map.
 * @param {Array<any>} domainArray An array representing the domain values.
 * @param {Array<any>} rangeArray An array representing the range values.
 * @returns {number} The mapped value.
 */
p5.prototype.scaleQuantile = function (value, domainArray, rangeArray) {
  const scale = d3.scaleQuantize().domain(domainArray).range(rangeArray);
  const mappedVal = scale(value);
  return mappedVal;
};

// d3 reference:
//var thresholdScale = d3.scaleThreshold().domain([0, 30, 100]).range(["#ccc", "lightblue", "orange", "#ccc"]);
/**
 * Maps a value from one range to another using a threshold scale.
 * @function scaleThreshold
 * @param {number} value The value to map.
 * @param {number} domainStart The start of the domain range.
 * @param {number} domainStop The end of the domain range.
 * @param {number} threshold The threshold value.
 * @param {Array<any>} rangeArray An array representing the range values. The rangeArray can have up to four values: undershoot, <threshold, > threshold, overshoot
 * @returns {number} The mapped value.
 */
p5.prototype.scaleThreshold = function (value, domainStart, domainStop, threshold, rangeArray) {
  const scale = d3.scaleThreshold().domain([domainStart, threshold, domainStop]).range(rangeArray);
  const mappedVal = scale(value);
  return mappedVal;
};

// data loading
//--------------------------------------------------------------

// Alternative Approach, not sure if or what is better…
/*usage:
let dataAsync;
function preload() {
  dataAsync = loadD3CSV("data.csv");
  dataAsync = loadD3Json("data.json");
}*/

// Register the custom preload function
p5.prototype.registerPromisePreload({
  target: p5.prototype,
  method: "loadCSVAsync",
  addCallbacks: true,
  legacyPreloadSetup: {
    method: "loadD3CSV",
    createBaseObject: function () {
      return [];
    },
  },
});

// Define the synchronous-style wrapper
p5.prototype.loadD3CSV = function (path) {
  let csv = [];
  this.loadCSVAsync(path).then((data) => {
    console.log("return from legacy", data);
    csv.push(...data);
  });
  return csv;
};

// Define the async function
p5.prototype.loadCSVAsync = function (path) {
  return d3.csv(path, d3.autoType);
};

// Register the custom preload function
p5.prototype.registerPromisePreload({
  target: p5.prototype,
  method: "loadJSONAsync",
  addCallbacks: true,
  legacyPreloadSetup: {
    method: "loadD3JSON",
    createBaseObject: function () {
      return {};
    },
  },
});

// Define the async function
p5.prototype.loadJSONAsync = function (path) {
  return d3.json(path);
};

// Define the synchronous-style wrapper
p5.prototype.loadD3JSON = function (path) {
  let json = {};
  this.loadJSONAsync(path).then((data) => {
    console.log("return from legacy", data);
    Object.assign(json, data);
  });
  return json;
};

//--------
// Original Aproach
// third try
// p5.prototype.registerPreloadMethod('loadCSV', p5.prototype);
// maybe buggy, sometimes empty array in setup

p5.prototype.loadCSV = function (path, callback) {
  // Create an object which will clone data from async function and return it.
  // We will need to update that object below, not overwrite/reassign it.
  // It is crucial for the preload() to keep the original pointer/reference.
  // Declaring variables with const assures they won't be reassigned by mistake.
  const ret = [];

  d3.csv(path, d3.autoType).then((csv) => {
    ret.push(...csv);
    console.log("ret from d3", ret);

    if (typeof callback === "function") {
      callback(ret);
    }
  });

  // Return the array immediately (it will be empty at this point)
  // but filled in setup() !!
  return ret;
};
