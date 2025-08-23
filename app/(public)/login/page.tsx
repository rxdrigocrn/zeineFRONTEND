'use client';
import ImageSection from "@/components/auth/ImageSection";
import LoginForm from "@/components/auth/LoginForm";   

export default function LoginPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans">
            <ImageSection />
            <LoginForm />
        </div>
    );
}
