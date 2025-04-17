function Link({ text, href }) {
    return (
        <>
            <a className="hover:underline !text-white" href={href}>{text}</a>
        </>
    )
}

export default Link