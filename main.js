function init(){
    var oBackground = document.getElementById("imgBackground");
    oBackground.src = "url(images/background.png)";

  DisplayTime();
	setInterval(DisplayTime,1000);
  }

  function DisplayTime()
{
    // Display the local time.
    document.getElementById("gadgetContent").innerText = RetrieveTime();
}

function RetrieveTime(){
  // Retrieve  Time
  var sTimeInfo = System.Time.getLocalTime(System.Time.currentTimeZone);
  var dDateInfo = new Date(Date.parse(sTimeInfo));
  var tHours = dDateInfo.getHours();
  var tMinutes = dDateInfo.getMinutes();
  tMinutes = ((tMinutes < 10) ? ":0" : ":") + tMinutes
  var tSeconds = dDateInfo.getSeconds();
  tSeconds = ((tSeconds < 10) ? ":0" : ":") + tSeconds;
  return (tHours + tMinutes + tSeconds);

}



//  settings
// *************************************************************************
//  * Description:
//  * Script that controls the settings functionality for the
//  * "Settings" Sidebar gadget sample.
//  ************************************************************************/

// Member variables.
var defaultText = "Default Text";
var userEntry = "user Entry";

// Enable the gadget settings functionality.
System.Gadget.settingsUI = "Settings.html";
// Delegate for when the Settings dialog is closed.
System.Gadget.onSettingsClosed = SettingsClosed;
// Delegate for when the Settings dialog is instantiated.
System.Gadget.onShowSettings = SettingsShow;

txtGadget = document.getElementById('txtGadget');

// --------------------------------------------------------------------
// Initialize the gadget.
// --------------------------------------------------------------------
function Init()
{
    // Retrieve an existing user entry, if any.
    userEntry =  System.Gadget.Settings.readString("settingsUserEntry");

    // Initialize the gadget content.
    SetContentText('userEntry');
}

// --------------------------------------------------------------------
// Set the text of the gadget based on the user input;
// execute this function at startup and after settings changes.
// txtGadget = control for displaying user input.
// --------------------------------------------------------------------
function SetContentText(strFeedback)
{
    if (strFeedback)
    {
	    txtGadget.innerHTML = strFeedback;
	}
	else
	{
	    txtGadget.innerHTML = defaultText;
	}
}

// --------------------------------------------------------------------
// Handle the Settings dialog closed event.
// event = System.Gadget.Settings.ClosingEvent argument.
// --------------------------------------------------------------------
function SettingsClosed(event)
{
    // User hit OK on the settings page.
    if (event.closeAction == event.Action.commit)
    {
        userEntry =
            System.Gadget.Settings.readString("settingsUserEntry");
        SetContentText(userEntry);
    }
    // User hit Cancel on the settings page.
    else if (event.closeAction == event.Action.cancel)
    {
        SetContentText("Cancelled");
    }
}

// --------------------------------------------------------------------
// Handle the Settings dialog show event.
// --------------------------------------------------------------------
function SettingsShow()
{
    SetContentText("Settings opening.");
}




///////////////////////////////

// Delegate for the settings closing event.
System.Gadget.onSettingsClosing = SettingsClosing;
txtUserEntry = document.getElementById('txtUserEntry');

// --------------------------------------------------------------------
// Initialize the settings.
// --------------------------------------------------------------------
function LoadSettings()
{
    var currentSetting =
        System.Gadget.Settings.readString("settingsUserEntry");

    if (String(currentSetting) != "")
    {
        txtUserEntry.innerText = currentSetting;
    }
    txtUserEntry.select();
}

// --------------------------------------------------------------------
// Handle the Settings dialog closing event.
// Parameters:
// event - System.Gadget.Settings.ClosingEvent argument.
// --------------------------------------------------------------------
function SettingsClosing(event)
{
    // User hit OK on the settings page.
    if (event.closeAction == event.Action.commit)
    {
        if (txtUserEntry.value != "")
        {
            System.Gadget.Settings.writeString(
                "settingsUserEntry", txtUserEntry.value);
            // Allow the Settings dialog to close.
            event.cancel = false;
        }
        // No user entry and 'Ok' invoked, cancel the Settings closing event.
        else
        {
            if (event.cancellable == false)
            {
                event.cancel = true;
            }
        }
    }
}
