exports.validate = async (req, res, next) => {
    const body = req.body;
    if (!body.firstName && !body.lastName && !body.emailid && !body.contact && !body.userName && !body.password) {
        res.json({ "error": "*Please enter all the fields." })
    }
    else if (body.firstName.length < 3) {
        res.json({ "First name error": "*Less than 3 characters not allowed." })
    }
    else if (body.lastName.length < 3) {
        res.json({ "Last name error": "*Less than 3 characters not allowed." })
    }
    else if (!body.emailid.match(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,5})$/)) {
        res.json({ "Email error": "*Please enter valid email-ID." })
    }
    else if (!body.contact.match(/^[0-9]{10}$/)) {
        res.json({ "Contact error": "*Please enter valid mobile no." })
    }
    else if (!body.bloodGroup.match(/^(A|B|AB|O)[-+]$/)) {
        res.json({ "Blood group error": "*Please enter valid Blood Group." })
    }
    else if (!body.userName.match(/^[a-zA-Z]{3,15}$/)) {
        res.json({ "Username error": "*Please enter alphabet characters only." })
    }
    else if (!body.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        res.json({ "Password error": "*Please enter secure and strong password." })
    }
    else {
        next();
    }
};




// const joi = require('@hapi/joi');
// const reg_valid = (data) => {

//     const schema = {
//         firstName: joi.string()
//             .min(3)
//             .required(),
//         lastName: joi.string()
//             .min(3)
//             .required(),
//         emailid: joi.string()
//             .min(6)
//             .required()
//             .email(),
//         contact: joi.string()
//             .min(10)
//             .max(10)
//             .required()
//             .pattern(new RegExp('^[0-9]+$')),
//         bloodGroup: joi.string()
//             .min(2)
//             .max(3)
//             .required()
//             .pattern(new RegExp('^(A|B|AB|O)[+-]+$')),
//         skill: joi.string()
//             .min(3)
//             .required(),
//         userName: joi.string()
//             .alphanum()
//             .min(3)
//             .max(10)
//             .required(),
//         password: joi.string()
//             .min(6)
//             .required(),

//     };
//     return joi.validate(data,schema);
// };
// module.exports.reg_valid = reg_valid;