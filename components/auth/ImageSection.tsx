import Image from 'next/image';

const ImageSection = () => {
    return (
        <div className="w-full md:w-3/5 h-64 md:h-screen relative hidden md:block">
            <Image
                src="/Logo.svg"
                alt="Logo"
                width={150} 
                height={50}
                className="absolute top-8 left-8"
            />
            <div className="flex items-center justify-center h-full">
                <Image
                    src="/cover.jpg"
                    alt="Imagem de apresentação"
                    fill
                    className="object-cover"
                    onError={(e: any) => {
                        e.target.src =
                            'https://placehold.co/800x1200/cccccc/ffffff?text=Image+Not+Found';
                    }}
                />
            </div>
        </div>
    );
};

export default ImageSection;
