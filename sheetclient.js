const { google } = require("googleapis"); // Import googleapis module

const { client_email, private_key } = require("./cre.json");

// Exporting the SHEET_ID
module.exports.SHEET_ID = "1WJE07Tv8DBnw4KTsMfdxpwR_9PvD4Ssp63k5-MiguPM";

// Create JWT client
const client = new google.auth.JWT(client_email, null, private_key, ['https://www.googleapis.com/auth/spreadsheets']); // Corrected URL

// Exporting the sheets object
module.exports.sheets = google.sheets({ version: 'v4', auth: client });
