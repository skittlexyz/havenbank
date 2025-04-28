function PageTitle({ text, icon = null}) {
    return (
        <div className="flex justify-between">
            <p className="text-xl">{text}</p>
            {icon && icon}
        </div>
    )
}

export default PageTitle