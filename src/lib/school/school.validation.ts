import * as Joi from 'joi'

const schoolSchema = Joi.object().keys({
  schoolName: Joi.string().min(3).max(30),
  region: Joi.string().min(3).max(30),
  schoolType: Joi.string().valid('private', 'public'),
})
export const postSchoolBodySchema = schoolSchema.preferences({ presence: 'required' })
export const patchSchoolBodySchema = schoolSchema.min(1).preferences({ presence: 'optional' })
