import { ExpandIcon } from "lucide-react"
import Divider from "./Divider"
import Link from "./Link"
import Logo from "./Logo"

function Aside() {
    return (
        <div className="h-screen w-64 border-r-2 border-r-[var(--overlay)] p-8 flex flex-col gap-2">
            <Logo />
            <Divider />
            <Link text={"Link 1"} icon={<ExpandIcon />} size={64}/>
            <Link text={"Link 2"}/>
            <Link text={"Link 3"}/>
            <Link text={"Link 4"}/>
            <Link text={"Link 5"}/>
            <Link text={"Link 6"}/>
        </div>
    )
}

export default Aside