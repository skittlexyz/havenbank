function PageWrapper({ content }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center z-10">
            {content}
        </div>
    )
}

export default PageWrapper