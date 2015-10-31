/**
 * Created by Handro on 10/16/2015.
 */
var bMouseDown = false;
var myCanvas;
jQuery(document).mouseleave(function(){bMouseDown = false;})

$( document ).ready(function() {
    // Init of Globals
    myCanvas = $('#myCanvas');
    var canvasWidth = $(window).width(); //- $(window).width() * 0.05;
    var canvasHeight = $(window).height() ; //- $(window).height() * 0.05;

    var introContent = [];

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


    drawIntroContent();
    //drawContent($(myCanvas));
});

function drawIntroContent()
{
    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: false,
        groups: ['intro'],
        source: 'images/Enter.png',
        x: 10, y: 10,
        scale: 1
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: false,
        groups: ['intro'],
        source: 'images/IntroYellow.png',
        x: 570, y: 400,
        scale: 1,
        click: function(layer) {
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2
            }).drawLayers();
            drawContentBackground('Teachers');
        }
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: false,
        groups: ['intro'],
        source: 'images/IntroGreen.png',
        x: 290, y: 410,
        scale: 1,
        click: function(layer) {
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2
            }).drawLayers();
            drawContentBackground('Unions');
        }
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: false,
        groups: ['intro'],
        source: 'images/IntroBlue.png',
        x: 50, y: 530,
        scale: 1,
        click: function(layer) {
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2
            }).drawLayers();
            drawContentBackground('Students');
        }
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: false,
        groups: ['intro'],
        source: 'images/IntroRed.png',
        x: 290, y: 670,
        scale: 1,
        click: function(layer) {
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2
            }).drawLayers();
            drawContentBackground('Government');
        }
    }).drawLayers();
}

function drawContentBackground(nodeString)
{
    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/backpalette.jpg',
        x: 800, y: 800,
        scale: 3,
        opacity: 0
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: "images/Teachers.png",
        x: 2600, y: -50,
        scale: 1,
        opacity: 0
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: "images/Unions.png",
        x: 450, y: -10,
        scale: 1,
        opacity: 0
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: "images/Students.png",
        x: -950, y: 1300,
        scale: 1,
        opacity: 0
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        fromCenter: false,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: "images/Government.png",
        x: 1000, y: 1500,
        scale: 1,
        opacity: 0
    }).drawLayers();

    // This is to decide the position of the background
    switch (nodeString){
        case 'Teachers':
            Xpos = -2500;
            Ypos = 50;
            break;
        case 'Students':
            Xpos = 1100;
            Ypos = -1330;
            break;
        case 'Unions':
            Xpos = -300;
            Ypos = -30;
            break;
        case 'Government':
            Xpos = -900;
            Ypos = -1500;
            break;
    }

    drawContent();

    myCanvas.setLayerGroup('content', {
        x: '+=' + Xpos,
        y: '+=' + Ypos
    }).animateLayerGroup('content', {
        opacity: 1
    }).drawLayers();

}

function drawContent()
{
    // Draw Students
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Students have agreed in an overwhelming majority that school doesn't engage them as much as it could. The problem stems from far more than teaching material. Vannevar Bush's ideas on the mind and its inner workings highlighted the non-linear processes of our memories and thought processes through his Memex. This parallels how students (and humans) perceive information and learn new concepts. Students aren't responding to standardized and wrote learning schemes. Catering to the students' mind could potentially enhance the student experience and peak interest in education.",
        x: -370, y: 1650,
        maxWidth: 300
    }).drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Here we contrast the use of technology in two different settings, corresponding to socioeconomic conditions and how the perception of technology changes with perspective.",
        x: 40, y: 1730,
        maxWidth: 200
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/Coolidge2-1024x682.jpg',
        x: -470, y: 1250,
        scale: 0.2
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/Montessori-Based-Learning-Apps-Kids.jpg',
        x: -470, y: 1550,
        scale: 0.2
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/BlueToGreen.png',
        x: 0, y: 1350,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '-=1400',
                y: '+=1300'
            }).drawLayers();
        }
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/BlueToRed.png',
        x: 200, y: 1580,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '-=2000',
                y: '-=170'
            }).drawLayers();
        }
    }).drawLayers();

    // Draw Teachers ------------------------------------------
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#36c',
        fontStyle: 'bold',
        fontSize: '16pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: '"When you see a great teacher, you are seeing a work of art." -Geoffrey Canada',
        x: 3230, y: 200,
        maxWidth: 500
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#36c',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "This quote from Geoffrey Canada in the documentary Waiting for Superman describes the complexity and immensity of the job our teachers have. Canada's metaphor exposes the truth that teaching is an art. Teaching requires more than logic, statistics, exams, and grades. Teaching demands the melding of emotion, perception, aspiration to universally convey ideas to students with different backgrounds, intellect, and wants. Sequential and wrote styles of teaching are obviously not working. Introducing new teaching styles that conform to the hypertextual nature of the mind is key for student learning. Finding the balance to convey information in a progressive and exciting way for the students takes an artisan of the mind and a master of patience.",
        x: 3400, y: 380,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#36c',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Traditional methods of teaching and the apathy that grows in american society are conducive to poor educational experiences for low income students. Students of all ages, learn actively through planning, participation, and problem solving, not through passive absorption of information and authority. The linearity and sequential nature of traditional learning doesn't appeal to learners minds. Learning is a complex experience with depth, breadth, and  connections that each human willingly makes unbound from the influence of money, politics, religion, and apathy.",
        x: 3100, y: 380,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#36c',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "www.educationrevolution.org/store/product/onesize/",
        x: 3230, y: 540,
        maxWidth: 580
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/los_angeles_tracy01.jpg',
        x: 2700, y: 490,
        scale: 0.4
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/YellowToGreen.png',
        x: 2800, y: 400,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '+=2200',
                y: '-=80'
            }).drawLayers();
        }
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/YellowToRed.png',
        x: 2950, y: 650,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '+=1600',
                y: '-=1550'
            }).drawLayers();
        }
    }).drawLayers();
    //
    //// Draw Government ------------------------------------------
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#FFF',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: 'Is lack of money the main problem? NO. America spends on average more than most developed countries on education (we rank 4th in the world), but we rank low on educational aptitudes.',
        x: 1800, y: 1820,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        align: 'right',
        fillStyle: '#FFF',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Nonetheless, students and teachers argue that standardized testing isn't properly measuring success. The federal government continues to try and measure students to subjective standards forgetting the originality and unique strengths and weaknesses of each student.",
        x: 1450, y: 2020,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#FFF',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The east coast clearly generates pro-education content and take action to improve our educational system. While on the other hand, the south continues to struggle with censorship, poverty, and stigmas. This is not to say that places like New York don't have underprivileged schools or students because they do and most of the positive content stems from the problems of schools in the north. The issue is that these positive endeavors aren't as prevalent in the south.",
        x: 1800, y: 2020,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/Edited-United-States-School.jpg',
        x: 1450, y: 1860,
        scale: 0.3
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/kono2may.gif',
        x: 1750, y: 2210,
        scale: 0.3
    }).drawLayers();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/stats.png',
        x: 1450, y: 2210,
        scale: 0.3
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/RedToBlue.png',
        x: 1050, y: 1850,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '+=2000',
                y: '+=170'
            }).drawLayers();
        }
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/RedToGreen.png',
        x: 1100, y: 1500,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '+=600',
                y: '+=1470'
            }).drawLayers();
        }
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/RedToYellow.png',
        x: 2000, y: 1510,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '-=1600',
                y: '+=1550'
            }).drawLayers();
        }
    }).drawLayers();
    //
    // Draw Unions ------------------------------------------
    //TODO add a picture describing the labyrinth of the educational state, (people on the outside, then teachers, students, unions and gov in the inside. Then give people the tools. )
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Waiting for Superman highlights the broken bureaucracy of the educational system. Unions, predominantly, are not only minimizing the wages of teachers for political control but are using those misappropriated funds to fuel stagnation in our current education system. The union's power stems from their polarizing arguments and speeches, but the problem is their platform was made and meant for war-fueled industrial economy from WWII. We now have far more fields of study, more students willing to learn and become the best at what they want to do. Our exams and standards try to mold students into cookie cutter definitions of success, and fail to acknowledge the shape and unique qualities of each student. ",
        x: 1360, y: 650,
        maxWidth: 370
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '14pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The intricate interconnections between the needs and wants of teachers, unions, and the federal government create this web of complexity that makes progression extremely difficult. The easiest solution to this labyrinth seems to just break down the walls and tread over the rubble towards the exit. The problem is the walls are high and the people with the bulldozers and tools are outside of this maze. The majority of Americans acknowledge a problem exists in our educational system, but apathy grows as a solution becomes harder to reach politically and socially. Consequently, many people stay uninvolved and uninterested in the future of our students.",
        x: 930, y: 370,
        maxWidth: 400
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/WFS.jpg',
        x: 920, y: 660,
        scale: 0.5
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/GreenToBlue.png',
        x: 750, y: 750,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '+=1400',
                y: '-=1300'
            }).drawLayers();
        }
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/GreenToRed.png',
        x: 1050, y: 800,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '-=600',
                y: '-=1470'
            }).drawLayers();
        }
    }).drawImage({
        layer: true,
        draggable: true,
        fromCenter: false,
        groups: ['content'],
        dragGroups: ['content'],
        source: 'images/GreenToYellow.png',
        x: 1500, y: 400,
        scale: 1,
        click: function (){
            myCanvas.animateLayerGroup('content', {
                x: '-=2200',
                y: '+=80'
            }).drawLayers();
        }
    }).drawLayers();
    ////
    //
    //// General Objects
    //myCanvas.drawRect({
    //    layer: true,
    //    draggable: true,
    //    groups: ['nodes'],
    //    dragGroups: ['nodes'],
    //    strokeStyle: '#0000',
    //    strokeWidth: 1,
    //    x: 1600, y: 1600,
    //    width: 6000,
    //    height: 6000
    //});
    //

    //
    //// Global Layer Settings
    //myCanvas.setLayers({
    //    mousedown: function(layer) {
    //        bMouseDown = true;
    //    },
    //    mouseup: function(layer) {
    //        bMouseDown = false;
    //    },
    //    mousemove: function(layer) {
    //        if (!bMouseDown) return;
    //        var KDSVideo = $("#KidsHateSchoolVideo");
    //        var KDSVideoOffset = KDSVideo.offset();
    //        var top = KDSVideoOffset.top +  layer.dy;
    //        var left = KDSVideoOffset.left + layer.dx;
    //        KDSVideo.offset({top: top, left: left});
    //        //console.log();
    //    }
    //}).drawLayers();
}

function drawMixYellowAndRed() {
    // teachers and the feds
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Teachers don't work under the ideal capitalistic system America boasts so much. They are bound by both union and federal contracts to earn specific wages at certain points in their career. Additionally, the idea of tenure protects the teachers who cannot produce quality lessons and passing students according to American standards. Ultimately, the whole system has clearly been made through a patch work of policies who cater to the adults, when the policy should cater to the needs of our children and students.",
        x: PleasePUTposition, y: TODO,
        maxWidth: 300
    }).restoreCanvas();

}

// Teachers and Unions
function drawMixYellowAndGreen() {

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "",
        x: PleasePUTposition, y: TODO,
        maxWidth: 300
    }).restoreCanvas();
}

//Teachers and students
function drawMixYellowAndBlue() {
    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Religious and prideful zeal overshadows the knowledge and freedom to explore our history as humans and learn as we do, through experience.",
        x: PleasePUTposition, y: TODO,
        maxWidth: 300
    }).restoreCanvas();

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "This adds tension to the debate over curriculum and content in schools. Not only does this animate teachers, but this affects students by enforcing opinions, biases, and cultural lenses that could be detrimental to the pursuit of knowledge.",
        x: PleasePUTposition, y: TODO,
        maxWidth: 300
    }).restoreCanvas();

    // TODO Add picture of the religious zeal and find something on progressive teaching.
}

function drawMixAll() {

    myCanvas.drawText({
        layer: true,
        draggable: true,
        groups: ['content'],
        dragGroups: ['content'],
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The problems Americans face are selfish ones and in turn we look away from progressiveness and community. Some in the educational system would rather let resources go to waste than let them trickle down to less privileged schools. Many districts, communities, and students debate over the censorship of content and strive to maintain old antiquated values that no longer support social and legal trends. Making learning an enjoyable part of life is a collaborative effort of all communities from all walks of life. Ideally, we would all work towards the greater good, but the seams of what we deem cultural, spiritual, economic and social boundaries are too strong to unravel.",
        x: PleasePUTposition, y: TODO,
        maxWidth: 300
    }).restoreCanvas();

    //TODO add found objects and their explanations
}

