function PageTitle({ text, button = null}) {
    return (
        <div className="w-full flex justify-between items-center">
            <p className="text-2xl">{text}</p>
            {button && button}
        </div>
    )
}

export default PageTitle