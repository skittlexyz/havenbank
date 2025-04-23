function Divider({ text = "" }) {
    return (
        <div className="py-1 w-full">
            {text == "" ?
                <hr className="w-full border-t-0 border-b-2 border-[var(--overlay)]"/> :
                <div className="flex gap-4 items-center">
                    <hr className="w-full border-t-0 border-b-2 border-[var(--overlay)]"/>
                    <p>{text}</p>
                    <hr className="w-full border-t-0 border-b-2 border-[var(--overlay)]"/>
                </div>
            }
        </div>
    )
}

export default Divider