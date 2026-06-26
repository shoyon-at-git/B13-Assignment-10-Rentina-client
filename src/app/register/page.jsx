"use client";

import Link from "next/link";

import { FaGoogle, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/actions/uploadImage";

export default function RegisterPage() {
    const handleRegister = async (e) => {
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

        // console.log(userData);
        try {
            const imageUrl = await uploadImage(userData.image);

            userData.image = imageUrl;
            console.log(userData);
        } catch (error) {
            console.error(error);
        }
        console.log(userData);
        
    };

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

                            <div className="flex justify-center">
                                <div className="w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center text-xs text-muted-foreground">
                                    Preview
                                </div>
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

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"></span>
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">OR</span>
                            </div>
                        </div>

                        <Button type="button" variant="outline" className="w-full">
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
