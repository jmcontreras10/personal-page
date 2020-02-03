// List of words
var myWords = [{word: "Jazz", size: "8"}, 
{word: "Architecture and its History", size: "8"}, 
{word: "People management", size: "20"}, 
{word: "Systems Dinamics", size: "20"}, 
{word: "Dance", size: "8"}, 
{word: "Pilosophy", size: "10"}, 
{word: "Business", size: "25"}, 
{word: "IOT", size: "25"}, 
{word: "Coock", size: "15"}, 
{word: "Rock / Pop", size: "10"},
{word: "Enterprise Achitecture and Digital transformation", size: "25"},
{word: "Business Inteligence", size: "20"},
{word: "Economics", size: "15"},
{word: "Finance", size: "25"},
{word: "Deutsch", size: "20"},
{word: "Medicine", size: "20"} ]

// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 900 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#inter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}