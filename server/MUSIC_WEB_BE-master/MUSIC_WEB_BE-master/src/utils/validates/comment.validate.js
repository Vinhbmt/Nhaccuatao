const joi = require('joi');

const commentValidate = (data) => {
    const Schema = joi.object({
        content: joi.string().required().messages({"any.required": "content không thể thiếu"})
    })
    return Schema.validate(data);
}

module.exports = { commentValidate };