import sgMail from '@sendgrid/mail';


class Email {

    static async send(data) {
        const response = {
            st: 200, 
            check:true
        };
        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)

        const msg = {
            to: process.env.Email, // Change to your recipient
            from: process.env.Email, // Change to your verified sender
            subject: `New message from Keqing-site 😋`,
            text: `Message is: ${data.message}`,
            html: `<h4>Message from: ${data.email}</h4> \n <p>Message is: ${data.message}</p>`,
        }

        sgMail
            .send(msg)
            .catch((error) => {
                console.warn("Error in send message: ", error.message);
                response = {
                    st: 500, 
                    check:false
                }
            })

        return response
    }
}

export default Email;