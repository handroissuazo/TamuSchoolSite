/**
 * Created by Handro on 11/21/2015.
 */

var _data_overviewCounts = {};
var dynamicCounts = {};
var _data_assets_D = [];
var svg;
var path;
var g;
var projection;
var width;
var height;

$( document ).ready(function() {
    // Init of Globals
    dom_init();
    comm_init();
});

// DOM Management
function dom_init() {
    dom_bindButtons();
    dom_createAndBindDatePicker();
}

function dom_showOverviewButton(){
    $("#ToOverview").fadeIn();
}

function dom_hideOverviewButton(){
    $("#ToOverview").fadeOut();
}

function dom_bindButtons(){
    //$('body').on('click', '.linkButton', function(event){
    //    event_onLinkClicked(event);
    //});
    $("#ToOverview").on('click', event_backToOverview);
}

function dom_createOverviewGraph(){
    var dateData = makeCountsObjectForOverviewGraph("1998-02-28", "year", "2015-06-01");

    for(var i = 0; i < dateData.length; ++i){
        var totalDcounts = 0;
        for (var state in dateData[i].Counts){
            totalDcounts += dateData[i].Counts[state].D;
        }
        dateData[i].totalCount = totalDcounts;
    }

    makeGraph(dateData, "Increase in military assets in the US since 1998");
}

function dom_createDateFilteredUSGraph(startDate, endDate, interval) {
    var dateData = makeCountsObjectForOverviewGraph(startDate, interval, endDate);

    for(var i = 0; i < dateData.length; ++i){
        var totalDcounts = 0;
        for (var state in dateData[i].Counts){
            totalDcounts += dateData[i].Counts[state].D;
        }
        dateData[i].totalCount = totalDcounts;
    }

    makeGraph(dateData, "Increase in military assets in the US from "+ startDate + " to " + endDate);
}

function dom_createDateFilteredStateGraph(state){
    var startDate = "1998-02-28";
    var endDate = $("#datepicker").datepicker("getDate");
    var interval = "year";

    var dateData = makeCountsObjectForStateGraph(startDate, interval, endDate, state);

    for(var i = 0; i < dateData.length; ++i){
        var totalDcounts = 0;
        for (var state in dateData[i].Counts){
            totalDcounts += dateData[i].Counts[state].D;
        }
        dateData[i].totalCount = totalDcounts;
    }

    makeGraph(dateData, "Increase in military assets in "+ state +" from "+ startDate + " to " + endDate);
}

function dom_createAndBindDatePicker() {
    $("#datepicker").datepicker({
        onSelect: function (dateText) {
            dynamicCounts = updateCountsByDate(Date.parse(dateText));
            dom_createDateFilteredUSGraph("1998-02-28", dateText, "year");
        },
        dateFormat: 'yy-mm-dd'
    });
    $("#datepicker").datepicker('setDate', new Date());
}

function dom_hideLoadingIndicator(){
    $('#LoadingIndicator').hide();
}

function dom_showLoadingIndicator(){
    $('#LoadingIndicator').show();
}

function dom_CreateMap(){

    width = 960;
    height = 500;

    projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    path = d3.geo.path()
        .projection(projection);

    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    g = svg.append("g");
    d3.json("data/states_usa.topo.json", function(error, us) {
        if (error) throw error;

        g.append("g")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "state")
            .style("fill", function(d) {
                var value = dynamicCounts[d.properties.name].D;
                return "rgba(173, 15, 15, " + value / 10000 + ")";
            })
            .style("stroke", function(d) {
                return "rgba(170, 170, 144, 0.27)";
            })
            .style("stroke-width", function(d) {
                return "2px";
            })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(1)
                    .style("opacity", .9);
                div .html(d.properties.name + "<br/>"  + dynamicCounts[d.properties.name].D)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("click", function(d) {
                event_stateClicked(d);
            });

        //svg.insert("path", ".graticule")
        //    .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
        //    .attr("class", "county-boundary")
        //    .attr("d", path);

    });

    d3.select(self.frameElement).style("height", height + "px");

}

function dom_createCounties(state_name){

    d3.json("data/results.json", function(error, us) {
        if (error) throw error;

        g.append("g")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "county")
            .style("fill", function(d) {
                return "none";
            })
            .style("stroke", function(d) {
                return "rgba(170, 170, 144, 0.27)";
            })
            .style("stroke-width", function(d) {
                return "1px";
            })
            .on("mouseover", function(d) {
                d;
            })
            .on("mouseout", function(d) {

            }).on("mousedown", function(d) {
                d;
            });
    });
}

// Comminucations Management
function comm_init() {
    comm_getLesoOverviewCounts();
    comm_GetLesoD();
}

function comm_getLesoOverviewCounts(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/lesoSummary.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data_overviewCounts = data;
            dynamicCounts = jQuery.extend(true, {}, _data_overviewCounts);
        },
        complete: function() {
            dom_hideLoadingIndicator();
            dom_CreateMap();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function updateCountsByDate(date){
    //Date must be in the format = "2011-11-04"
    var newCounts = jQuery.extend(true, {}, _data_overviewCounts);
    var d1 = date;
    for (var i = 0; i < _data_assets_D.length; ++i){
        var d2 = Date.parse(_data_assets_D[i]["Ship Date"]);
        if (d1 < d2) {
            newCounts[_data_assets_D[i].State].D--;
        }
    }

    svg.selectAll("path")
        .style("fill", function(d) {
            if (d.type == "Feature") {
                var value = newCounts[d.properties.name].D;
                return "rgba(173, 15, 15, " + value / newCounts["CA"].D + ")";
            }
        });


    return newCounts;
}

function makeCountsObjectForOverviewGraph(startDate, interval, endDate){
    var dateData = [];
    var d1 = Date.parse(startDate);
    var d2 = Date.parse(endDate);
    var intervalInSeconds = 31556926000; //year by default

    switch(interval){
        case "day":
            intervalInSeconds = 86400000;
            break;
        case "week":
            intervalInSeconds = 604800000;
            break;
        case "month":
            intervalInSeconds = 2629743000;
            break;
        //case year will keep the value the same.
    }

    for (var currentDate = d1; currentDate <= d2; currentDate += intervalInSeconds ) {
        var countSnapshot = updateCountsByDate(currentDate);
        var graphObj = {};
        graphObj.Date = currentDate;
        graphObj.Counts = countSnapshot;
        dateData.push(graphObj);
    }

    return dateData;
}

function makeCountsObjectForStateGraph(startDate, interval, endDate, state){
    var dateData = [];
    var d1 = Date.parse(startDate);
    var d2 = Date.parse(endDate);
    var intervalInSeconds = 31556926000; //year by default

    switch(interval){
        case "day":
            intervalInSeconds = 86400000;
            break;
        case "week":
            intervalInSeconds = 604800000;
            break;
        case "month":
            intervalInSeconds = 2629743000;
            break;
        //case year will keep the value the same.
    }

    for (var currentDate = d1; currentDate <= d2; currentDate += intervalInSeconds ) {
        var countSnapshot = updateCountsByDateRangeAndState(startDate, currentDate, state);
        var graphObj = {};
        graphObj.Date = currentDate;
        graphObj.Counts = countSnapshot;
        dateData.push(graphObj);
    }

    return dateData;
}

function updateCountsByDateRangeAndState(startDate, currentDate, state){
    //Date must be in the format = "2011-11-04"
    var newCounts = {};
    newCounts[state] = {};
    newCounts[state].D = 0;
    var d1 = Date.parse(startDate);
    for (var i = 0; i < _data_assets_D.length; ++i){
        var d2 = Date.parse(_data_assets_D[i]["Ship Date"]);
        if (d1 < d2 <= currentDate && _data_assets_D[i].State == state) {
            newCounts[state].D++;
        }
    }

    return newCounts;
}

function comm_GetLesoD(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/lesoD.json',
        beforeSend: function() {},
        success: function(data) {
            _data_assets_D = data;
            dom_createOverviewGraph();
        },
        complete: function() {
            // Todo: add some post processing on the information.
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

// Event Handling
function event_onLinkClicked(e){
    var selectedButtonName = e.target.id;
    var url = "dataVis.html?chosenData=" + selectedButtonName;
    window.open(url, '_blank');
}

function dom_clear_set_state_fill(state){
    g.selectAll("path").transition()
        .duration(450)
        .style("fill", function (d) {
            if (d.id == state.id) return "#FFFFFF";
            else return "#CCCCCC"
        });
}

function dom_set_overview_state_fill(){
    g.selectAll("path").transition()
        .duration(450)
        .style("fill", function(d) {
            var value = dynamicCounts[d.properties.name].D;
            return "rgba(173, 15, 15, " + value / 10000 + ")";
        })
}

function event_stateClicked(d) {
    var state = null

    if (d && state !== d) {
        //var xyz = get_xyz(d);
        state = d;
        dom_clear_set_state_fill(state);
        //zoom(xyz);
        setTimeout(function(d){
            dom_createDateFilteredStateGraph(state.properties.name);}
            , 1000);
        dom_showOverviewButton();
    } else {
        state = null;
    }
}

function event_backToOverview(){
    dom_hideOverviewButton();
    dom_set_overview_state_fill();
}

//Helper Functions
function zoom(xyz) {
    g.transition()
        .duration(750)
        .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
        .selectAll(["#countries", "#states", "#cities"])
        .style("stroke-width", 1.0 / xyz[2] + "px")
        .selectAll(".city")
        .attr("d", path.pointRadius(20.0 / xyz[2]));
}

function get_xyz(d) {
    var bounds = path.bounds(d);
    var w_scale = (bounds[1][0] - bounds[0][0]) / width;
    var h_scale = (bounds[1][1] - bounds[0][1]) / height;
    var z = .90 / Math.max(w_scale, h_scale);
    var x = (bounds[1][0] + bounds[0][0]) / 2;
    var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 60);
    return [x, y, z];
}

// Graph scripts
function makeGraph(dateData, graphTitle){
    $("#GraphSpace").empty();
    $("#GraphTitle").empty();
    $("#GraphTitle").html(graphTitle);

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 70},
        width = $('#InformationSideBar').width() - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

// Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse,
        formatDate = d3.time.format("%d-%b"),
        bisectDate = d3.bisector(function(d) { return d.date; }).left;

// Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

// Adds the svg canvas
    var svgGraph = d3.select("#GraphSpace")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var lineSvg = svgGraph.append("g");

    var focus = svgGraph.append("g")
        .style("display", "none");

// Get the data
    var data = [];
    dateData.forEach(function (d) {
        var newObj = {};
        newObj.date = d.Date;
        newObj.close = +d.totalCount;
        data.push(newObj);
    });

    // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data))
            .style("fill", "none")
            .style("stroke-width", 3)
            .style("stroke", "blue");


        // Add the X Axis
        svgGraph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svgGraph.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // append the x line
        focus.append("line")
            .attr("class", "x")
            .style("stroke", "blue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);

        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "blue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width)
            .attr("x2", width);

        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 4);

        // place the value at the intersection
        focus.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");

        // append the rectangle to capture mouse
        svgGraph.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0.getTime() ? d1 : d0;

            focus.select("circle.y")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                    y(d.close) + ")");

            focus.select("text.y1")
                .attr("transform",
                    "translate(" + x(d.date - d.date/10) + "," +
                    y(d.close) + ")")
                .text(d.close);

            focus.select("text.y2")
                .attr("transform",
                    "translate(" + x(d.date - d.date/10) + "," +
                    y(d.close) + ")")
                .text(d.close);

            var theDate = new Date(d.date);
            focus.select("text.y3")
                .attr("transform",
                    "translate(" + x(d.date - d.date/10) + "," +
                    y(d.close) + ")")
                .text(theDate.toLocaleDateString('en-US', {'year': 'numeric'}));

            focus.select("text.y4")
                .attr("transform",
                    "translate(" + x(d.date - d.date/10) + "," +
                    y(d.close) + ")")
                .text(theDate.toLocaleDateString('en-US', {'year': 'numeric'}));

            focus.select(".x")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                    y(d.close) + ")")
                .attr("y2", height - y(d.close));

            focus.select(".y")
                .attr("transform",
                    "translate(" + width * -1 + "," +
                    y(d.close) + ")")
                .attr("x2", width + width);
        }

}