"use client"
import dynamic from "next/dynamic";

import { handleRequest } from "@/lib/apiRequest";
import { LoadingButton } from "@/lib/LoadingButton";
import { BASE_API_URL } from "@/server";
import { CollegeType } from "@/type";
import axios from "axios";
import { Briefcase, Building, FileText, Heart, Send, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import { toast } from "sonner";

const Select = dynamic(() => import("react-select"), { ssr: false });
const ShareStory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [colleges, setColleges] = useState<CollegeType[]>([])
    const [formData, setFormData] = useState({
        vibe: "neutral",
        collegeName: "",
        isAnonymous: false,
        name: "",
        userType: "student",
        title: "",
        story: ""
    })
    const router = useRouter();
    const collegeOptions = colleges.map((c) => ({
        label: c.name,
        value: c.name
    }))
    const vibeOptions = [
        { value: "neutral", label: "Neutral" },
        { value: "positive", label: "Positive" },
        { value: "negative", label: "Negative" },
    ];
    const userTypeOptions = [
        { value: "student", label: "Student" },
        { value: "faculty", label: "Faculty" },
        { value: "alumini", label: "Alumini" },
        { value: "parent", label: "Parent" },
        { value: "other", label: "Other" },
    ];

    useEffect(() => {
        const fetchColleges = async () => {
            const collegeReq = async () =>
                await axios.get(`${BASE_API_URL}/colleges/all`);
            const result = await handleRequest(collegeReq);
            if (result?.data.status === "success") {
                setColleges(result.data.data.colleges);
            }
        };
        fetchColleges();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(formData)
        const payload = {
            vibe: formData.vibe,
            collegeName: formData.collegeName,
            isAnonymous: formData.isAnonymous,
            userType: formData.userType,
            title: formData.title,
            story: formData.story,
            ...(formData.isAnonymous ? {} : { name: formData.name }),
        };
        const shareStoryReq = async () =>
            await axios.post(`${BASE_API_URL}/reviews/create`, payload, {
                withCredentials: true,
            });
        const result = await handleRequest(shareStoryReq, setIsLoading);
        if (result?.data?.status === "success") {
            toast.success("Your Review Submitted successfully!");
            router.push("/reviews");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Your College Experience</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Vibe */}
                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Heart size={16} className="text-blue-500" /> Vibe
                        </label>
                        <Select
                            name="vibe"
                            options={vibeOptions}
                            value={{ value: formData.vibe, label: formData.vibe.charAt(0).toUpperCase() + formData.vibe.slice(1) }}
                            onChange={(selected: any) => setFormData({ ...formData, vibe: selected?.value || "neutral" })}
                            isSearchable={false}
                        />
                    </div>

                    {/* College */}
                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Building size={16} className="text-blue-500" /> College
                        </label>
                        <Select
                            options={collegeOptions}
                            value={collegeOptions.find((opt) => opt.value === formData.collegeName)}
                            onChange={(selected:any) => setFormData({ ...formData, collegeName: selected?.value || "" })}
                            placeholder="Select a college..."
                            isSearchable
                        />
                    </div>

                    {/* Anonymous */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isAnonymous"
                            id="isAnonymous"
                            checked={formData.isAnonymous}
                            onChange={handleChange}
                            className="w-4 h-4 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Post anonymously
                        </label>
                    </div>

                    {/* Name */}
                    {!formData.isAnonymous && (
                        <div className="flex flex-col gap-1.5">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <User size={16} className="text-blue-500" /> Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                    )}

                    {/* User Type */}
                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Briefcase size={16} className="text-blue-500" /> User Type
                        </label>
                        <Select
                            name="userType"
                            options={userTypeOptions}
                            value={{
                                value: formData.userType,
                                label: formData.userType.split(" ").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "),
                            }}
                            onChange={(selected:any) => setFormData({ ...formData, userType: selected?.value || "student" })}
                            isSearchable
                        />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FileText size={16} className="text-blue-500" /> Story Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="One-line summary of your story"
                            required
                            className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Story */}
                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FileText size={16} className="text-blue-500" /> Story
                        </label>
                        <textarea
                            name="story"
                            value={formData.story}
                            onChange={handleChange}
                            placeholder="Describe your experience..."
                            rows={6}
                            required
                            className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <LoadingButton
                        isLoading={isLoading}
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Send size={16} /> Send Story
                    </LoadingButton>

                </form>
            </div>
        </div>
    )
}

export default ShareStory