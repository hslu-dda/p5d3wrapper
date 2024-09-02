let array;
let data;

function preload() {
  array = loadD3JSON("jsonarray.json");
  data = loadD3JSON("example.json");
}

function setup() {
  console.log("setup json");
  createCanvas(400, 400);
  console.log("json array", array);
  console.log("json object", data);
  noLoop();
}

function draw() {}
