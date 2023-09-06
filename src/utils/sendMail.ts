import nodemailer from 'nodemailer'

interface MailOptions {
  from: string
  to: string
  subject: string
  text: string
}

const sendMail = async ({ from, to, subject, text }: MailOptions) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    }
    //asign createTransport method in nodemailer to a variable
    //service: to determine which email platform to use
    //auth contains the senders email and password which are all saved in the .env
    const Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    })

    //return the Transporter variable which has the sendMail method to send the mail
    //which is within the mailOptions
    return await Transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

export default sendMail
