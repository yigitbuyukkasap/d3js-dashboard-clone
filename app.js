const data = [
    { id: 1, customer: 'Customer1', value1: 20, value2: 40 },
    { id: 2, customer: 'Customer2', value1: 3, value2: 40 },
    { id: 3, customer: 'Customer3', value1: 23, value2: 40 },
    { id: 4, customer: 'Customer4', value1: 24, value2: 40 },
    { id: 5, customer: 'Customer5', value1: 26, value2: 40 },
    { id: 6, customer: 'Customer6', value1: 287, value2: 40 },
]

const dataset = [1, 4, 6, 7, 8, 9, 10, 11, 12, 5, 6, 7]



const w = 341;
const h = 69;
const padding = 10;



// BAR CHART
const barSvg = d3.select('#customers-chart')
    .attr('width', w)
    .attr('height', h)

barSvg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (w / data.length))
    .attr('y', (d) => h - (d * 4))
    .attr('width', w / data.length - padding)
    .attr('height', (d) => d * 4)
    .attr('fill', '#6201ed')


// AREA CHART
var dataArea = [
    { x: 0, y: 10, },
    { x: 1, y: 15, },
    { x: 2, y: 35, },
    { x: 3, y: 20, },
    { x: 4, y: 50, },
    { x: 5, y: 20, },
];

var dataArea2 = [
    { x: 0, y: 30 },
    { x: 1, y: 20, },
    { x: 2, y: 10, },
    { x: 3, y: 49, },
    { x: 4, y: 40, },
    { x: 5, y: 60, },
];


var margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, d3.max(dataArea, function (d) { return d.x; })])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, d3.max(dataArea, function (d) { return d.y; })])
    .range([height, 0]);


var area = d3.svg.area()
    .x(function (d) { return x(d.x); })
    .y0(height)
    .y1(function (d) { return y(d.y); })
    .interpolate('basis')

var area2 = d3.svg.area()
    .x(function (d) { return x(d.x); })
    .y0(height)
    .y1(function (d) { return y(d.y); })
    .interpolate('basis')


var svg = d3.select("svg#area")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("svg#area2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// stacked iki path
svg.append("path")
    .datum(dataArea)
    .attr("class", "area")
    .attr("d", area);

svg.append("path")
    .datum(dataArea2)
    .attr("class", "area stacked-area")
    .attr("d", area);


// AREA2 EN SAGDAKI CHART
svg2.append("path")
    .datum(dataArea2)
    .attr("class", "area2")
    .attr("d", area2);


// LINE CHART

const getDate = (d) => {
    var strDate = new String(d);

    var year = strDate.substring(0, 4)
    var month = strDate.substring(4, 2) - 1
    var day = strDate.substring(6, 2)

    return new Date(year, month, day)
}

monthlySales = [
    { 'month': 1, 'sales': 500 },
    { 'month': 2, 'sales': 1000 },
    { 'month': 3, 'sales': 1200 },
    { 'month': 4, 'sales': 1200 },
    { 'month': 5, 'sales': 1600 },
    { 'month': 6, 'sales': 1700 },
    { 'month': 9, 'sales': 100 },
]

monthlySales2 = [
    { 'month': 1, 'sales': 600 },
    { 'month': 2, 'sales': 700 },
    { 'month': 3, 'sales': 1400 },
    { 'month': 4, 'sales': 1300 },
    { 'month': 5, 'sales': 1600 },
    { 'month': 6, 'sales': 1500 },
    { 'month': 9, 'sales': 1550 },
]

var margin = { top: 30, right: 120, bottom: 30, left: 50 },
    width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom,
    tooltip = { width: 100, height: 100, x: 10, y: -30 };

var parseDate = d3.time.format("%m/%e/%Y").parse,
    bisectDate = d3.bisector(function (d) { return d.date; }).left,
    formatValue = d3.format(","),
    dateFormatter = d3.time.format("%m/%d/%y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(dateFormatter);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format("s"))

var line = d3.svg.line()
    .x(function (d) { return x(d.month); })
    .y(function (d) { return y(d.sales); });

var lineSvg = d3.select("#line-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain([monthlySales[0].month, monthlySales[monthlySales.length - 1].month]);
y.domain(d3.extent(monthlySales, function (d) { return d.sales; }));

lineSvg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

lineSvg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")


var viz = lineSvg.append('path')
    .attr({
        d: line(monthlySales),
        'stroke': '#29c0b1',
        'stroke-width': 4,
        'fill': 'none',
    })
var viz = lineSvg.append('path')
    .attr({
        d: line(monthlySales2),
        'stroke': '#6201ed',
        'stroke-width': 4,
        'fill': 'none',
    })


var focus = lineSvg.append("g")
    .attr("class", "focus")
    .style("display", "none");

focus.append("circle")
    .attr("r", 5);

focus.append("rect")
    .attr("class", "tooltip")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 10)
    .attr("y", -22)
    .attr("rx", 4)
    .attr("ry", 4);

focus.append("text")
    .attr("class", "tooltip-date")
    .attr('x', 18)
    .attr('y', -2)

lineSvg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function () { focus.style("display", null); })
    .on("mouseout", function () { focus.style("display", "none"); })
    .on("mousemove", mousemove);

function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(monthlySales, x0, 1),
        d0 = monthlySales[i - 1],
        d1 = monthlySales[i],
        d = x0 - d0.month > d1.month - x0 ? d1 : d0;

    focus.attr("transform", "translate(" + x(d.month) + "," + y(d.sales) + ")");
    focus.select(".tooltip-date").text(d.sales);
}



// donut chart

var donut_data = [30, 70, 50];
var r = 100;


var color = d3.scale.ordinal()
    .range(['#6201ed', '#2c50ed', '#29c0b1'])

var donutSvg = d3.select('#donut-chart')
    .attr('width', 350)
    .attr('height', 400)

var group = donutSvg
    .append('g')
    .attr('transform', 'translate(200,200)')

var arc = d3.svg.arc()
    .innerRadius(150)
    .outerRadius(r)

var pie = d3.layout.pie()
    .value(d => d)

var arcs = group.selectAll('.arc')
    .data(pie(donut_data))
    .enter()
    .append('g')
    .attr('class', 'arc')

arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data))

arcs.append('text')
    .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
    .text(d => d.data)
