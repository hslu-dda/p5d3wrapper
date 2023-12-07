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
  const scale = d3
    .scalePoint()
    .domain(domainArray)
    .range([rangeStart, rangeStop]);
  const mappedVal = scale(value);
  return mappedVal;
};

// d3 reference: 
// let rScale = d3.scaleSqrt().domain([0, 100]).range([0, 50]);
p5.prototype.scaleSqrt = function(value, domainStart, domainStop, rangeStart, rangeStop) {
    const scale = d3.scaleSqrt().domain([domainStart, domainStop]).range([rangeStart, rangeStop]);
    const mappedVal = scale(value);
    return mappedVal;
}

// third try
// p5.prototype.registerPreloadMethod('loadCSV', p5.prototype);

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