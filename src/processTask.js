import dotenv from "dotenv";
 dotenv.config();
//  console.log("EMAIL_USER:", process.env.NODEMAILER_USER);
// console.log("EMAIL_PASS:", process.env.NODEMAILER_APP_PASSWORD ? "Loaded" : "Missing");
 import { emailQueue } from "./config/redis/index.js";
 import sendMail from "./services/emails.js";


 emailQueue.process(async (job) => {
   const { to, subject, first_name, verificationCode } = 
job.data
;

    
   
   await sendMail({
     to,
     subject,
     html: `
      <h2>Welcome ${first_name}</h2>
     <p>Your verification code is:</p>
        <h1 style="letter-spacing: 3px;">${verificationCode}</h1>
       <p>This code expires in 1 hour</p>
      `
   });

   console.log(`Email sent to ${to}`);
 });