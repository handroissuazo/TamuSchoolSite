document.addEventListener('DOMContentLoaded', function () {

    //Set the onclick event for the background button changer.
    document.getElementById("BackgroundButton").addEventListener("click", function()
    {
        ChangeBodyBackground();
    });

    var body = document.getElementsByTagName("body");
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        body[0].classList.add("MAC");
    }

    function ChangeBodyBackground()
    {
        var backgroundDiv = document.getElementById("BackgroundDiv");
        var MineDiv = document.getElementById("Mine");
        var OriginalDiv = document.getElementById("Original");

        if (backgroundDiv.classList == null)
        {
            backgroundDiv.classList.add("BodyBackgroundFill");
        }
        else
        {
            backgroundDiv.classList.toggle("BodyBackgroundFill");
        }

        if (MineDiv.classList == null)
        {
            MineDiv.classList.add("ShowWord");
        }
        else
        {
            MineDiv.classList.toggle("ShowWord");
        }

        if (OriginalDiv.classList == null)
        {
            OriginalDiv.classList.add("ShowWord");
        }
        else
        {
            OriginalDiv.classList.toggle("ShowWord");
        }
    }

});