/**
 * Created by Handro on 11/21/2015.
 */

var _data_overviewCounts = {};
var _data_assets_D = [];

$( document ).ready(function() {
    // Init of Globals
    dom_init();
    comm_init();
});

// DOM Management
function dom_init() {
    dom_bindLinkButtons();
}

function dom_bindLinkButtons(){
    $('body').on('click', '.linkButton', function(event){
        event_onLinkClicked(event);
    });
}

function dom_hideLoadingIndicator(){
    $('#LoadingIndicator').hide();
}

function dom_showLoadingIndicator(){
    $('#LoadingIndicator').show();
}

function dom_CreateMap(){
    //basic map config with custom fills, mercator projection
    var map = new Datamap({

        element: document.getElementById('container'),
        scope: 'usa',
        height: 1000,
        fills: {
            defaultFill: '#f0af0a',
            lt50: '#00FF66',
            gt50: 'red'
        },
        data: _data_overviewCounts,
        geographyConfig: {
            highlightBorderColor: '#FFF',
            highlightBorderWidth: 3,
            highlightFillColor: 'rgba(0,200,200,1)',
            popupTemplate: function(geo, data) {
                if (data && data.D)
                    return "<div class='hoverinfo'>" + geo.properties.name + "</br>" + "Total Military Grade Assets: " + data.D + "</div>";
                else
                    return "<div class='hoverinfo'>" + geo.properties.name + "</div>";
            }
        }

    });

    //map.bubbles([
    //    {name: 'Military', latitude: 30.60, longitude: -96.31, radius: 28, fillKey: 'gt50', militarySpending: '36,000', idtag: 'mil' },
    //    {name: 'Tweets', latitude: 30.60, longitude: -96.31, radius: 18, fillKey: 'lt50', tweets: 2500, idtag: 'tweet'}
    //], {
    //    popupTemplate: function(geo, data) {
    //        if (data.idtag === 'tweet')
    //            return "<div class='hoverinfo'> " + data.name
    //                + ' Count on </br> October weekend: ' + data.tweets + "</div>";
    //        else if (data.idtag === 'mil')
    //            return "<div class='hoverinfo'> " + data.name
    //                + ' Spending </br> in 2014: $' + data.militarySpending  + "</div>";
    //    },
    //    borderColor: '#000',
    //    highlightFillColor: '#CC14A6',
    //    highlightBorderColor: '#FFFFFF',
    //    highlightBorderWidth: 4
    //});
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