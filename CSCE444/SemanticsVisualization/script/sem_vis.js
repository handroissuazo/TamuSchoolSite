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
    dom_bindLinkButtons();
    dom_createAndBindDatePicker();
}

function dom_bindLinkButtons(){
    $('body').on('click', '.linkButton', function(event){
        event_onLinkClicked(event);
    });
}

function dom_createAndBindDatePicker() {
    $("#datepicker").datepicker({
        onSelect: function(dateText) {
            updateCountsByDate(dateText);
        },
        dateFormat: 'yy-mm-dd'
    });
    $("#datepicker").on('change', function(event) {

    });
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
                state_clicked(d);
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

                return "rgba(0, 0, 0, 0.0)";
            })
            .style("stroke", function(d) {
                return "rgba(170, 170, 144, 0.27)";
            })
            .style("stroke-width", function(d) {
                return "2px";
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
    dynamicCounts = jQuery.extend(true, {}, _data_overviewCounts);
    var d1 = Date.parse(date);
    for (var i = 0; i < _data_assets_D.length; ++i){
        var d2 = Date.parse(_data_assets_D[i]["Ship Date"]);
        if (d1 < d2) {
            dynamicCounts[_data_assets_D[i].State].D--;
        }
    }

    svg.selectAll("path")
        .style("fill", function(d) {
            if (d.type == "Feature") {
                var value = dynamicCounts[d.properties.name].D;
                return "rgba(173, 15, 15, " + value / dynamicCounts["CA"].D + ")";
            }
        });


    return dynamicCounts;
}

function comm_GetLesoD(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/lesoD.json',
        beforeSend: function() {},
        success: function(data) {
            _data_assets_D = data;
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

function clear_set_state_fill(state){
    svg.selectAll("path")
        .style("fill", function(d) {
            if(d.id == state.id) return "#FFFFFF";
            else return "#CCCCCC"
        });
}

function state_clicked(d) {
    var state = null

    if (d && state !== d) {
        var xyz = get_xyz(d);
        state = d;
        var state_name = state.properties.name;
        dom_createCounties(state_name);
        clear_set_state_fill(state);
        zoom(xyz);
    } else {
        state = null;
    }
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

function string_similarity(sa1, sa2){
    // Compare two strings to see how similar they are.
    // Answer is returned as a value from 0 - 1
    // 1 indicates a perfect similarity (100%) while 0 indicates no similarity (0%)
    // Algorithm is set up to closely mimic the mathematical formula from
    // the article describing the algorithm, for clarity.
    // Algorithm source site: http://www.catalysoft.com/articles/StrikeAMatch.html
    // (Most specifically the slightly cryptic variable names were written as such
    // to mirror the mathematical implementation on the source site)
    //
    // 2014-04-03
    // Found out that the algorithm is an implementation of the Sørensen–Dice coefficient [1]
    // [1] http://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient
    //
    // The algorithm is an n-gram comparison of bigrams of characters in a string


    // for my purposes, comparison should not check case or whitespace
    var s1 = sa1.replace(/\s/g, "").toLowerCase();
    var s2 = sa2.replace(/\s/g, "").toLowerCase();

    function intersect(arr1, arr2) {
        // I didn't write this.  I'd like to come back sometime
        // and write my own intersection algorithm.  This one seems
        // clean and fast, though.  Going to try to find out where
        // I got it for attribution.  Not sure right now.
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (v in o) {
                r.push(v);
            }
        }
        return r;
    }

    var pairs = function(s){
        // Get an array of all pairs of adjacent letters in a string
        var pairs = [];
        for(var i = 0; i < s.length - 1; i++){
            pairs[i] = s.slice(i, i+2);
        }
        return pairs;
    }

    var similarity_num = 2 * intersect(pairs(s1), pairs(s2)).length;
    var similarity_den = pairs(s1).length + pairs(s2).length;
    var similarity = similarity_num / similarity_den;
    return similarity;
};