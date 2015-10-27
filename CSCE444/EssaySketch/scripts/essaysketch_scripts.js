/**
 * Created by Handro on 10/16/2015.
 */
var bMouseDown = false;
jQuery(document).mouseleave(function(){bMouseDown = false;})

$( document ).ready(function() {
    // Init of Globals

    var myCanvas = $('#myCanvas');
    var canvasWidth = $(window).width(); //- $(window).width() * 0.05;
    var canvasHeight = $(window).height() ; //- $(window).height() * 0.05;

    var PIXEL_RATIO = (function () {
        var ctx = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    })();

    myCanvas[0].width = canvasWidth;
    myCanvas[0].height = canvasHeight;
    myCanvas[0].style.width = canvasWidth + "px";
    myCanvas[0].style.height = canvasHeight + "px";



    drawContent($(myCanvas));
});

function drawContent(myCanvas)
{
    // Draw Students
    myCanvas.drawRect({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        strokeStyle: '#c33',
        strokeWidth: 4,
        x: 305, y: 305,
        width: 600,
        height: 600
    });
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Students',
        x: 160, y: 20,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Students have a agreed in an overwhelming majority that school doesn't engage them as much as it could. The problem stems from far more than teaching material. There is a seemingly complex labyrinth of information that cycles, turns, and confounds the issue of education the more it's traversed.",
        x: 180, y: 100,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Here we contrast the use of technology in two different settings, corresponding to socioeconomic conditions and how the perception of technology changes with perspective.",
        x: 480, y: 250,
        maxWidth: 200
    }).restoreCanvas();

    //

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/Coolidge2-1024x682.jpg',
        x: 480, y: 100,
        scale: 0.2
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/Montessori-Based-Learning-Apps-Kids.jpg',
        x: 480, y: 400,
        scale: 0.2
    }).drawLayers();

    // Draw Teachers ------------------------------------------
    myCanvas.drawRect({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        strokeStyle: '#FFFF00',
        strokeWidth: 4,
        x: 915, y: 305,
        width: 600,
        height: 600
    });
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Teachers',
        x: 770, y: 20,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '16pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: '"When you see a great teacher, you are seeing a work of art." -Geoffrey Canada',
        x: 900, y: 60,
        maxWidth: 500
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "This quote from Geoffrey Canada in the documentary Waiting for Superman describes the complexity and immensity of the job our teachers have. Canada's metaphor exposes the truth that teaching is an art. Teaching requires more than logic, statistics, exams, and grades. Teaching demands the melding of emotion, perception, aspiration to universally convey ideas to students with different backgrounds, intellect, and wants. Sequential and wrote styles of teaching are obviously not working. Introducing new teaching styles that conform to the hypertextual nature of the mind is key for student learning. Finding the balance to convey information in a progressive and exciting way for the students takes an artisan of the mind and a master of patience.",
        x: 770, y: 240,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Traditional methods of teaching and the apathy that grows in american society are conducive to poor educational experiences for low income students. Students of all ages, learn actively through planning, participation, and problem solving, not through passive absorption of information and authority. The linearity and sequential nature of traditional learning doesn't appeal to learners minds. Learning is a complex experience with depth, breadth, and  connections that each human willingly makes unbound from the influence of money, politics, religion, and apathy.",
        x: 1070, y: 240,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "www.educationrevolution.org/store/product/onesize/",
        x: 1000, y: 400,
        maxWidth: 580
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/los_angeles_tracy01.jpg',
        x: 760, y: 490,
        scale: 0.4
    }).drawLayers();

    // Draw Government ------------------------------------------
    myCanvas.drawRect({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        strokeStyle: '#008000',
        strokeWidth: 4,
        x: 305, y: 915,
        width: 600,
        height: 600
    });
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'U.S. Government',
        x: 160, y: 630,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: 'Is lack of money the main problem? NO. America spends on average more than most developed countries on education (we rank 4th in the world), but we rank low on educational aptitudes.',
        x: 450, y: 710,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Nonetheless, students and teachers argue that standardized testing isn't properly measuring success. The federal government continues to try and measure students to subjective standards forgetting the originality and unique strengths and weaknesses of each student.",
        x: 150, y: 910,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The east coast clearly generates pro-education content and take action to improve our educational system. While on the other hand, the south continues to struggle with censorship, poverty, and stigmas. This is not to say that places like New York don't have underprivileged schools or students because they do and most of the positive content stems from the problems of schools in the north. The issue is that these positive endeavors aren't as prevalent in the south.",
        x: 450, y: 910,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/Edited-United-States-School.jpg',
        x: 160, y: 750,
        scale: 0.3
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/kono2may.gif',
        x: 450, y: 1100,
        scale: 0.3
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/stats.png',
        x: 160, y: 1100,
        scale: 0.3
    }).drawLayers();

    // Draw Unions ------------------------------------------
    myCanvas.drawRect({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        strokeStyle: '#36c',
        strokeWidth: 4,
        x: 915, y: 915,
        width: 600,
        height: 600
    });
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Unions',
        x: 770, y: 630,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Waiting for Superman highlights the broken bureaucracy of the educational system. Unions, predominantly, are not only minimizing the wages of teachers for political control but are using those misappropriated funds to fuel stagnation in our current education system. The union's power stems from their polarizing arguments and speeches, but the problem is their platform was made and meant for war-fueled industrial economy from WWII. We now have far more fields of study, more students willing to learn and become the best at what they want to do. Our exams and standards try to mold students into cookie cutter definitions of success, and fail to acknowledge the shape and unique qualities of each student. ",
        x: 790, y: 760,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The intricate interconnections between the needs and wants of teachers, unions, and the federal government create this web of complexity that makes progression extremely difficult. The easiest solution to this labyrinth seems to just break down the walls and tread over the rubble towards the exit. The problem is the walls are high and the people with the bulldozers and tools are outside of this maze. The majority of Americans acknowledge a problem exists in our educational system, but apathy grows as a solution becomes harder to reach politically and socially so people become uninvolved and uninterested in the future of our students.",
        x: 790, y: 1000,
        maxWidth: 300
    }).restoreCanvas();

    //

    // General Objects
    myCanvas.drawRect({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        strokeStyle: '#0000',
        strokeWidth: 1,
        x: 1600, y: 1600,
        width: 6000,
        height: 6000
    });

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['nodes'],
        dragGroups: ['nodes'],
        source: 'images/WFS.jpg',
        x: 1070, y: 740,
        scale: 0.4
    }).drawLayers();

    // Global Layer Settings
    myCanvas.setLayers({
        mousedown: function(layer) {
            bMouseDown = true;
        },
        mouseup: function(layer) {
            bMouseDown = false;
        },
        mousemove: function(layer) {
            if (!bMouseDown) return;
            var KDSVideo = $("#KidsHateSchoolVideo");
            var KDSVideoOffset = KDSVideo.offset();
            var top = KDSVideoOffset.top +  layer.dy;
            var left = KDSVideoOffset.left + layer.dx;
            KDSVideo.offset({top: top, left: left});
            //console.log();
        }
    }).drawLayers();
}

