import { cloneElement } from "react"

function RoundButton({ text, icon }) {
    const resizedIcon = cloneElement(icon, { size: 28, color: "var(--overlay)" })

    return (
        <div className="flex flex-col gap-1 justify-center items-center">
            <div className="rounded-full bg-[var(--u-icon)] w-12 h-12 flex justify-center items-center cursor-pointer">
                {icon}
            </div>
            <p>{text}</p>
        </div>
    )
}

export default RoundButton