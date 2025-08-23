import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto p-4 sm:p-8">
            {children}
        </div>
    );
};

export default Layout;
