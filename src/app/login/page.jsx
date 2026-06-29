"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log("========== LOGIN REQUEST ==========");
        console.log(loginData);

        try {
            setLoading(true);
            const result = await authClient.signIn.email(loginData);

            console.log("========== LOGIN RESPONSE ==========");
            console.log(result);

            if (result.error) {
                toast.error(result.error.message);
                return;
            }
            if (!result.data) {
                toast.error("Login failed.");
                return;
            }
            toast.success("Login successful!");
            router.refresh();
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    async function handleGoogleLogin() {
        try {
            setLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error(error);
            toast.error("Google login failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-10">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-center text-3xl font-bold">Welcome Back</CardTitle>

                    <CardDescription className="text-center">Login to your Rentina account.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>

                            <div className="relative">
                                <MdAlternateEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>

                            <div className="relative">
                                <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"></span>
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">OR</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            disabled={loading}
                            className="w-full flex items-center gap-2"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle />
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold hover:underline">
                                Register
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
