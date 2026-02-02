import transporter from '../config/email/index.js';

//  const { from, subject, message } = req.body;

//   // Constructing the message with the sender's email included
//   const fullMessage = `Sender's Email: ${from}\nSubject: ${subject}\n\nMessage:\n${message}`;
  
//   console.log("full", fullMessage);

//   const mailOptions = {
//     from: from,
//     to: "your-email@gmail.com",
//     subject: subject,
//     text: fullMessage,
//   };
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
