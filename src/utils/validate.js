import {z} from 'zod';

export const taskSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(100),
    priority: z.number().min(1).max(3),
    createdAt: z.string(),
    due_date: z.string().optional(),
    completed: z.boolean().default(false),
})