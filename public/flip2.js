document.addEventListener('DOMContentLoaded', () => {


  

// Get current date and time
var currentDate = new Date();

// Set time to 00:00:00 for the next day
var nextDay = new Date(currentDate);
nextDay.setDate(currentDate.getDate() + 1);
nextDay.setHours(0, 0, 0, 0);

// Convert next day date to Unix timestamp
var nextDayUnixTimestamp = Math.floor(nextDay.getTime() / 1000);

    // Unix timestamp (in seconds) to count down to
    var twoDaysFromNow = nextDayUnixTimestamp;
  
    // Set up FlipDown
    var flipdown = new FlipDown(twoDaysFromNow, {theme: "light"})
  
      // Start the countdown
      .start()
  
  
    // Show version number
    var ver = document.getElementById('ver');
    ver.innerHTML = flipdown.version;
  });