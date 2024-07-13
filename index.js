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
app.use('/pictures', express.static(process.cwd() + '/pictures'));

// Adding middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
});

let transporter = nodemailer.createTransport({
    host: 'topbotcopier.org', // Replace with your SMTP hostname
    port: 465, // Replace with your SMTP port (usually 465 for SSL)
    secure: true, // Use SSL
    auth: {
      user: 'info@topbotcopier.org', // Your email address
      pass: 'adedollarzS1???' // Your email password
    }
  });


app.get('/webinar', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + "/views/success.html");
})

app.get('/privacy', (req,res)=>{
    res.sendFile(__dirname+ "/views/privacy.html" )
})

const contactFormSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    phone: zod.string(),
    afford2: zod.string(),
    broker: zod.string(),
    brkname: zod.string(),
    afford: zod.string(),
    needsCall : zod.string(),
    phone2 :zod.string(),
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
            from: '"Topbotcopier"<info@topbotcopier.org>',
            to: req.body.email,
            subject: " Thanks for Registering! A Special Gift Inside – READ! 🎁",
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
                            max-width: 100%;
                            width:600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border: 1px solid #dddddd;
                        }

                        /* Header styling */
                        .email-header {
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
                            <img src="https://topbotcopier.org/pictures/TopBotCopier-Logo-web.png" style='width:20%;'>
                        </div>

                        <!-- Email Body -->
                        <div class="email-body">
                            <img src="https://topbotcopier.org/pictures/IMG-20240706-WA0014.jpg" style='width:90%; margin:auto;'>
                            <p>Hey ${req.body.name},</p>

                            <p>Greeting Copiers!! Dchessking and the entire team from Topbotcopier here. Hahaha, welcome aboard! You made the right choice signing up for our test plan, and we’re excited to have you with us!</p>

                            <h2>Why You’re Here:</h2>
                            <p>I know you might be in doubt, but trust me, just like you, I always approach new things with caution. It’s smart to dip your toes in the water before diving in fully. So, let’s take this step together and explore what Topbotcopier has to offer!</p>

                            <h2>What’s Topbotcopier All About?</h2>
                            <p>At Topbotcopier, we built this platform to showcase bots that have been thoroughly researched and have long-term performance. We fund our own accounts, and users like you can copy our trades and review the available data.</p>

                            <h2>Why This Matters:</h2>
                            <p>You might have tried trading yourself, maybe even lost money countless times through signals, fund managers, or random bots. We get it – it’s tough out there! We’re not claiming to be a safe haven, but we believe in the power of data. We present all the information you need, and you can choose to copy the bots or not. It’s that simple!</p>

                            <h2>Important Tips:</h2>
                            <ul>
                                <li><strong>Always Apply Good Risk Management:</strong> No matter how good a bot is, managing your risk is crucial.</li>
                                <li><strong>Analyze the Data:</strong> We provide transparent data for you to make informed decisions.</li>
                                <li><strong>Start Small, Grow Big:</strong> With our 30-day test plan, you can start with just $200 (or more) and see the results for yourself.</li>
                            </ul>

                            <h2>How to Get Started:</h2>
                            <ol>
                                <li><strong>Fund Your Account:</strong> Deposit a minimum of $200 in your trading account through our registered broker and convert your money to cents. This is your trading capital, not a fee!</li>
                                <li><strong>Choose Your Bots:</strong> Explore our platform and select the bots you want to copy. Each bot comes with verified track records.</li>
                                <li><strong>Trade Smart:</strong> Let our algorithms handle the trades while you watch the profits grow.</li>
                                <li><strong>Profit Sharing:</strong> At the end of the month, pay 50% of the profit – only if there’s a profit!</li>
                            </ol>

                            <p><strong>Remember: Trading Involves Risk!</strong></p>
                            <p>Trading can be highly rewarding, but it also involves risk. Always trade with money you can afford to lose and practice good risk management.</p>

                            <h2>Ready to Transform Your Trading?</h2>
                            <p>Don’t let doubts hold you back. Join Topbotcopier and start trading smart with low capital. Our platform is designed for traders of all levels, making it easy to get started and see results.</p>

                            <h2>Get Started Now!</h2>
                            <p>Take the risk with low capital and experience the future of trading. Start your 30-day test plan today and discover the potential of algorithmic trading with Topbotcopier!</p>

                            <p><a href="https://www.topbotcopier.com/" target="_blank">🔗 Sign Up Now!</a></p>

                            <p>Looking forward to seeing you on the platform!</p>

                            <p>Cheers,</p>
                            <p>Dchessking and the Topbotcopier Team</p>

                            <p><strong>P.S. Don’t miss out on the future of trading! 🚀 Join our platform now and learn how to trade like the pros!</strong></p>
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
