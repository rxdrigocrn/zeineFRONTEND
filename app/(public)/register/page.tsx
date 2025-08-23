'use client';
import ImageSection from "@/components/auth/ImageSection";
import RegisterForm from "@/components/auth/RegisterForm";

export default function LoginPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans">
            <ImageSection />
            <RegisterForm />
        </div>
    );
}
