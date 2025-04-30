import { ArrowRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"

function AsideOpener({ onClick, onSwipedRight }) {
    const swipeHandler = useSwipeable({
        onSwipedRight: (e) => onSwipedRight(),
        trackMouse: true
    })

    return (
        <div className="fixed left-0 top-0 pl-4 h-screen flex items-center" onClick={onClick} {...swipeHandler}>
            <ArrowRight size={32} color="var(--u-icon)" className="cursor-pointer" />
        </div>
    )
}

export default AsideOpener