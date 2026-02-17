import transporter from '../config/email/index.js';
import redisClient from '../config/redis/index.js';
// import {Worker} from 'bull';

// const connection = new redisClient();

  const sendMail =(async (email, subject, Content) => {
  const emailInfo = await transporter.sendMail({
    from: {
        name:'BuilUp Blogger',
        email:process.env.NODEMAILER_USER
    },
    to: email.trim().toLowerCase(),
    subject: subject,
    text: Content,
    // html: "<b>Hello world?</b>", // HTML version of the message
  });
try{
    await transporter.sendMail(emailInfo)
    console.log(`Email successfully sent to ${email}`)
}catch(error){
    console.log('Error occured while sending email');
};
  console.log("Message sent to:", emailInfo.messageId);
});
export default sendMail;
