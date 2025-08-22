'use client';
import ImageSection from "@/components/login/ImageSection";
import LoginForm from "@/components/login/LoginForm";   

export default function LoginPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans">
            <ImageSection />
            <LoginForm />
        </div>
    );
}
