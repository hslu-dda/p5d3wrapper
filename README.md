# p5d3wrapper(P5.js + D3.js)

A [D3js](https://d3js.org/) wrapper for P5js made by lovely people at Data Design + Art, HSLU Luzern Switzerland. Currently under early development.

## Current Functions

- loadD3CSV()
- loadD3JSON()
- scaleLinear()
- scalePoint()
- scaleSqrt()
- scaleQuantize()
- scaleQuantile()
- scaleThreshold()

## Planned Additions

- [ ] Write basic documentation for the scales and that they are inspired by the P5 map function
- [ ] Creating (interpolated) [color scales](https://www.d3indepth.com/scales/#scales-with-continuous-input-and-discrete-output) based on d3 linearScale and others
- [ ] d3 scaleOrdinal
- [ ] d3 scalePow
- [ ] d3 [projections](https://d3js.org/d3-geo/projection)
- [ ] d3 loadJSON, or even better, combine `loadCSV` and `loadJSON` to `loadData`

## Usage

### Data Loading

The PD53 Library provides a way to load CSV data using D3.js. Here's an example of how to use `loadD3CSV` in the `preload` function:

```javascript
let data;

function preload() {
  data = loadD3CSV("path/to/your/data.csv");
}

function setup() {
  createCanvas(400, 400);
  console.log(data); // This will log the loaded CSV data
}

function draw() {
  // Use the data to draw your visualization
}
```

Note: The `loadD3CSV` function is asynchronous, but it's designed to work with p5.js's `preload` function. This means the `setup` function won't run until the data is fully loaded.

### Scale Functions

The PD53 Library provides several scaling functions that map values from one range to another. Here are examples of how to use each scale function:

#### scaleLinear

Parameters:

- `value`: The input value to be scaled
- `domainStart`: The start of the input range
- `domainStop`: The end of the input range
- `rangeStart`: The start of the output range
- `rangeStop`: The end of the output range

```javascript
function setup() {
  createCanvas(400, 400);
  let value = 50;
  let mappedValue = scaleLinear(value, 0, 100, 0, width);
  console.log(mappedValue); // Output: 200
}
```

#### scalePoint

Parameters:

- `value`: The input value (one of the categories)
- `domainArray`: An array of all possible categorical values
- `rangeStart`: The start of the output range
- `rangeStop`: The end of the output range

```javascript
function setup() {
  createCanvas(400, 400);
  let categories = ["A", "B", "C", "D"];
  let mappedValue = scalePoint("C", categories, 0, width);
  console.log(mappedValue); // Output: A value between 0 and width
}
```

#### scaleSqrt

The `scaleSqrt` function creates a square root scaling between two ranges. Use this when you want to compress the mapping of larger values, which can be useful for representing areas or making large values less visually dominant.

Parameters:

- `value`: The input value to be scaled
- `domainStart`: The start of the input range
- `domainStop`: The end of the input range
- `rangeStart`: The start of the output range
- `rangeStop`: The end of the output range

```javascript
function setup() {
  createCanvas(400, 400);
  let value = 50;
  let mappedValue = scaleSqrt(value, 0, 100, 0, 100);
  console.log(mappedValue); // Output: A value between 0 and 100, with square root scaling
}
```

#### scaleQuantize

Parameters:

- `value`: The input value to be categorized
- `domainStart`: The start of the input range
- `domainStop`: The end of the input range
- `rangeArray`: An array of output values to map to

```javascript
function setup() {
  createCanvas(400, 400);
  let value = 75;
  let mappedValue = scaleQuantize(value, 0, 100, ["small", "medium", "large"]);
  console.log(mappedValue); // Output: 'large'
}
```

#### scaleQuantile

Parameters:

- `value`: The input value to be categorized
- `domainArray`: An array of sample data to determine quantiles
- `rangeArray`: An array of output values to map to

```javascript
function setup() {
  createCanvas(400, 400);
  let data = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  let mappedValue = scaleQuantile(45, data, ["low", "medium", "high"]);
  console.log(mappedValue); // Output: 'medium'
}
```

#### scaleThreshold

Parameters:

- `value`: The input value to be categorized
- `domainStart`: The start of the input range
- `domainStop`: The end of the input range
- `threshold`: The threshold value for categorization
- `rangeArray`: An array of output values to map to

```javascript
function setup() {
  createCanvas(400, 400);
  let value = 75;
  let mappedValue = scaleThreshold(value, 0, 100, 50, ["cold", "warm", "hot"]);
  console.log(mappedValue); // Output: 'hot'
}
```

## Acknowledgements

This library was created by the Data Design + Art team at HSLU Luzern, Switzerland. Special thanks to the P5.js and D3.js communities for their excellent work.
