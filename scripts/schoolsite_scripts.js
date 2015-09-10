/**
 * Created by Handro on 9/3/2015.
 */

$( document ).ready(function() {
    //Initialization Globals
    var MenuItems = {
        "Courses":  [true, '#CoursesContent'],
        "About Me": [true, '#AboutMe'],
        "Home":     [false, '#CenterContent']
    };

    var bIsMenuShowing = false;

    //Initialization Functions
    eventHandlerInit();

    // DOM Manipulation
    function dom_showMenu()
    {
        bIsMenuShowing = true;
        $('#fixedMenu').fadeIn(500);
    }

    function dom_hideMenu()
    {
        bIsMenuShowing = false;
        $('#fixedMenu').fadeOut(500);
    }

    function dom_changeMenuItem(menuItem)
    {
        var initialText = menuItem.text();
        for (var key in MenuItems)
        {
            if (MenuItems[key][0] == false)     //We ensure that the false key gets enabled to true and becomes the new menu item.
            {
                MenuItems[key][0] = true;
                menuItem.empty();
                menuItem.text(key);
            }
            // The order of operations must be in this order so we never have more than two false keyed items in the menu items.
            if (initialText == key)         // Make the old key false and remove it from the menu items.
            {
                MenuItems[key][0] = false;
            }
        }
    }

    function dom_changeCenterContent(menuItem)
    {
        var initialText = menuItem.text();
        for (var key in MenuItems)              // Look for old content and hide it.
        {
            if (MenuItems[key][0] == false)
            {
                var oldContent = $(MenuItems[key][1]);
                oldContent.fadeOut(500, function ()
                {
                    for (var key in MenuItems)              // Look for selected content and show it. This is within the fadeOut so the fade in will happen after the fade out.
                    {
                        if (initialText == key) {
                            var newContent = $(MenuItems[key][1]);
                            newContent.fadeIn(500);
                        }
                    }
                });
            }
        }
    }
    
    // Event Handlers
    function eventHandlerInit()
    {
        event_bindOnFixedMenuClickEvents();
    }

    function event_onMenuItem1Clicked()
    {
        var menuItem = $('#MenuItem1');
        dom_changeCenterContent(menuItem);
        dom_changeMenuItem(menuItem);
    }

    function event_onMenuItem2Clicked()
    {
        var menuItem = $('#MenuItem2');
        dom_changeCenterContent(menuItem);
        dom_changeMenuItem(menuItem);
    }

    //Bindings
    function event_bindOnFixedMenuClickEvents()
    {
        $('#fixedMenuButton').mousedown(  function()
            {
                if (!bIsMenuShowing) {
                    dom_showMenu();
                }
                else
                {
                    dom_hideMenu();
                }
            }
        );

        $('#fixedMenu').mouseleave( function()
            {
                dom_hideMenu();
            }
        );

        $("#MenuItem1").mouseup( function ()
            {
                event_onMenuItem1Clicked();
            }
        );

        $("#MenuItem2").mouseup( function ()
            {
                event_onMenuItem2Clicked();
            }
        );
    }

});