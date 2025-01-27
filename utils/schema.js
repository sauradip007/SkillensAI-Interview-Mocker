import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterviewSchema = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDescription:text('jobDescription').notNull(),
    jobExperience:text('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:timestamp('createdAt').notNull().defaultNow(),
    mockId:varchar('mockId').notNull(),
})

export const UserAnswerSchema = pgTable('userAnswer', {
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt')


})