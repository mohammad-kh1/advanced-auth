import { z } from "zod";

const emailSchema = z.string().trim().min(1).max(255).email();
const passwordSchema = z.string().trim().min(6).max(255);

export const registerSchema = z.object({
    name:z.string().trim().min(1).max(255),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    userAgent: z.string().optional(),
}).refine((val)=> val.password === val.confirmPassword , {
    message: "Password does not match",
    path:["confirmPassword"],
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema

});