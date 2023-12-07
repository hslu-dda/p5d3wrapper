let data;

let years = [2000, 2006, 2012, 2020];
let countries = ["Albania", "Angola", "Burundi", "Myanmar", "Lebanon", "Chad"];

let title = '';

let leftBorder = 200;
let rightBorder = 50;
let topBorder = 80;
let bottomBorder = 50;

function preload(){
  // whoooooop a custom CSV function :) 
  data = loadCSV("goal11.csv")
}

function setup() {
  createCanvas(800, 400);

  noLoop();

  console.log("data after preload was executed", data)
  title = data[0].SeriesDescription
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER)
  text(title, width/2, 20);

  // draw the points
  for(let i = 0; i < data.length; i++) {
    let d = data[i];

    // call the new custom functions
    let x = scaleLinear(d.TimePeriod, 2000, 2020, leftBorder, 800-rightBorder);
    let y = scalePoint(d.GeoAreaName, countries, topBorder, 400-bottomBorder);
    let f = scaleLinear(d.Value, 0, 100, '#006837', '#a50026');
    let r = scaleSqrt(d.Value, 0, 100, 0, 50);

    fill(f);
    ellipse(x, y, r);
  }

  // draw the country labels
  for(let i = 0; i < countries.length; i++) {
    let d = countries[i];
    let y = scalePoint(d, countries, topBorder, 400-bottomBorder);
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER)
    text(d, 50, y);
  }

  // draw the year labels
  for(let i = 0; i < years.length; i++) {
    let d = years[i];

    let x = scaleLinear(d, 2000, 2020, leftBorder, 800-rightBorder);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER)
    text(d, x, 50)
  }

}
