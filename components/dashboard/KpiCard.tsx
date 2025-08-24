import { FileQuestionIcon } from 'lucide-react';
import React, { ReactElement } from 'react';

export interface KpiCardProps {
    title: string;
    value: number;
    icon: ReactElement;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => {
    return (
        <div className="lg:w-[230px] lg:h-[110px]  flex items-center p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-[80px] h-[86px] bg-blue-light rounded-lg">
                {icon ? React.cloneElement(icon as ReactElement) : <span className="text-lg"><FileQuestionIcon /></span>}
            </div>
            <div className="flex flex-col ml-4 justify-center">
                <p className="text-3xl font-bold text-gray-800">{value || 'N/A'}</p>
                <p className="text-sm text-gray-500">{title || 'N/A'}</p>
            </div>
        </div>
    );
};
