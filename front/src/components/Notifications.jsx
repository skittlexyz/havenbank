import { useState } from "react"
import RoundButton from "./RoundButton"
import { Bell } from "lucide-react"

function NotificationBell() {
    const [ read, setRead ] = useState(false)

    return (
        <><RoundButton icon={<Bell />} bgColor="var(--overlay)" marked={true} /></>
    )
}

export default NotificationBell