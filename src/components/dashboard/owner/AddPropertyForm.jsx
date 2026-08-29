"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { uploadImage } from "@/actions/uploadImage";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddPropertyForm({ ownerId, ownerName, ownerEmail }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            setLoading(true);

            // =========================
            // Image Validation
            // =========================

            const image = formData.get("image");

            if (!image || image.size === 0) {
                toast.error("Please select an image.");
                return;
            }

            // =========================
            // Upload Image
            // =========================

            const imageUrl = await uploadImage(image);

            if (!imageUrl) {
                toast.error("Image upload failed.");
                return;
            }

            // =========================
            // Property Data
            // =========================

            const propertyData = {
                ownerId,
                ownerName,
                ownerEmail,

                title: formData.get("title")?.trim(),
                location: formData.get("location")?.trim(),
                city: formData.get("city")?.trim(),
                propertyType: formData.get("propertyType"),

                rent: Number(formData.get("rent")),
                bedrooms: Number(formData.get("bedrooms")),
                bathrooms: Number(formData.get("bathrooms")),
                area: Number(formData.get("area")),

                description: formData.get("description")?.trim(),

                image: imageUrl,
                mapUrl: formData.get("mapUrl")?.trim(),
            };

            // =========================
            // Number Validation
            // =========================

            if (propertyData.rent <= 0) {
                toast.error("Rent must be greater than 0.");
                return;
            }

            if (propertyData.area <= 0) {
                toast.error("Area must be greater than 0.");
                return;
            }

            if (propertyData.bedrooms <= 0) {
                toast.error("Bedrooms must be greater than 0.");
                return;
            }

            if (propertyData.bathrooms <= 0) {
                toast.error("Bathrooms must be greater than 0.");
                return;
            }

            // =========================
            // Express API
            // =========================

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(propertyData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.error(result.message || "Failed to add property.");
                return;
            }

            // =========================
            // Success
            // =========================

            toast.success(result.message);

            form.reset();

            router.push("/dashboard/owner/my-properties");
            router.refresh();
        } catch (error) {
            console.error("Add property error:", error);

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl py-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Add New Property</CardTitle>

                    <CardDescription>Publish your rental property for potential tenants.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={loading} className="space-y-5">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title</Label>

                                <Input id="title" name="title" placeholder="Luxury Apartment" required />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>

                                <Input id="location" name="location" placeholder="Mirpur DOHS" required />
                            </div>
                            {/* Google Maps URL */}
                            <div className="space-y-2">
                                <Label htmlFor="mapUrl">Google Maps URL (Optional)</Label>

                                <Input id="mapUrl" name="mapUrl" type="url" placeholder="Paste Google Maps link" />

                                <p className="text-sm text-muted-foreground">
                                    Optional: Paste the Google Maps share link for this property.
                                </p>
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>

                                <Input id="city" name="city" placeholder="Dhaka" required />
                            </div>

                            {/* Property Type */}
                            <div className="space-y-2">
                                <Label htmlFor="propertyType">Property Type</Label>

                                <select
                                    id="propertyType"
                                    name="propertyType"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="">Select Property Type</option>

                                    <option value="Apartment">Apartment</option>

                                    <option value="House">House</option>

                                    <option value="Room">Room</option>

                                    <option value="Villa">Villa</option>
                                </select>
                            </div>

                            {/* Property Info */}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {/* Rent */}
                                <div className="space-y-2">
                                    <Label htmlFor="rent">Monthly Rent (৳)</Label>

                                    <Input id="rent" name="rent" type="number" min={1} placeholder="15000" required />
                                </div>

                                {/* Area */}
                                <div className="space-y-2">
                                    <Label htmlFor="area">Area (sq ft)</Label>

                                    <Input id="area" name="area" type="number" min={1} placeholder="1200" required />
                                </div>

                                {/* Bedrooms */}
                                <div className="space-y-2">
                                    <Label htmlFor="bedrooms">Bedrooms</Label>

                                    <Input
                                        id="bedrooms"
                                        name="bedrooms"
                                        type="number"
                                        min={1}
                                        placeholder="3"
                                        required
                                    />
                                </div>

                                {/* Bathrooms */}
                                <div className="space-y-2">
                                    <Label htmlFor="bathrooms">Bathrooms</Label>

                                    <Input
                                        id="bathrooms"
                                        name="bathrooms"
                                        type="number"
                                        min={1}
                                        placeholder="2"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    maxLength={500}
                                    placeholder="Write a short description about the property..."
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div className="space-y-2">
                                <Label htmlFor="image">Property Image</Label>

                                <Input id="image" name="image" type="file" accept="image/*" required />
                            </div>

                            {/* Submit */}
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Adding Property..." : "Add Property"}
                            </Button>
                        </fieldset>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
