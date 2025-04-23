import { cloneElement } from "react"

function Link({ text, href, icon = null, size = null, className }) {
    const resizedIcon = icon ? cloneElement(icon, { size: size || 20, className: className }) : null

    return (
        <div className={"flex items-center gap-2 cursor-pointer hover:underline"}>
            {resizedIcon}
            <a className={className} href={href}>{text}</a>
        </div>
    )
}

export default Link
