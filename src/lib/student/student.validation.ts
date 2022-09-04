import * as Joi from 'joi'

const studentSchema = Joi.object().keys({
  studentName: Joi.string().min(3).max(30),
  schoolId: Joi.string().length(36),
  gradeYear: Joi.number().integer().greater(0).less(13),
})
export const postStudentBodySchema = studentSchema.preferences({ presence: 'required' })
export const patchStudentBodySchema = studentSchema.min(1).preferences({ presence: 'optional' })
