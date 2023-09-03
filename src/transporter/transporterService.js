const {transporter} = require('./transporter');

class TransporterService {
    async sendMessage(data) {
        try {
            const info = await transporter.sendMail({
                email: data.email,
                from: data.name,
                to: process.env.SMPT_LOGIN,
                subject: "My portfolio",
                text: data.message,
                html: `${data.message} <br/><br/><br/> 
                <em>Sender name: ${data.name}</em><br/>
                <b>Sender address: ${data.email}</b>`,
            })
            return info.messageId;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new TransporterService();