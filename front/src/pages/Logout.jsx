import Background from "../components/Background"
import { LoaderCircle } from "lucide-react"

function Logout() {
    return (
        <>
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <LoaderCircle color="var(--accent)" size={64} className="animate-spin"/>
                </div>
                <p>Desconectando...</p>
            </div>
            <Background />
        </>
    )
}

export default Logout