"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormFeild from "@/components/FormFeild"
import {useRouter} from "next/navigation"; // Assuming you intentionally spelled it this way

const authFormSchema = (type: FormType) =>
    z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const isSignIn = type === "sign-in"

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                toast.success("Account Created successfully")
                router.push('/sign-in')
            } else {
                toast.success("SignIn successfully")
                router.push('/')
            }
        } catch (err) {
            console.log(err)
            toast.error(`There was an error with your submission`)
        }
    }

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100">JobConnect</h2>
                </div>
                <h3>Practice Job Interview with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="W-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormFeild
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}

                        <FormFeild
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="your@email.com"
                        />

                        <FormFeild
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="********"
                            type="password"
                        />

                        <Button className="btn" type="submit">
                            {isSignIn ? "SignIn" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "Don't have an account?" : "Already have an account!!"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm
