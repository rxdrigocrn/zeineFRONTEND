import { useState } from 'react';

const ImageSection = () => {
    const [coverSrc, setCoverSrc] = useState('/cover.jpg');
    const logo = '/logo.svg';

    return (
        <div className="w-full md:w-3/5 h-64 md:h-screen relative hidden md:block">
            <img
                src={logo}
                alt="Logo"
                width={150}
                height={50}
                className="absolute top-8 left-8"
            />
            <div className="flex items-center justify-center h-full">
                <img
                    src={coverSrc}
                    alt="Imagem de apresentação"
                    className="object-cover"
                    onError={() => setCoverSrc('https://placehold.co/800x1200/cccccc/ffffff?text=Image+Not+Found')}
                />
            </div>
        </div>
    );
};

export default ImageSection;

