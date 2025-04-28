function PageWrapper({ content }) {
    return (
        <>
            <div className="bg-[var(--bg)] w-screen h-full flex justify-center items-center z-10 overflow-x-hidden">
                {content}
            </div>
            
        </>
    )
}

export default PageWrapper