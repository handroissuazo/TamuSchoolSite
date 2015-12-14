/**
 * Created by Handro on 11/21/2015.
 */

var _data_overviewCounts = {};
var dynamicCounts = {};
var _data_assets_D = [];
var _state_abbr = [];
var _state_;
var dateData = [];
var svg;
var path;
var div;
var g;
var projection;
var width;
var height;
var bInEventView = false;
var bInStateView = false;

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
    $("#ToOverview").on('click', event_backToOverview);
}

function dom_createOverviewGraph(){
    var dateData = makeCountsObjectForOverviewGraph("2000-01-01", "year", "2015-12-31");

    for(var i = 0; i < dateData.length; ++i){
        var totalDcounts = 0;
        for (var state in dateData[i].Counts){
            totalDcounts += dateData[i].Counts[state].D;
        }
        dateData[i].totalCount = totalDcounts;
    }

    dom_makeGraph(dateData, "Increase in military assets in the US since 2000");
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

    dom_makeGraph(dateData, "Increase in military assets in the US from "+ startDate + " to " + endDate);
}

function dom_createDateFilteredStateGraph(state){
    var dateValues = $("#slider").dateRangeSlider("values");
    var startDate = dateValues.min.getFullYear()  + '-' +  (dateValues.min.getMonth() + 1) + '-' + dateValues.min.getDate();
    var endDate = dateValues.max.getFullYear() + '-' + (dateValues.max.getMonth() + 1) + '-' + dateValues.max.getDate();
    var interval = "year";

    var dateData = event_onStateSelected_makeCountsObjectFromExistingDateData(state);

    for(var i = 0; i < dateData.length; ++i){
        var totalDcounts = 0;
        for (var state in dateData[i].Counts){
            totalDcounts += dateData[i]["Counts"][state].D;
        }
        dateData[i].totalCount = totalDcounts;
    }

    dom_makeGraph(dateData, "Increase in military assets in "+ state +" from "+ startDate + " to " + endDate);
}

function dom_createAndBindDatePicker() {
    $("#slider").dateRangeSlider();
    $("#slider").dateRangeSlider("bounds", new Date(946752097000), new Date());
    $("#slider").dateRangeSlider("min", new Date(946752097000));
    $("#slider").dateRangeSlider("max", new Date());
    $("#slider").bind("valuesChanged", function(e, data){
        var dateValues = $("#slider").dateRangeSlider("values");
        var startDate = dateValues.min.getFullYear()  + '-' +  (dateValues.min.getMonth() + 1) + '-' + dateValues.min.getDate();
        var endDate = dateValues.max.getFullYear() + '-' + (dateValues.max.getMonth() + 1) + '-' + dateValues.max.getDate();
        dynamicCounts = updateCountsByDate(Date.parse(endDate));
        if(bInStateView){
            makeCountsObjectForOverviewGraph(startDate, "year", endDate);
            event_stateClicked(_state_);
        }
        else {
            dom_createDateFilteredUSGraph(startDate, endDate, "year");
        }
    });

}

function dom_hideLoadingIndicator(){
    $('#LoadingIndicator').hide();
}

function dom_showLoadingIndicator(){
    $('#LoadingIndicator').show();
}

function dom_CreateMap(){

    width = 1000;
    height = 500;

    projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    path = d3.geo.path()
        .projection(projection);

    svg = d3.select("#container").append("svg")
        .attr("width", width)
        .attr("height", height);

    div = d3.select("#container").append("div")
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
                div .html(d.properties.name + "<br/> Total # of militarized assets: "  + dynamicCounts[d.properties.name].D)
                    .style("left", (d3.event.pageX - 88) + "px")
                    .style("top", (d3.event.pageY - 58) + "px");
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

function dom_createEventsSlideOut(){
    $('.slide-out-div').tabSlideOut({
        tabHandle: '.handle',                              //class of the element that will be your tab
        pathToTabImage: 'images/events_tab.png',          //path to the image for the tab *required*
        imageHeight: '244px',                               //height of tab image *required*
        imageWidth: '80px',                               //width of tab image *required*
        tabLocation: 'left',                               //side of screen where tab lives, top, right, bottom, or left
        speed: 300,                                        //speed of animation
        action: 'click',                                   //options: 'click' or 'hover', action to trigger animation
        topPos: '200px',                                   //position from the top
        fixedPosition: false                               //options: true makes it stick(fixed position) on scroll
    });

    for(var i = 0; i < _important_dates.length; ++i){
        $('#Events').append("<p class='linkButton' id='" + _important_dates[i].title + "'>" + _important_dates[i].title + "</p>");
    }

    $('#Events').on('click', '.linkButton', function(event){
        event_onEventClicked(event);
    });
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

function dom_setSelectedStateStroke(state){
    g.selectAll("path").transition()
        .duration(450)
        .style("stroke", function (d) {
            if (d.id == state.id) return "#84C8CC";
            else return "rgba(170, 170, 144, 0.27)";
        })
        .style("stroke-width", function(d) {
            if (d.id == state.id) return "4px";
            else return "2px";
        });
}

function dom_setOverviewStateStrokeAndFill(){
    g.selectAll("path").transition()
        .duration(450)
        .style("fill", function(d) {
            var value = dynamicCounts[d.properties.name].D;
            return "rgba(173, 15, 15, " + value / 10000 + ")";
        })
        .style("stroke", function (d) {
            return "rgba(170, 170, 144, 0.27)";
        })
        .style("stroke-width", function(d) {
            return "2px";
        });
}

function dom_updateInformationForState(state){
    if(!bInEventView) {
        $('#InfoBarTitle').empty();
        var stateName = "";
        for (var i = 0; i < _state_abbr.length; ++i) {
            if (state == _state_abbr[i].abbreviation) {
                stateName = _state_abbr[i].name;
                break;
            }
        }
        $('#InfoBarTitle').html(stateName);
        $('#ChangingInformation').empty();
        $('#ChangingInformation').html("Welcome to " + stateName + ". Where the total number of militarized assets is: " + _data_overviewCounts[state].D + ". All states show an increase in assets over time and seem to have a large jump between 2005 and 2006. It's possible that the database became used more religiously around that time to cause such a jump across the country.")
    }
}

function dom_updateInformationForOverview(){
    $('#InfoBarTitle').empty();

    $('#InfoBarTitle').html("United States");
    $('#ChangingInformation').empty();
    $('#ChangingInformation').html("Recently, police brutality has been on the forefront of media tag lines and police departments have come under scrutiny from their respective constituencies. </br> </br> Nonetheless, this map shows the distribution of militarized assets in the United States. Do police need so much? Does this contribute to violence around the country?")
}

function dom_updateInformationForEvent(eventName) {
    $('#InfoBarTitle').empty();
    $('#InfoBarTitle').html(eventName);
    $('#ChangingInformation').empty();

    var eventDate;
    for (var i = 0; i < _important_dates.length; ++i){
        if (eventName == _important_dates[i].title) {
            $('#ChangingInformation').html(_important_dates[i].description + "</br> </br> This event took place: " + _important_dates[i].date)
            eventDate = _important_dates[i].date;

            $('#LinksAndVideos').empty();
            if(_important_dates[i].link){
                $('#LinksAndVideos').append("<iframe width='400' height=350; src='" + _important_dates[i].link + "'></iframe>");
            }

            if(_important_dates[i].video){
                var url = _important_dates[i].video;
                $('#LinksAndVideos').append("<iframe width='400' height=350; src='" + url + "'frameborder='0' allowfullscreen></iframe>");
            }
            break;
        }
    }

    var startDate = Date.parse(eventDate) - 3 * 2629743000;
    var endDate = Date.parse(eventDate) + 3 * 2629743000;

    $("#slider").dateRangeSlider("min", new Date(startDate));
    $("#slider").dateRangeSlider("max", new Date(endDate));

    var dateValues = $("#slider").dateRangeSlider("values");
    startDate = dateValues.min.getFullYear()  + '-' +  (dateValues.min.getMonth() + 1) + '-' + dateValues.min.getDate();
    endDate = dateValues.max.getFullYear() + '-' + (dateValues.max.getMonth() + 1) + '-' + dateValues.max.getDate();

    //Change Graphs for event
    dynamicCounts = updateCountsByDate(Date.parse(endDate));
    bInEventView = true;
    if(bInStateView){
        makeCountsObjectForOverviewGraph(startDate, "year", endDate);
         var d = _state_;
        var state = null
        if (d && state !== d) {
            bInStateView = true;
            state = d;
            _state_ = state;
            dom_setSelectedStateStroke(state);
            setTimeout(function(d){
                dom_createDateFilteredStateGraph(state.properties.name);
            }, 200);
            dom_showOverviewButton();
        }
        else {
            state = null;
        }
    }
    else {
        dom_createDateFilteredUSGraph(startDate, endDate, "year");
    }

}

// Comminucations Management
function comm_init() {
    comm_getEvents();
    comm_getLesoOverviewCounts();
    comm_getStateAbbr();
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

function comm_getStateAbbr(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/states_titlecase.json',
        success: function(data) {
            _state_abbr = data;
        }
    });
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

function comm_getEvents(){
    $.ajax({
        url: 'data/ImportantDates.json',
        success: function(data) {
            _important_dates = data;
        },
        complete: function() {
            dom_createEventsSlideOut();
        },
        error: function() {

        }
    });

}

// Event Handling
function event_onLinkClicked(e){
    var selectedButtonName = e.target.id;
    var url = "dataVis.html?chosenData=" + selectedButtonName;
    window.open(url, '_blank');
}

function event_onEventClicked(e){
    var selectedButtonName = e.target.id;
    dom_updateInformationForEvent(selectedButtonName);
    dom_showOverviewButton();
}

function event_stateClicked(d) {
    var state = null

    if (d && state !== d) {
        bInStateView = true;
        state = d;
        _state_ = state;
        dom_setSelectedStateStroke(state);
        setTimeout(function(d){
            dom_createDateFilteredStateGraph(state.properties.name);
        }, 200);
        dom_showOverviewButton();
        dom_updateInformationForState(state.properties.name);

    } else {
        state = null;
    }
}

function event_backToOverview(){
    bInStateView = false;
    bInEventView = false;
    dom_hideOverviewButton();
    var dateValues = $("#slider").dateRangeSlider("values");
    var startDate = dateValues.min.getFullYear()  + '-' +  (dateValues.min.getMonth() + 1) + '-' + dateValues.min.getDate();
    var endDate = dateValues.max.getFullYear() + '-' + (dateValues.max.getMonth() + 1) + '-' + dateValues.max.getDate();
    dynamicCounts = updateCountsByDate(Date.parse(endDate));
    dom_setOverviewStateStrokeAndFill();
    $('#LinksAndVideos').empty();
    dom_createDateFilteredUSGraph(startDate, endDate, "year");
    dom_updateInformationForOverview();
}

function event_onStateSelected_makeCountsObjectFromExistingDateData(state){
    var newDateData = [];
    for (var i = 0; i < dateData.length; ++i) {
        var graphObj = {};
        var countSnapshot = {};
        countSnapshot[state] = {};
        countSnapshot[state].D = dateData[i]["Counts"][state].D;

        graphObj.Date = dateData[i].Date;
        graphObj.Counts = countSnapshot;
        newDateData.push(graphObj);
    }

    return newDateData;
}

function event_onDateChangedOnState_makeCountsObjectForStateGraph(startDate, interval, endDate, state){
    dateData = [];
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
function dom_makeGraph(dateData, graphTitle){
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

        svgGraph.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x", margin.top - (height / 4))
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("class", "shadow")
            .text("Military Asset Count");

        svgGraph.append("text")
            .attr("y", height - 20)
            .attr("x", 50)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("class", "shadow")
            .text("Date");

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
                .attr("y", height - 20)
                .attr("x", 280)
                .text("Count: " + d.close);

            focus.select("text.y2")
                .attr("y", height - 20)
                .attr("x", 280)
                .text("Count: " + d.close);

            var theDate = new Date(d.date);
            focus.select("text.y3")
                .attr("y", height - 20)
                .attr("x", 280)
                .text("Date: " + theDate.toLocaleDateString());

            focus.select("text.y4")
                .attr("y", height - 20)
                .attr("x", 280)
                .text("Date: " + theDate.toLocaleDateString());

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
    dateData = [];
    var d1 = Date.parse(startDate);
    var d2 = Date.parse(endDate);
    var intervalInSeconds = 31556926000; //use year by default

    if (d2-d1 < intervalInSeconds * 2){ //If less than 2 years
        intervalInSeconds = 2629743000; // use Interval month
        if (d2-d1 < intervalInSeconds * 2){ // If less than 2 months
            intervalInSeconds = 604800000; //use Interval week
            if (d2-d1 < intervalInSeconds * 2){ // If less than 2 weeks
                intervalInSeconds = 604800000;  //use Interval day.
            }
        }
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

function updateCountsByDateRangeAndState(startDate, currentDate, state){
    //Date must be in the format = "2011-11-04"
    var newCounts = {};
    newCounts[state] = {};
    newCounts[state].D = 0;
    var d1 = Date.parse(startDate);
    for (var i = 0; i < _data_assets_D.length; ++i){
        var d2 = Date.parse(_data_assets_D[i]["Ship Date"]);
        if (d1 < d2 && d2 <= currentDate && _data_assets_D[i].State == state) {
            newCounts[state].D++;
        }
    }

    return newCounts;
}

var _important_dates = [
    {
        "title": "Roger Carlos Beating",
        "description": "Two officers part of an undercover task force mistakenly targeted and wrongly beat Roger Carlos using excessive force and leaving him paralyzed after surgery for his wounds.",
        "link": "http://www.kens5.com/story/news/investigations/i-team/2015/11/20/man-beaten-sapd-officers-paralyzed-after-complications-surgery/76120736/?utm_source=hootsuite",
        "date": "2014-05-20"
    },
    {
        "title": "Roy Middleton Shooting",
        "description": "Roy Middleton, a 60-year-old man from Pensacola, Florida, was shot at 15 times by the police after being mistaken for a car thief. Thirteen out of fifteen bullets missed the target and Middleton survived, left with a shattered leg.",
        "link": "http://stopbeingfamous.com/2013/12/26/top-10-police-brutality-moments-of-2013/_3308199.html",
        "date": "2013-12-02"
    },
    {
        "title": "Oscar Grant Shooting",
        "description": "Responding to reports of a fight on a crowded Bay Area Rapid Transit train returning from San Francisco, BART Police officers detained Oscar Grant and several other passengers on the platform at the Fruitvale BART Station. An officer drew his gun and shot Grant once in the back after claiming that he was resisting arrest. Grant was unarmed. He later died sparking a fury of protests and a trial.",
        "video": "https://www.youtube.com/embed/ERsF0beRO5Q",
        "date": "2009-01-01",
        "location": "Oakland, California"
    },
    {
        "title": "Treyvon Martin Shooting",
        "description": "Even though, this is not directly associated with police departments, you can analyze the effects of previous or post transgressions on police departments across the country.",
        "link": "http://www.cnn.com/2013/06/05/us/trayvon-martin-shooting-fast-facts/",
        "date": "2012-02-26"
    },
    {
        "title": "George Zimmerman Acquittal",
        "description": "Even though, this is not directly associated with police departments, you can analyze the effects of the acquittal on police departments across the country.",
        "link": "http://www.nytimes.com/2013/07/14/us/george-zimmerman-verdict-trayvon-martin.html?_r=0",
        "date": "2013-07-13",
    },
];