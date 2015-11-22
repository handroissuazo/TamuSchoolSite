/**
 * Created by Handro on 11/22/2015.
 */
var _data = {};
$( document ).ready(function() {
    //Get info from link
    var dataString = getUrlParameter('chosenData');

    //Update the title
    $('#theTitle').empty();
    $('#theTitle').html('Now Showing: ' + dataString)

    //Choose the right info to download and view
    switch (dataString) {
        case 'lesoA':
            comm_GetLesoA();
            break;
        case 'lesoB':
            comm_GetLesoB();
            break;
        case 'lesoC':
            comm_GetLesoC();
            break;
        case 'lesoD':
            comm_GetLesoD();
            break;
        case 'lesoE':
            comm_GetLesoE();
            break;
        case 'lesoF':
            comm_GetLesoF();
            break;
        case 'lesoP':
            comm_GetLesoP();
            break;
        case 'lesoQ':
            comm_GetLesoQ();
            break;
        case 'lesoSummary':
            comm_getLesoOverviewCounts();
            break;
        case 'US':
            comm_getUS();
            break;
        case 'USShapes':
            comm_getUSShapes();
            break;
    }
});

function dom_CreatePrettyData(){
    $('#YourData').html(JSON.stringify(_data, undefined, 4));
}

function dom_hideLoadingIndicator(){
    $('#LoadingIndicator').hide();
}

function dom_showLoadingIndicator(){
    $('#LoadingIndicator').show();
}

// Communications
function comm_getLesoOverviewCounts(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/lesoSummary.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoA(){
    $.ajax({
        url: 'data/lesoA.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = { "TheData" : data };
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoB(){
    $.ajax({
        url: 'data/lesoB.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoC(){
    $.ajax({
        url: 'data/lesoC.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoD(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/lesoD.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoE(){
    $.ajax({
        url: 'data/lesoE.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoF(){
    $.ajax({
        url: 'data/lesoF.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoP(){
    $.ajax({
        url: 'data/lesoP.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_GetLesoQ(){
    $.ajax({       // These are pretty military grade assets (espionage and things)
        url: 'data/lesoQ.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_getUS(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/us.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

function comm_getUSShapes(){
    $.ajax({        //These are the militarized assets and will be the main talking point of my project.
        url: 'data/us-state-centroids.json',
        beforeSend: dom_showLoadingIndicator,
        success: function(data) {
            _data = data;
        },
        complete: function() {
            dom_CreatePrettyData();
            dom_hideLoadingIndicator();
        },
        error: function() {
            // Todo: add some error handling to show the user something went wrong.
        }
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};