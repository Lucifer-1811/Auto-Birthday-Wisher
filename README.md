Birthday Wishes Automator 🎂🎉
A web application that automatically sends birthday wishes to your friends via email and SMS.

Features ✨
Friend Management:

Add friends with their birthdays and contact info

Store custom birthday messages with {{name}} placeholder

View and manage your friends list

Automated Notifications:

Daily check for birthdays at your preferred time

Send personalized messages via:

📧 Email (using SendGrid)

📱 SMS (using Twilio)

Browser notifications

Configuration:

Set your preferred notification time

Toggle email/SMS notifications

Configure API credentials securely

Setup Instructions 🛠️
Prerequisites
SendGrid Account (for email):

Sign up at SendGrid

Create an API key with "Mail Send" permissions

Verify your sender email address

Twilio Account (for SMS):

Sign up at Twilio

Get your Account SID and Auth Token

Purchase a phone number

Installation
Simply open the HTML file in any modern browser

No server required - runs completely client-side

Configuration
Fill in your API credentials:

SendGrid API Key

Twilio Account SID

Twilio Auth Token

Twilio Phone Number (format: +1234567890)

Verified Sender Email

Configure notification settings:

Choose notification time (default: 9:00 AM)

Enable/disable email notifications

Enable/disable SMS notifications

Click "Save API Configuration"

How to Use 🚀
Add Friends:

Fill in friend details (name, birthday)

Add at least one contact method (email or phone)

Customize the birthday message (use {{name}} for personalization)

Check Birthdays:

Manual check with "Check for Birthdays Today" button

Automatic daily check at your configured time

View Notifications:

See real-time status of sent messages

Browser notifications for birthdays

Technical Implementation 💻
Technologies Used
Frontend:

HTML5, CSS3 (with Tailwind CSS)

JavaScript (ES6+)

Web Notifications API

APIs:

SendGrid Email API

Twilio SMS API

Data Storage
Uses localStorage to persist:

Friends list

Application settings

API credentials (Note: For production, use more secure storage)

Security Notes 🔒
API Credentials:

Currently stored in browser's localStorage

In production, consider:

Using a backend service

Implementing proper authentication

Using environment variables

CORS Limitations:

Direct API calls from browser may face CORS issues

Recommended solutions:

Backend proxy server

Serverless functions (AWS Lambda, Cloudflare Workers)

Limitations ⚠️
Requires the browser to be open at the scheduled time

SMS costs apply when using Twilio

SendGrid has daily email limits on free tier

Future Enhancements 🚧
Add calendar integration

Implement recurring notifications before birthday

Add support for multiple message templates

Cloud sync for friends list

Backup/restore functionality
