import { cloneElement } from "react"

function Link({ text, href, icon = null, size = null }) {
    const resizedIcon = icon ? cloneElement(icon, { size: size || 20 }) : null

    return (
        <div className="flex items-center gap-2 cursor-pointer hover:underline">
            {resizedIcon}
            <a className={size ? `text-[${size}px]` : ''} href={href}>{text}</a>
        </div>
    )
}

export default Link
