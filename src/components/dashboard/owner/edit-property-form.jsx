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
import Image from "next/image";

export default function EditPropertyForm({ property, ownerId }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            setLoading(true);

            const image = formData.get("image");

            let imageUrl = property.image;

            // =========================
            // Upload New Image
            // =========================

            if (image && image.size > 0) {
                imageUrl = await uploadImage(image);

                if (!imageUrl) {
                    toast.error("Image upload failed.");
                    return;
                }
            }

            // =========================
            // Property Data
            // =========================

            const propertyData = {
                ownerId,

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

                status: formData.get("status"),
            };

            // =========================
            // Validation
            // =========================

            if (!propertyData.title) {
                toast.error("Title is required.");
                return;
            }

            if (!propertyData.location) {
                toast.error("Location is required.");
                return;
            }

            if (!propertyData.city) {
                toast.error("City is required.");
                return;
            }

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

            if (!propertyData.description) {
                toast.error("Description is required.");
                return;
            }

            // =========================
            // Express PUT API
            // =========================

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${property._id}`, {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(propertyData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.error(result.message || "Failed to update property.");

                return;
            }

            // =========================
            // Success
            // =========================

            toast.success(result.message);

            router.push(`/dashboard/owner/my-properties/${property._id}`);

            router.refresh();
        } catch (error) {
            console.error("Update property error:", error);

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl py-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Update Property</CardTitle>

                    <CardDescription>Update your rental property information.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={loading} className="space-y-5">
                            {/* Title */}

                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title</Label>

                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={property.title}
                                    placeholder="Luxury Apartment"
                                    required
                                />
                            </div>

                            {/* Location */}

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>

                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={property.location}
                                    placeholder="Mirpur DOHS"
                                    required
                                />
                            </div>

                            {/* City */}

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>

                                <Input
                                    id="city"
                                    name="city"
                                    defaultValue={property.city}
                                    placeholder="Dhaka"
                                    required
                                />
                            </div>
                            {/* Property Type */}

                            <div className="space-y-2">
                                <Label htmlFor="propertyType">Property Type</Label>

                                <select
                                    id="propertyType"
                                    name="propertyType"
                                    defaultValue={property.propertyType || ""}
                                    required
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
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

                                    <Input
                                        id="rent"
                                        name="rent"
                                        type="number"
                                        min={1}
                                        defaultValue={property.rent}
                                        required
                                    />
                                </div>

                                {/* Area */}

                                <div className="space-y-2">
                                    <Label htmlFor="area">Area (sq ft)</Label>

                                    <Input
                                        id="area"
                                        name="area"
                                        type="number"
                                        min={1}
                                        defaultValue={property.area}
                                        required
                                    />
                                </div>

                                {/* Bedrooms */}

                                <div className="space-y-2">
                                    <Label htmlFor="bedrooms">Bedrooms</Label>

                                    <Input
                                        id="bedrooms"
                                        name="bedrooms"
                                        type="number"
                                        min={1}
                                        defaultValue={property.bedrooms}
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
                                        defaultValue={property.bathrooms}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Status */}

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>

                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={property.status || "available"}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                >
                                    <option value="available">Available</option>

                                    <option value="unavailable">Unavailable</option>

                                    <option value="rented">Rented</option>
                                </select>
                            </div>

                            {/* Description */}

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    maxLength={500}
                                    defaultValue={property.description}
                                    placeholder="Write a short description..."
                                    required
                                />
                            </div>

                            {/* Current Image */}

                            <div className="space-y-2">
                                <Label>Current Image</Label>
                            </div>

                            {/* New Image */}

                            <div className="space-y-2">
                                <Label htmlFor="image">Change Image</Label>

                                <Input id="image" name="image" type="file" accept="image/*" />

                                <p className="text-sm text-gray-500">Leave empty to keep the current image.</p>
                            </div>

                            {/* Submit */}

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Updating Property..." : "Update Property"}
                            </Button>
                        </fieldset>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
