const ImageSection = () => {
    return (
        <div className="w-full md:w-3/5 h-64 md:h-screen relative hidden md:block">
            <img
                src="/Logo.svg"
                alt="Logo"
                className="absolute top-8 left-8 h-auto"
            />

            <div className="flex items-center justify-center h-full">
                <img
                    src="/cover.jpg"
                    alt="Imagem de apresentação"
                    className="max-w-full max-h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://placehold.co/800x1200/cccccc/ffffff?text=Image+Not+Found';
                        e.currentTarget.onerror = null;
                    }}
                />
            </div>
        </div>
    );
};

export default ImageSection;
