let data;
let dataAsync;

let years = [2000, 2006, 2012, 2020];
let countries = ["Albania", "Angola", "Burundi", "Myanmar", "Lebanon", "Chad"];

let title = "";

let leftBorder = 200;
let rightBorder = 50;
let topBorder = 80;
let bottomBorder = 50;

function preload() {
  // whoooooop a custom CSV function :)
  data = loadCSV("goal11_long.csv");
  dataAsync = loadD3CSV("goal11_long.csv");
}

function setup() {
  console.log("setup");

  createCanvas(800, 400);

  noLoop();

  console.log("data after preload was executed", data, dataAsync);

  title = data[0].SeriesDescription;

  var quantizeScale = d3
    .scaleQuantize()
    .domain([0, 100])
    .range([color(255, 0, 0), color(255, 255, 0), color(255, 0, 255), color(255, 0, 0)]);

  console.log("quantizeScale", quantizeScale(10));
}

function draw() {
  console.log("data in draw", data, dataAsync);
  background(220);
  textAlign(CENTER, CENTER);
  text(title, width / 2, 20);

  // draw the points
  for (let i = 0; i < dataAsync.length; i++) {
    let d = dataAsync[i];

    // call the new custom functions
    let x = scaleLinear(d.TimePeriod, 2000, 2020, leftBorder, 800 - rightBorder);
    let y = scalePoint(d.GeoAreaName, countries, topBorder, 400 - bottomBorder);
    let f = scaleLinear(d.Value, 0, 100, "#006837", "#a50026");
    let r = scaleSqrt(d.Value, 0, 100, 0, 50);

    fill(f);
    ellipse(x, y, r);
  }

  // draw the country labels
  for (let i = 0; i < countries.length; i++) {
    let d = countries[i];
    let y = scalePoint(d, countries, topBorder, 400 - bottomBorder);
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    text(d, 50, y);
  }

  // draw the year labels
  for (let i = 0; i < years.length; i++) {
    let d = years[i];

    let x = scaleLinear(d, 2000, 2020, leftBorder, 800 - rightBorder);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(d, x, 50);
  }

  for (let i = 0; i < 100; i++) {
    let col = scaleQuantize(i, 0, 100, ["lightblue", "orange", "lightgreen", "pink"]);
    noStroke();
    let x = map(i, 0, 100, leftBorder, width - rightBorder);
    fill(col);
    rect(x, height - 20, 5, 10);
  }

  for (let i = 0; i < 100; i++) {
    let col = scaleThreshold(i, 20, 80, 50, ["#ccc", "lightblue", "orange", "#ccc"]);
    noStroke();
    let x = map(i, 0, 100, leftBorder, width - rightBorder);
    fill(col);
    rect(x, height - 10, 5, 10);
  }
}
