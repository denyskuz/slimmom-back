const Joi = require("joi");

const noteParamsSchema = Joi.object({
    weight: Joi.number().min(10).max(500)
        .required()
        .example("80"),
    kCal: Joi.number().min(10).max(5000)
        .required()
        .example("250"),
    date: Joi.date().format('YYYY-MM-DD').greater('now'),
})

module.exports = {
    noteParamsSchema
}
