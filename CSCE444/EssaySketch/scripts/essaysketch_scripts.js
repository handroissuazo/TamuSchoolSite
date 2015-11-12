/**
 * Created by Handro on 10/16/2015.
 */
var bMouseDown = false;
var myCanvas;
var bIsInMixedMode = false;
var bIsInOverviewMode = true;
var strCurrentNode = "";

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

    if (canvasHeight < 995 || canvasWidth < 1800){
        $('#ZoomOutNotification').show();
    }

    drawIntroContent();
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
            if (!bIsInOverviewMode) return;
            bIsInOverviewMode = false;
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2,
                index: 0
            }).drawLayers();

            strCurrentNode = 'Teachers';
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
            if (!bIsInOverviewMode) return;
            bIsInOverviewMode = false;
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2,
                index: 0
            }).drawLayers();

            strCurrentNode = 'Unions';
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
            if (!bIsInOverviewMode) return;
            bIsInOverviewMode = false;
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2,
                index: 0
            }).drawLayers();

            strCurrentNode = 'Students';
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
            if (!bIsInOverviewMode) return;
            bIsInOverviewMode = false;
            myCanvas.animateLayerGroup('intro', {
                opacity: 0,
                scale: 2,
                index: 0
            }).drawLayers();

            strCurrentNode = 'Government';
            drawContentBackground('Government');
        }
    }).drawLayers();
}

function drawContentBackground(nodeString)
{
    var Xpos = 0, Ypos = 0;

    if (!bIsContentDrawn) {
        myCanvas.drawImage({
            layer: true,
            fromCenter: false,
            
            groups: ['content'],
            index: 0,
            source: 'images/backpalette.jpg',
            x: 800, y: 800,
            scale: 3,
            opacity: 0
        }).drawImage({
            layer: true,
            fromCenter: false,  
            groups: ['content'],
            source: "images/Teachers.png",
            x: 2600, y: -50,
            scale: 1,
            opacity: 0
        }).drawImage({
            layer: true,
            fromCenter: false,
            groups: ['content'],
            
            source: "images/Unions.png",
            x: 450, y: -10,
            scale: 1,
            opacity: 0
        }).drawImage({
            layer: true,
            fromCenter: false,
            groups: ['content'],
            source: "images/Students.png",
            x: -950, y: 1300,
            scale: 1,
            opacity: 0
        }).drawImage({
            layer: true,
            fromCenter: false,
            
            groups: ['content'],
            
            source: "images/Government.png",
            x: 1000, y: 1500,
            scale: 1,
            opacity: 0
        }).drawLayers();
    }
    else{
        Xpos = -300;
        //Ypos = -300;
    }

    // This is to decide the position of the background
    switch (nodeString){
        case 'Teachers':
            Xpos += -2500;
            Ypos += 50;
            break;
        case 'Students':
            Xpos += 1100;
            Ypos += -1330;
            break;
        case 'Unions':
            Xpos += -300;
            Ypos += -30;
            break;
        case 'Government':
            Xpos += -900;
            Ypos += -1500;
            break;
    }

    drawContent();

    setTimeout(function() {
        myCanvas.setLayerGroup('content', {
            x: '+=' + Xpos,
            y: '+=' + Ypos
        }).animateLayerGroup('content', {
            opacity: 1
        }).drawLayers();

        ShowGoBackButton();
        ShowMixAllButton();
        leaveMixedState();
    }, 1000);


}

var bIsContentDrawn = false;
function drawContent()
{
    if (bIsContentDrawn) return;
    bIsContentDrawn = true;

    // Global Assets
    $('#MixAllButton').click(function(){
       drawMixAll();
    });

    $('#BackToOverviewButton').click(function(){
        GoBackToOverview();
    });

    ShowMixAllButton();
    ShowGoBackButton();

    // Draw Students
    myCanvas.drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Students have agreed in an overwhelming majority that school doesn't engage them as much as it could. The problem stems from far more than teaching material. Vannevar Bush's ideas on the mind and its inner workings highlighted the non-linear processes of our memories and thought processes through his Memex. This parallels how students (and humans) perceive information and learn new concepts. Students aren't responding to standardized and wrote learning schemes. Catering to the students' mind could potentially enhance the student experience and peak interest in education.",
        x: -370, y: 1650,
        opacity: 0,
        maxWidth: 300
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Here we contrast the use of technology in two different settings, corresponding to socioeconomic conditions and how the perception of technology changes with perspective.",
        x: 40, y: 1730,
        opacity: 0,
        maxWidth: 200
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content'],
        
        source: 'images/Coolidge2-1024x682.jpg',
        x: -470, y: 1250,
        opacity: 0,
        scale: 0.2
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content'],
        
        source: 'images/Montessori-Based-Learning-Apps-Kids.jpg',
        x: -470, y: 1550,
        opacity: 0,
        scale: 0.2
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/BlueToGreen.png',
        x: 0, y: 1350,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '-=1400',
                y: '+=1300'
            }).drawLayers();

            strCurrentNode = 'Unions';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/BlueToRed.png',
        x: 200, y: 1580,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '-=2000',
                y: '-=170'
            }).drawLayers();

            strCurrentNode = 'Government';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'mixer', 'traversal'],
        
        source: 'images/MixBlueAndYellow.png',
        x: 330, y: 1480,
        opacity: 0,
        scale: 1,
        click: function (layer){
            drawMixYellowAndBlue('Students');
        }
    }).drawLayers()

    // Draw Teachers ------------------------------------------
    myCanvas.drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#635A0A',
        fontStyle: 'bold',
        fontSize: '15pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: '"When you see a great teacher, you are seeing a work of art." -Geoffrey Canada',
        x: 3230, y: 200,
        opacity: 0,
        maxWidth: 500
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#635A0A',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "This quote from Geoffrey Canada in the documentary Waiting for Superman describes the complexity and immensity of the job our teachers have. Canada's metaphor exposes the truth that teaching is an art. Teaching requires more than logic, statistics, exams, and grades. Teaching demands the melding of emotion, perception, aspiration to universally convey ideas to students with different backgrounds, intellect, and wants. Sequential and wrote styles of teaching are obviously not working. Introducing new teaching styles that conform to the hypertextual nature of the mind is key for student learning. Finding the balance to convey information in a progressive and exciting way for the students takes an artisan of the mind and a master of patience.",
        x: 3450, y: 400,
        opacity: 0,
        maxWidth: 280
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#635A0A',
        fontSize: '13pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Traditional methods of teaching and the apathy that grows in american society are conducive to poor educational experiences for low income students. Students of all ages, learn actively through planning, participation, and problem solving, not through passive absorption of information and authority. The linearity and sequential nature of traditional learning doesn't appeal to learners minds. Learning is a complex experience with depth, breadth, and  connections that each human willingly makes unbound from the influence of money, politics, religion, and apathy.",
        x: 3150, y: 420,
        opacity: 0,
        maxWidth: 280
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#635A0A',
        fontSize: '10pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "www.educationrevolution.org/store/product/onesize/",
        click: function(){
            window.location.href = "http://www.educationrevolution.org/store/product/onesize/";
        },
        x: 3530, y: 840,
        opacity: 0,
        maxWidth: 580
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content'],
        
        source: 'images/los_angeles_tracy01.jpg',
        x: 2950, y: 520,
        opacity: 0,
        scale: 0.4
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/YellowToGreen.png',
        x: 2800, y: 600,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '+=2200',
                y: '-=80'
            }).drawLayers();

            strCurrentNode = 'Unions';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/YellowToRed.png',
        x: 2950, y: 650,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '+=1600',
                y: '-=1550'
            }).drawLayers();

            strCurrentNode = 'Government';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'mixer', 'traversal'],
        
        source: 'images/MixYellowGreen.png',
        x: 2570, y: 200,
        opacity: 0,
        scale: 1,
        click: function (layer){
            drawMixYellowAndGreen('Teachers');
        }
    }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixer', 'traversal'],
            
            source: 'images/MixBlueAndYellow.png',
            x: 3800, y: 400,
        opacity: 0,
            scale: 1,
            click: function (layer){
                drawMixYellowAndBlue('Teachers');
            }
        }).drawLayers()
    //
    //// Draw Government ------------------------------------------
    myCanvas.drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#FFF',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: 'Is lack of money the main problem? NO. America spends on average more than most developed countries on education (we rank 4th in the world), but we rank low on educational aptitudes.',
        x: 1850, y: 1820,
        opacity: 0,
        maxWidth: 300
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        align: 'right',
        fillStyle: '#FFF',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: "Nonetheless, students and teachers argue that standardized testing isn't properly measuring success. The federal government continues to try and measure students to subjective standards forgetting the originality and unique strengths and weaknesses of each student.",
        x: 1500, y: 2020,
        opacity: 0,
        maxWidth: 280
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#FFF',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The east coast predominantly generates pro-education content and takes action to improve our educational system. While on the other hand, the south continues to struggle with censorship, poverty, and stigmas. This is not to say that places like New York don't have underprivileged schools or students because they do and most of the positive content stems from the problems of schools in the north. The issue is that these positive endeavors aren't as prevalent in the south.",
        x: 1850, y: 2020,
        opacity: 0,
        maxWidth: 280
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        
        groups: ['content'],
        
        source: 'images/Edited-United-States-School.jpg',
        x: 1500, y: 1860,
        opacity: 0,
        scale: 0.3
    }).drawImage({
        layer: true,
        
        groups: ['content'],
        
        source: 'images/kono2may.gif',
        x: 1800, y: 2210,
        opacity: 0,
        scale: 0.3
    }).drawImage({
        layer: true,
        
        groups: ['content'],
        
        source: 'images/stats.png',
        opacity: 0,
        x: 1500, y: 2210,
        scale: 0.3,
        mouseover: function(layer){
            $(this).animateLayer(layer, {
                scale: 1,
                x: '+=200',
                y: '-=300'
            });
        },
        mouseout: function(layer){
            $(this).animateLayer(layer, {
                scale: 0.3,
                x: '-=200',
                y: '+=300'
            });
        }

    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/RedToBlue.png',
        x: 1050, y: 1850,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '+=2000',
                y: '+=170'
            }).drawLayers();

            strCurrentNode = 'Students';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/RedToGreen.png',
        x: 1100, y: 1500,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '+=600',
                y: '+=1470'
            }).drawLayers();

            strCurrentNode = 'Unions';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/RedToYellow.png',
        x: 2000, y: 1510,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '-=1600',
                y: '+=1550'
            }).drawLayers();

            strCurrentNode = 'Teachers';
        }
    }).drawLayers();
    //
    // Draw Unions ------------------------------------------
    //TODO add a picture describing the labyrinth of the educational state, (people on the outside, then teachers, students, unions and gov in the inside. Then give people the tools. )
    myCanvas.drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#000',
        fontSize: '12pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "Waiting for Superman highlights the broken bureaucracy of the educational system. Unions, predominantly, are not only minimizing the wages of teachers for political control but are using those misappropriated funds to fuel stagnation in our current education system. The union's power stems from their polarizing arguments and speeches, but the problem is their platform was made and meant for war-fueled industrial economy from WWII. We now have far more fields of study, more students willing to learn and become the best at what they want to do. Our exams and standards try to mold students into cookie cutter definitions of success, and fail to acknowledge the shape and unique qualities of each student. ",
        x: 1360, y: 650,
        opacity: 0,
        maxWidth: 370
    }).drawText({
        layer: true,
        
        groups: ['content'],
        
        fillStyle: '#000',
        fontSize: '14pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        align: 'left',
        text: "The intricate interconnections between the needs and wants of teachers, unions, and the federal government create this web of complexity that makes progression extremely difficult. The easiest solution to this labyrinth seems to just break down the walls and tread over the rubble towards the exit. The problem is the walls are high and the people with the bulldozers and tools are outside of this maze. The majority of Americans acknowledge a problem exists in our educational system, but apathy grows as a solution becomes harder to reach politically and socially. Consequently, many people stay uninvolved and uninterested in the future of our students.",
        x: 930, y: 370,
        opacity: 0,
        maxWidth: 400
    }).restoreCanvas();

    myCanvas.drawImage({
        layer: true,
        
        groups: ['content'],
        
        source: 'images/WFS.jpg',
        x: 920, y: 660,
        opacity: 0,
        scale: 0.5
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/GreenToBlue.png',
        x: 750, y: 750,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '+=1400',
                y: '-=1300'
            }).drawLayers();

            strCurrentNode = 'Students';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/GreenToRed.png',
        x: 1050, y: 800,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '-=600',
                y: '-=1470'
            }).drawLayers();

            strCurrentNode = 'Government';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'traversal'],
        
        source: 'images/GreenToYellow.png',
        x: 1500, y: 400,
        opacity: 0,
        scale: 1,
        click: function (){
            if (bIsInMixedMode) return;
            myCanvas.animateLayerGroup('content', {
                x: '-=2200',
                y: '+=80'
            }).drawLayers();

            strCurrentNode = 'Teachers';
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'mixer', 'traversal'],
        
        source: 'images/MixYellowGreen.png',
        x: 1570, y: 200,
        opacity: 0,
        scale: 1,
        click: function (layer){
            drawMixYellowAndGreen('Unions');
        }
    }).drawImage({
        layer: true,
        
        fromCenter: false,
        groups: ['content', 'mixer'],
        
        source: 'images/labyrinth.png',
        x: 1150, y: 220,
        opacity: 0,
        scale: 1
    }).drawLayers();
}

function enterMixedState() {
    //Hide all other traversal buttons
    HideMixAllButton();
    HideGoBackButton();
    bIsInMixedMode = true;
    myCanvas.animateLayerGroup('traversal', {
        opacity: 0
    }).animateLayerGroup('mixTraversal', {
        opacity: 1
    }).drawLayers();
}

function leaveMixedState() {
    ShowMixAllButton();
    ShowGoBackButton();

    bIsInMixedMode = false;
    myCanvas.animateLayerGroup('traversal', {
        opacity: 1
    }).animateLayerGroup('mixTraversal', {
        opacity: 0
    }).drawLayers();
}

// Teachers and Unions
var bIsTeacherAndUnionsDrawn = false;
function drawMixYellowAndGreen(FromLocation) {
    if (!bIsTeacherAndUnionsDrawn) {
        var posXArr = [];
        var posYArr = [];

        if(FromLocation == 'Unions') {
            //UnionAndTeachers png
            posXArr.push(970);
            posYArr.push(0);

            //YtG pos
            posXArr.push(1410);
            posYArr.push(300);

            //GtY pos
            posXArr.push(2300);
            posYArr.push(400);

            //Content
            posXArr.push(1850);
            posYArr.push(400);

            posXArr.push(1950);
            posYArr.push(700);
        }
        else if (FromLocation == 'Teachers') {
            posXArr.push(-1230);
            posYArr.push(80);

            //YtG pos
            posXArr.push(-790);
            posYArr.push(380);

            //GtY pos
            posXArr.push(100);
            posYArr.push(480);

            //Content
            posXArr.push(-350);
            posYArr.push(480);

            posXArr.push(-250);
            posYArr.push(780);
        }

        myCanvas.drawImage({
            layer: true,
            
            index: 1,
            fromCenter: false,
            groups: ['content'],
            
            source: 'images/UnionsAndTeachers.png',
            x: posXArr[0], y: posYArr[0],
            scale: 1
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixTraversal'],
            
            source: 'images/YellowToGreen.png',
            x: posXArr[1], y: posYArr[1],
            opacity: 0,
            scale: 1,
            click: function(){
                if (!bIsInMixedMode) return;
                myCanvas.animateLayerGroup('content', {
                    x: '+=1050',
                    y: '+=20'
                }).drawLayers().restoreCanvas();

                strCurrentNode = 'Unions';
                leaveMixedState();
            }
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixTraversal'],
            
            source: 'images/GreenToYellow.png',
            x: posXArr[2], y: posYArr[2],
            opacity: 0,
            scale: 1,
            click: function(){
                if (!bIsInMixedMode) return;
                myCanvas.animateLayerGroup('content', {
                    x: '-=1150',
                    y: '+=100'
                }).drawLayers().restoreCanvas();

                strCurrentNode = 'Teachers';
                leaveMixedState();
            }
        }).drawLayers();

        myCanvas.drawText({
            layer: true,
            
            groups: ['content'],
            
            fillStyle: '#000',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "Teachers and Unions have developed a parasitic relationship throughout the last few decades. Unions rely on teacher membership and at best serve only the teachers leaving students as a last priority. Unions; main focus is to block legislation that would change, reform, and rebuild our education system for the better.",
            x: posXArr[3], y: posYArr[3],
            maxWidth: 300
        }).drawText({
            layer: true,
            
            groups: ['content'],
            
            fillStyle: '#000',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "Unions blame poor scores on bad teachers and the broken bureaucratic structure of failing districts and they are correct in that analysis. The problem stems from the fact that most teachers unions support this broken system by opposing new reformations in the educational system.",
            x: posXArr[4], y: posYArr[4],
            maxWidth: 300
        }).restoreCanvas();

        bIsTeacherAndUnionsDrawn = true;
    }

    if(FromLocation == 'Unions') {
        myCanvas.animateLayerGroup('content', {
            x: '-=1050',
            y: '-=20'
        }).drawLayers();
    }
    else if (FromLocation == 'Teachers') {
        myCanvas.animateLayerGroup('content', {
            x: '+=1150',
            y: '-=100'
        }).drawLayers();
    }
    enterMixedState();
}

//Teachers and students
var bIsTeacherAndStudentsDrawn = false;
function drawMixYellowAndBlue(FromLocation) {
    if (!bIsTeacherAndStudentsDrawn) {
        var posXArr = [];
        var posYArr = [];

        if(FromLocation == 'Students') {
            //Back
            posXArr.push(-100);
            posYArr.push(730);

            //Pic
            posXArr.push(470);
            posYArr.push(730);

            //Text
            posXArr.push(700);
            posYArr.push(1030);

            //Text
            posXArr.push(700);
            posYArr.push(1350);

            //Up to blue
            posXArr.push(900);
            posYArr.push(800);
        }
        else if (FromLocation == 'Teachers') {
            //Back
            posXArr.push(-3700);
            posYArr.push(2130);

            //Pic
            posXArr.push(-3130);
            posYArr.push(2130);

            //Text
            posXArr.push(-2900);
            posYArr.push(2430);

            //Text
            posXArr.push(-2900);
            posYArr.push(2750);

            //Up to blue
            posXArr.push(-2700);
            posYArr.push(2150);
        }

        myCanvas.drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content'],
            
            source: 'images/StudentsAndTeachers.png',
            x: posXArr[0], y: posYArr[0],
            scale: 1,
            index: 1
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content'],
            
            source: 'images/ReligiousZeal.png',
            scale: 0.3,
            x: posXArr[1], y: posYArr[1],
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixTraversal'],
            
            source: 'images/RedToBlue.png',
            x: posXArr[4], y: posYArr[4],
            opacity: 0,
            scale: 1,
            rotate: 90,
            index: 99,
            click: function(){
                if (!bIsInMixedMode) return;
                myCanvas.animateLayerGroup('content', {
                    x: '+=0',
                    y: '+=750'
                }).drawLayers().restoreCanvas();

                strCurrentNode = 'Students';
                leaveMixedState();
            }
        }).drawLayers();

        myCanvas.drawText({
            layer: true,
            
            groups: ['content'],
            
            fillStyle: '#000',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "Religious and prideful zeal overshadows the knowledge and freedom to explore our history as humans and learn as we do, through experience. Many underestimate the impressionability and influence adult have on students when it comes to controversial issues thus disregarding the impact their actions cause on students.",
            x: posXArr[2], y: posYArr[2],
            maxWidth: 300
        }).drawText({
            layer: true,
            
            groups: ['content'],
            
            fillStyle: '#000',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "This adds tension to the debate over curriculum and content in schools. Not only does this animate teachers, but this affects students by enforcing opinions, biases, and cultural lenses that could be detrimental to the pursuit of knowledge.",
            x: posXArr[3], y: posYArr[3],
            maxWidth: 300
        }).restoreCanvas();

        bIsTeacherAndStudentsDrawn = true;
    }

    if(FromLocation == 'Students') {
        myCanvas.animateLayerGroup('content', {
            x: '-=0',
            y: '-=750'
        }).drawLayers();
    }
    else if (FromLocation == 'Teachers') {
        myCanvas.animateLayerGroup('content', {
            x: '+=3600',
            y: '-=2130'
        }).drawLayers();
    }
    enterMixedState();
}

var bIsMixAllDrawn = false;
function drawMixAll() {
    if (!bIsMixAllDrawn) {
        bIsMixAllDrawn = true;
        var posXArr = [];
        var posYArr = [];

        var positionX, positionY;
        if (strCurrentNode == 'Students') {
            positionX = 2400;
            positionY = -600;

        }
        else if (strCurrentNode == 'Teachers') {
            positionX = -1200;
            positionY = 780;
        }
        else if (strCurrentNode == 'Government') {
            positionX = 400;
            positionY = -770;
        }
        else if (strCurrentNode == 'Unions') {
            positionX = 1000;
            positionY = 700;
        }

        //Back
        posXArr.push(positionX);
        posYArr.push(positionY);

        //Pic
        posXArr.push(positionX + 200);
        posYArr.push(positionY + 70);

        //Text
        posXArr.push(positionX + 700);
        posYArr.push(positionY + 170);

        //Text
        posXArr.push(positionX + 650);
        posYArr.push(positionY + 470);

        //Up to blue
        posXArr.push(positionX + 1000);
        posYArr.push(positionY + 690);

        //Text
        posXArr.push(positionX + 200);
        posYArr.push(positionY + 630);

        //Found Objects
        posXArr.push(positionX + 500);
        posYArr.push(positionY + 50);

        //Found Objects Text
        posXArr.push(positionX + 1350);
        posYArr.push(positionY + 250);

        myCanvas.drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content'],
            
            source: 'images/MixAllNode.png',
            index: 1,
            x: posXArr[0], y: posYArr[0],
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixTraversal'],
            
            source: 'images/RedToGreen.png',
            x: posXArr[1], y: posYArr[1],
            opacity: 0,
            scale: 1,
            index: 99,
            click: function () {
                if (!bIsInMixedMode || strCurrentNode != "MixedAll") return;
                myCanvas.animateLayerGroup('content', {
                    x: '+=1000',
                    y: '+=700'
                }).drawLayers().restoreCanvas();

                strCurrentNode = 'Unions';
                leaveMixedState();
            }
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixTraversal'],
            
            source: 'images/RedToYellow.png',
            x: posXArr[2], y: posYArr[2],
            opacity: 0,
            scale: 1,
            index: 99,
            click: function () {
                if (!bIsInMixedMode || strCurrentNode != "MixedAll") return;
                myCanvas.animateLayerGroup('content', {
                    x: '-=1200',
                    y: '+=780'
                }).drawLayers().restoreCanvas();

                strCurrentNode = 'Teachers';
                leaveMixedState();
            }
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content', 'mixTraversal'],
            
            source: 'images/GreenToRed.png',
            x: posXArr[5], y: posYArr[5],
            opacity: 0,
            scale: 1,
            index: 99,
            click: function () {
                if (!bIsInMixedMode || strCurrentNode != "MixedAll") return;
                myCanvas.animateLayerGroup('content', {
                    x: '+=400',
                    y: '-=770'
                }).drawLayers().restoreCanvas();

                strCurrentNode = 'Unions';
                leaveMixedState();
            }
        }).drawImage({
            layer: true,
            
            fromCenter: false,
            groups: ['content'],
            source: 'images/FoundObjects.png',
            x: posXArr[6], y: posYArr[6],
            opacity: 1,
            scale: 0.5,
        }).drawLayers();

        myCanvas.drawText({
            layer: true,
            groups: ['content'],
            fillStyle: '#FFF',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "The problems Americans face are selfish ones and in turn we look away from progressiveness and community. Some in the educational system would rather let resources go to waste than let them trickle down to less privileged schools. Many districts, communities, and students debate over the censorship of content and strive to maintain old antiquated values that no longer support social and legal trends. Making learning an enjoyable part of life is a collaborative effort of all communities from all walks of life. Ideally, we would all work towards the greater good, but the seams of what we deem cultural, spiritual, economic and social boundaries are too strong to unravel.",
            x: posXArr[3], y: posYArr[3],
            maxWidth: 300
        }).drawText({
            layer: true,
            groups: ['content'],
            fillStyle: '#FFF',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "Teachers don't work under the ideal capitalistic system America boasts so much. They are bound by both union and federal contracts to earn specific wages at certain points in their career. Additionally, the idea of tenure protects the teachers who cannot produce quality lessons and passing students according to American standards. Ultimately, the whole system has clearly been made through a patch work of policies who cater to the adults, when the policy should cater to the needs of our children and students.",
            x: posXArr[4], y: posYArr[4],
            maxWidth: 300
        }).drawText({
            layer: true,
            groups: ['content'],
            fillStyle: '#635A0A',
            fontSize: '12pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            align: 'left',
            text: "These found objects represent the juxtaposition of the hyperbolized and idealized messages of the posters you find in most classrooms and schools across America to the most common view of many parents, teachers, and Americans towards low-income schools. Which ,consequently, symbolizes the major theme of this sketch.",
            x: posXArr[7], y: posYArr[7],
            maxWidth: 500
        }).restoreCanvas();

        //
    }

    if(strCurrentNode == 'Students') {
        myCanvas.animateLayerGroup('content', {
            x: '-=2400',
            y: '+=600'
        }).drawLayers();
    }
    else if (strCurrentNode == 'Teachers') {
        myCanvas.animateLayerGroup('content', {
            x: '+=1200',
            y: '-=780'
        }).drawLayers();
    }
    else if (strCurrentNode == 'Government') {
        myCanvas.animateLayerGroup('content', {
            x: '-=400',
            y: '+=770'
        }).drawLayers();
    }
    else if (strCurrentNode == 'Unions') {
        myCanvas.animateLayerGroup('content', {
            x: '-=1000',
            y: '-=700'
        }).drawLayers();
    }
    strCurrentNode = "MixedAll";

    enterMixedState();
}

function HideMixAllButton(){
    $('#MixAllButton').hide();
}

function ShowMixAllButton(){
    $('#MixAllButton').show();
}

function HideGoBackButton(){
    $('#BackToOverviewButton').hide();
}

function ShowGoBackButton(){
    $('#BackToOverviewButton').show();
}

var bIntroIsYandBShown = false;
var bIntroIsGandYShown = false;
var bIntroIsAllMixedShown = false;
function GoBackToOverview(){
    HideGoBackButton();
    HideMixAllButton();
    var Xpos = 0, Ypos = 0;

    // This is to decide the position of the background
    switch (strCurrentNode){
        case 'Teachers':
            Xpos = 2500;
            Ypos = -50;
            break;
        case 'Students':
            Xpos = -1100;
            Ypos = 1330;
            break;
        case 'Unions':
            Xpos = 300;
            Ypos = 30;
            break;
        case 'Government':
            Xpos = 900;
            Ypos = 1500;
            break;
    }

    myCanvas.animateLayerGroup('content', {
        opacity: 0,
    }).drawLayers().restoreCanvas();



    setTimeout(function() {
        myCanvas.animateLayerGroup('intro', {
            opacity: 1,
            scale: 1,
            index: 1000
        }).drawLayers();
    }, 1000);

    Xpos += 300;

    setTimeout(function() {
        myCanvas.setLayerGroup('content',{
            x: '+=' + Xpos,
            y: '+=' + Ypos
        }).drawLayers();
    }, 1200);

    bIsInOverviewMode = true;

    setTimeout(function() {
        if (bIsTeacherAndStudentsDrawn) {
            if (!bIntroIsYandBShown) {
                myCanvas.drawImage({
                    layer: true,
                    fromCenter: false,
                    groups: ['intro'],
                    source: 'images/BlueYellowIntro.png',
                    x: 60, y: 630,
                    opacity: 1,
                }).drawLayers();
                bIntroIsYandBShown = true;
            }
        }

        if (bIsTeacherAndUnionsDrawn) {
            if (!bIntroIsGandYShown) {
                myCanvas.drawImage({
                    layer: true,
                    fromCenter: false,
                    groups: ['intro'],
                    source: 'images/GreenYellowIntro.png',
                    x: 420, y: 410,
                    opacity: 1,
                }).drawLayers();
                bIntroIsGandYShown = true;
            }
        }

        if (bIsMixAllDrawn) {
            if (!bIntroIsAllMixedShown) {
                myCanvas.drawImage({
                    layer: true,
                    fromCenter: false,
                    groups: ['intro'],
                    source: 'images/MixAllIntro.png',
                    x: 350, y: 510,
                    opacity: 1,
                }).drawLayers();
                bIntroIsAllMixedShown = true;
            }
        }
    }, 1500);
}
