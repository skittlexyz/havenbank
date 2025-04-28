import { ArrowRight } from "lucide-react"

function AsideOpener({ onClick }) {
    return (
        <div className="fixed left-0 top-[calc(50%-16px)] pl-4" onClick={onClick}>
            <ArrowRight size={32} color="var(--u-icon)" className="cursor-pointer" />
        </div>
    )
}

export default AsideOpener