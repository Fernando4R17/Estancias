const Loading = () => {
    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center h-screen">
            <div className="w-[20vh] h-[20vh] animate-spin mb-5">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1V5" stroke="#DF1463" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M19.4246 18.9246L16.5961 16.0962" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M22.5 11.5L18.5 11.5" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M12 18V22" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M7.40381 6.90381L4.57538 4.07538" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M5.5 11.5L1.5 11.5" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M7.40381 16.0962L4.57538 18.9246" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
            </div>
            <h1 className="text-gray-500 text-2xl font-semibold">Cargando...</h1>
        </div>
    )
}

export default Loading