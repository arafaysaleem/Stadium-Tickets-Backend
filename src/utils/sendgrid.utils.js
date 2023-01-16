const sgMail = require('@sendgrid/mail');
const { Config } = require('../configs/config');
const { OTPGenerationException } = require('../utils/exceptions/auth.exception');
const { InternalServerException } = require('../utils/exceptions/api.exception');

sgMail.setApiKey(Config.SENDGRID_API_KEY);

exports.sendOTPEmail = async(student, OTP) => {
    const msg = {
        to: student.email, // Change to your recipient
        from: Config.SENDGRID_SENDER, // Change to your verified sender
        subject: '3D-Secure OTP Notification',
        templateId: 'd-590b84200cdc4fdba9ad36a6cf22670e',
        dynamic_template_data: {full_name: `${student.first_name} ${student.last_name}`, OTP}
    };

    try {
        await sgMail.send(msg);
    } catch (err) {
        console.error(err);
        if (err.response) {
            console.error(err.response.body);
            throw new OTPGenerationException(err.message);
        }
    }
};

exports.sendBookingSummaryEmail = async(
    {order_date, order_amount, event, seats, parking, person},
    id
) => {
    var currency = Config.CURRENCY;
    var parkingSummary = parking || {price: 'N/A', qty: 0, total: 0};
    const msg = {
        to: person.email, // Change to your recipient
        from: Config.SENDGRID_SENDER, // Change to your verified sender
        subject: 'Your Booked Tickets Summary',
        templateId: 'd-241cc9653214403dbb32fac0b3029eb9',
        dynamic_template_data: {
            person_name: person.name,
            order_date: order_date, order_id: id, order_amount: `${currency}${order_amount}`,
            seat_price: seats.price, seat_qty: seats.qty, seat_total: `${currency}${seats.total}`,
            parking_price: parkingSummary.price, parking_qty: parkingSummary.qty, parking_total: `${currency}${parkingSummary.total}`,
            event_name: event.name, event_date: event.date, event_time: event.time
        }
    };

    try {
        await sgMail.send(msg);
    } catch (err) {
        console.error(err);
        if (err.response) {
            console.error(err.response.body);
            throw new InternalServerException(err.message);
        }
    }
};