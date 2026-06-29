"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/actions/uploadImage";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const userData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            image: formData.get("image"),
            role: formData.get("role"),
            plan: "basic",
        };
        if (userData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        if (!/[A-Z]/.test(userData.password)) {
            toast.error("Password must contain one uppercase letter.");
            return;
        }

        if (!/[a-z]/.test(userData.password)) {
            toast.error("Password must contain one lowercase letter.");
            return;
        }

        console.log("REGISTER REQUEST", userData);

        try {
            setLoading(true);

            const imageUrl = await uploadImage(userData.image);
            if (!imageUrl) {
                toast.error("Image upload failed.");
                return;
            }

            const result = await authClient.signUp.email({
                ...userData,
                image: imageUrl,
            });

            console.log("REGISTER RESPONSE", result);

            if (!result.data) {
                toast.error("Registration failed.");
                return;
            }

            console.log("Registration Successful");
            await authClient.signOut();

            toast.success("Account created successfully. Please login.");

            e.target.reset();
            router.refresh();
            router.push("/login");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleLogin() {
        try {
            console.log("GOOGLE LOGIN REQUEST");

            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            console.log("GOOGLE LOGIN RESPONSE", result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-10">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-center text-3xl font-bold">Create Account</CardTitle>

                    <CardDescription className="text-center">
                        Welcome to Rentina. Create your account to continue.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name */}

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>

                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input id="name" name="name" placeholder="John Doe" className="pl-10" required />
                            </div>
                        </div>

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

                        {/* Photo */}

                        <div className="space-y-2">
                            <Label htmlFor="image">Profile Photo</Label>

                            <Input id="image" name="image" type="file" accept="image/*" required />
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

                        {/* Role */}

                        <div className="space-y-2">
                            <Label>Select Role</Label>

                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="role" value="tenant" defaultChecked />
                                    Tenant
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="role" value="owner" />
                                    Owner
                                </label>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Creating Account..." : "Create Account"}
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
                            className="w-full flex items-center gap-2"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle />
                            Sign up with Google
                        </Button>

                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
