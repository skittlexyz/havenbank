import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

function Input({ type = "text", placeholder, value, onChange }) {
    const [ hide, setHide ] = useState(true)
    
    return (
        <>
            <div className="w-full bg-[var(--overlay)] py-3 px-6 rounded-full flex">
                <input className="w-full"
                    type={type == "password" ? hide ? "password" : "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <div className="cursor-pointer" onClick={() => setHide(!hide)}>
                    {type == "password" ? hide ?
                        <Eye color={"var(--u-icon)"} /> :
                        <EyeOff color={"var(--u-icon)"} /> : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Input