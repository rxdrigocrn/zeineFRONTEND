const ImageSection = () => {
    return (
        <div className="w-full md:w-3/5 h-64 md:h-screen hidden md:block p-2">
            <img className="self-start" src="/Logo.svg" alt="logo" />
            <img
                src="/cover.jpg"
                alt="Imagem de apresentação"
                className="w-full h-1/2 object-cover"
                onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/800x1200/cccccc/ffffff?text=Image+Not+Found';
                    e.currentTarget.onerror = null;
                }}
            />
        </div>
    );
};


export default ImageSection;
