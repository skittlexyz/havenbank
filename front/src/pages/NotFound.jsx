
import { OctagonX } from "lucide-react"

function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                    <OctagonX color="var(--accent)" size={32}/>
                    <p className="text-2xl font-bold !text-[var(--accent)]">Error 404</p>
                </div>
                <p>Not found.</p>
            </div>
            
        </>
    )
}

export default NotFound