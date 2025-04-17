function Button({ text, onClick, color = "default", icon = null }) {
    return (
        <>
            <div onClick={onClick}
                className={`duration-150 w-full ${color == "default" ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] !text-black" : "bg-[var(--overlay)] hover:bg-[var(--overlay-hover)] !text-white !font-normal"}  font-bold py-3 px-6 rounded-full flex justify-center itmes-center gap-2 cursor-pointer`}>
                {icon && <img className="h-6 -ml-2" src={icon} />}
                {text}
            </div>
        </>
    )
}

export default Button