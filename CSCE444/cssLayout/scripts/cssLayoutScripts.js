document.addEventListener('DOMContentLoaded', function () {

    //Set the onclick event for the background button changer.
    document.getElementById("BackgroundButton").addEventListener("click", function()
    {
        ChangeBodyBackground();
    });

    function ChangeBodyBackground()
    {
        var backgroundDiv = document.getElementById("BackgroundDiv");

        if (backgroundDiv.classList == null)
        {
            backgroundDiv.classList.add("BodyBackgroundFill");
        }
        else
        {
            backgroundDiv.classList.toggle("BodyBackgroundFill");
        }
    }

});