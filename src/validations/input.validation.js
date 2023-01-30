const yup = require('yup');

exports.inputValidation = yup.object({
    name: yup.string().required(),
    value: yup.number().required().strict(),
    date: yup.string().required(),
    month: yup.string().required(),
    userId: yup.number().required().strict(),
})