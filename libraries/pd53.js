/*
The P5 + D3 = PD53 Library 
Made by lovely people at Data Design + Art, @HSLU Luzern Switzerland

See https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
to get started with some basics to write P5js libraries
*/

console.log(
  "👋 Happy Coding with PD53! Made with ❤️ by data & design ethusiast at Data Design+Art, HSLU Luzern Switzerland"
);

/**
 * Maps a value from one range to another using a linear scale.
 * @function scaleLinear
 * @param {number} value - The value to map.
 * @param {number} domainStart - The start of the input domain.
 * @param {number} domainStop - The end of the input domain.
 * @param {number} rangeStart - The start of the output range.
 * @param {number} rangeStop - The end of the output range.
 * @returns {number} The mapped value.
 */
p5.prototype.scaleLinear = function (value, domainStart, domainStop, rangeStart, rangeStop) {
  const scale = d3.scaleLinear().domain([domainStart, domainStop]).range([rangeStart, rangeStop]);
  return scale(value);
};

/**
 * Maps a value from a domain array to a range using a point scale.
 * @function scalePoint
 * @param {*} value - The value to map.
 * @param {Array} domainArray - An array of discrete values for the domain.
 * @param {number} rangeStart - The start of the output range.
 * @param {number} rangeStop - The end of the output range.
 * @returns {number} The mapped value.
 */
p5.prototype.scalePoint = function (value, domainArray, rangeStart, rangeStop) {
  // TODO: Add error logging if domain & range are not arrays
  const scale = d3.scalePoint().domain(domainArray).range([rangeStart, rangeStop]);
  return scale(value);
};

/**
 * Maps a value from one range to another using a square root scale.
 * @function scaleSqrt
 * @param {number} value - The value to map.
 * @param {number} domainStart - The start of the input domain.
 * @param {number} domainStop - The end of the input domain.
 * @param {number} rangeStart - The start of the output range.
 * @param {number} rangeStop - The end of the output range.
 * @returns {number} The mapped value.
 */
p5.prototype.scaleSqrt = function (value, domainStart, domainStop, rangeStart, rangeStop) {
  const scale = d3.scaleSqrt().domain([domainStart, domainStop]).range([rangeStart, rangeStop]);
  return scale(value);
};

/**
 * Maps a value from one range to another using a quantize scale.
 * @function scaleQuantize
 * @param {number} value - The value to map.
 * @param {number} domainStart - The start of the domain range.
 * @param {number} domainStop - The end of the domain range.
 * @param {Array<any>} rangeArray - An array representing the range values.
 * @returns {*} The mapped value from the range array.
 */
p5.prototype.scaleQuantize = function (value, domainStart, domainStop, rangeArray) {
  const scale = d3.scaleQuantize().domain([domainStart, domainStop]).range(rangeArray);
  return scale(value);
};

/**
 * Maps a value from one range to another using a quantile scale.
 * @function scaleQuantile
 * @param {number} value - The value to map.
 * @param {Array<number>} domainArray - An array representing the domain values.
 * @param {Array<any>} rangeArray - An array representing the range values.
 * @returns {*} The mapped value from the range array.
 */
p5.prototype.scaleQuantile = function (value, domainArray, rangeArray) {
  const scale = d3.scaleQuantile().domain(domainArray).range(rangeArray);
  return scale(value);
};

/**
 * Maps a value from one range to another using a threshold scale.
 * @function scaleThreshold
 * @param {number} value - The value to map.
 * @param {number} domainStart - The start of the domain range.
 * @param {number} domainStop - The end of the domain range.
 * @param {number} threshold - The threshold value.
 * @param {Array<any>} rangeArray - An array representing the range values. The rangeArray can have up to four values: undershoot, <threshold, > threshold, overshoot
 * @returns {*} The mapped value from the range array.
 */
p5.prototype.scaleThreshold = function (value, domainStart, domainStop, threshold, rangeArray) {
  const scale = d3.scaleThreshold().domain([domainStart, threshold, domainStop]).range(rangeArray);
  return scale(value);
};

// Data loading functions
//--------------------------------------------------------------

// Register the custom preload function for CSV
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

/**
 * Synchronous-style wrapper for loading CSV data.
 * @function loadD3CSV
 * @param {string} path - The path to the CSV file.
 * @returns {Array} An array that will be populated with the CSV data.
 */
p5.prototype.loadD3CSV = function (path) {
  let csv = [];
  this.loadCSVAsync(path).then((data) => {
    console.log("return from legacy", data);
    csv.push(...data);
  });
  return csv;
};

/**
 * Asynchronous function for loading CSV data.
 * @function loadCSVAsync
 * @param {string} path - The path to the CSV file.
 * @returns {Promise<Array>} A promise that resolves with the CSV data.
 */
p5.prototype.loadCSVAsync = function (path) {
  return d3.csv(path, d3.autoType);
};

// Register the custom preload function for JSON
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

/**
 * Asynchronous function for loading JSON data.
 * @function loadJSONAsync
 * @param {string} path - The path to the JSON file.
 * @returns {Promise<Object|Array>} A promise that resolves with the JSON data.
 */
p5.prototype.loadJSONAsync = function (path) {
  return d3.json(path);
};

/**
 * Synchronous-style wrapper for loading JSON data.
 * @function loadD3JSON
 * @param {string} path - The path to the JSON file.
 * @returns {Object} An object that will be populated with the JSON data.
 */
p5.prototype.loadD3JSON = function (path) {
  let json = {};
  this.loadJSONAsync(path).then((data) => {
    console.log("return from legacy", data);
    Object.assign(json, data);
  });
  return json;
};

// Original Approach (potentially buggy)
//--------------------------------------------------------------

/**
 * Loads CSV data using D3.
 * @function loadCSV
 * @param {string} path - The path to the CSV file.
 * @param {Function} [callback] - Optional callback function to handle the loaded data.
 * @returns {Array} An array that will be populated with the CSV data.
 */
p5.prototype.loadCSV = function (path, callback) {
  const ret = [];

  d3.csv(path, d3.autoType).then((csv) => {
    ret.push(...csv);
    console.log("ret from d3", ret);

    if (typeof callback === "function") {
      callback(ret);
    }
  });

  return ret;
};

// Register the preload method for JSON loading
p5.prototype.registerMethod("preload", p5.prototype.loadJSON);

/**
 * Loads JSON data using D3.
 * @function loadJSON
 * @param {string} path - The path to the JSON file.
 * @param {Function} [callback] - Optional callback function to handle the loaded data.
 * @returns {Array} An array that will be populated with the JSON data.
 */
p5.prototype.loadJSON = function (path, callback) {
  const p5Instance = this;
  const ret = [];

  p5Instance._incrementPreload();

  d3.json(path, d3.autoType)
    .then((json) => {
      if (Array.isArray(json)) {
        ret.push(...json);
      } else {
        ret.push(json);
      }
      console.log("ret json from d3", ret);
      if (typeof callback === "function") {
        callback(null, ret);
      }
    })
    .catch((error) => {
      console.error("Error loading JSON", error);
      if (typeof callback === "function") {
        callback(error, ret);
      }
    })
    .finally(() => {
      p5Instance._decrementPreload();
    });

  return ret;
};
