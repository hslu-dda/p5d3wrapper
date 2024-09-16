let data;
let dataAsync;

function preload() {
  data = loadCSV("goal11_long.csv");
  dataAsync = loadD3CSV("goal11_long.csv");
}

function setup() {
  console.log("setup CSV");
  createCanvas(400, 400);
  console.log("name", dataAsync[0].GeoAreaName);
  console.log("csv", data); // This will log an empty array
  console.log("csv alternative", dataAsync); // This will log an empty array
  noLoop();
}

function draw() {}
