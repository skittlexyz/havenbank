import { formatMoney } from "../utils"

function Transaction({ img, text, value, date }) {
    return (
        <div className="flex rounded-xl bg-[var(--overlay)] p-4 gap-4">
            <img src={img} className="rounded-full h-12 w-12" />
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full font-bold">
                    <p>{text}</p>
                    <p>{formatMoney(value, "-")}</p>
                </div>
                <p className="text-sm">{date}</p>
            </div>
        </div>
    )
}

export default Transaction