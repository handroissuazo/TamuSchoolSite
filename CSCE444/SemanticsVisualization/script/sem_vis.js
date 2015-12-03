/**
 * Created by Handro on 11/21/2015.
 */

var _data_overviewCounts = {};
var dynamicCounts = {};
var _data_assets_D = [];
var svg;

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

    var width = 960,
        height = 500;

    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    d3.json("data/states_usa.topo.json", function(error, us) {
        if (error) throw error;

        //svg.insert("path", ".graticule")
        //    .datum(topojson.feature(us, us.objects.land))
        //    .attr("class", "land")
        //    .attr("d", path);

        svg.selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
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
            });

        //svg.insert("path", ".graticule")
        //    .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
        //    .attr("class", "county-boundary")
        //    .attr("d", path);

        svg.insert("path", ".graticule")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "state-boundary")
            .attr("d", path);

    });

    d3.select(self.frameElement).style("height", height + "px");

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