# pd53.js

A [D3js](https://d3js.org/) wrapper for P5js made by lovely people at Data Design + Art, HSLU Luzern Switzerland

See https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
to get started with some basics to write P5js libraries

## Current Functions

- scaleLinear()
- scalePoint()
- scaleSqrt()
- loadCSV()

## Planed Additions

- [ ] Write basic documentation for the scales and that they are inspired by the P5 map function 
- [ ] Creating (interpolated) [color scales](https://www.d3indepth.com/scales/#scales-with-continuous-input-and-discrete-output) based on d3 linearScale and others
- [ ] d3 scaleOrdinal
- [ ] d3 scaleQuantise
- [ ] d3 scalePow
- [ ] d3 [projections](https://d3js.org/d3-geo/projection)
- [ ] d3 loadJSON, or even better, combine `loadCSV` and `loadJSON` to `loadData`