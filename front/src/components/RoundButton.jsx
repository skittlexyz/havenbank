import { cloneElement } from "react"

function RoundButton({ text, icon, iconColor = "var(--overlay)", bgColor = "var(--u-icon)", marked = false }) {
    const resizedIcon = cloneElement(icon, { size: 28, color: iconColor })

    return (
        <div className="flex flex-col gap-1 justify-center items-center">
            <div className={`rounded-full bg-[${bgColor}] w-12 h-12 flex justify-center items-center cursor-pointer`}>
                {icon}
            </div>
            <p>{text}</p>
            {marked && <>
                <div className="absolute h-3 w-3 rounded-full bg-[var(--accent)] mt-8 ml-8 animate-pulse"></div> 
            </>}
        </div>
    )
}

export default RoundButton