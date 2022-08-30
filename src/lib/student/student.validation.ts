import * as Joi from 'joi'

const studentSchema = Joi.object().keys({
  studentName: Joi.string().min(3).max(30),
  schoolId: Joi.string().min(36).max(36),
  gradeYear: Joi.string().valid(7, 8, 9, 10, 11, 12),
})
export const postStudentBodySchema = studentSchema.preferences({ presence: 'required' })
export const patchStudentBodySchema = studentSchema.min(1).preferences({ presence: 'optional' })
