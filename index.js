const express = require('express');
const favicon = require('serve-favicon');
const zod = require('zod');
const bodyParser = require('body-parser'); // Adding body-parser middleware
const app = express();
const PORT = 3000;
const nodemailer = require('nodemailer');

// Import sheets and SHEET_ID from "./sheetclient.js"
const sheets = require("./sheetclient.js");
const { SHEET_ID } = require("./sheetclient.js");

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/Pictures', express.static(process.cwd() + '/Pictures'));

// Adding middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ademolaalameen86@gmail.com",
      pass: "haepypppxbhjdchv",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + "/views/success.html");
})

const contactFormSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email()

});



app.post('/submit', async (req, res) => {
    try {
        const body = contactFormSchema.parse(req.body);
        const values = Object.values(body)

        await sheets.sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:C',
            insertDataOption: "INSERT_ROWS",
            valueInputOption: "RAW",
            requestBody: {
                values: [values]
            }
        });
        await transporter.sendMail({
            to: req.body.email,
            subject: "Topbotcopier Webinar",
            html: `
            
            <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        /* General styling for the email */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }

                        /* Wrapper to center the email content */
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border: 1px solid #dddddd;
                        }

                        /* Header styling */
                        .email-header {
                            background-color: #0073e6;
                            color: #ffffff;
                            padding: 10px;
                            text-align: center;
                        }

                        /* Main content styling */
                        .email-body {
                            padding: 20px;
                            color: #333333;
                        }

                        /* Footer styling */
                        .email-footer {
                            background-color: #f4f4f4;
                            color: #777777;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                        }

                        /* Button styling */
                        .button {
                            background-color: #0073e6;
                            color: #ffffff;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                            display: inline-block;
                            margin-top: 20px;
                        }

                        /* Responsive styling */
                        @media (max-width: 600px) {
                            .email-container {
                                width: 100%;
                                padding: 10px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <!-- Email Header -->
                        <div class="email-header">
                            <h1>Topbotcopier</h1>
                        </div>

                        <!-- Email Body -->
                        <div class="email-body">
                            <h2>Thanks for joining our webinar</h2>
                            <p>Dear ${req.body.firstname},</p>
                            <p>Thank you for signing up for our webinar. We are excited to have you on board.</p>
                            
                            <p>If you have any questions, feel free to reply to this email.</p>
                            <p>Best regards,<br>Topbotcopier Team</p>
                        </div>

                        <!-- Email Footer -->
                        <div class="email-footer">
                            <p>Topbotcopier Inc., 2024</p>
                        </div>
                    </div>
                </body>
                </html>

            
            `
        });
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ error: error.message });
            console.log(error) // Corrected status setting
        } else {
            res.status(400).json({ error }); console.log(error)
        }
        return; // Adding return to exit the function after sending response
    }

    res.sendStatus(200);
});





app.use(favicon(__dirname + '/public/favicon.ico'));

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
