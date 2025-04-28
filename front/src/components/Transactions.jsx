import Link from "./Link"
import Transaction from "./Transaction"
import IfoodLogo from "../assets/ifood-logo.jpg"

function Transactions() {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="w-full flex justify-between">
                <p>Transações Recentes</p>
                <Link text={"Ver Todas"}/>
            </div>
            <div className="flex flex-col gap-4">
                <Transaction img={IfoodLogo} text={"Ifood"} value={100} date={"01/01/2025"}/>
                <Transaction img={IfoodLogo} text={"Ifood"} value={100} date={"01/01/2025"}/>
                <Transaction img={IfoodLogo} text={"Ifood"} value={100} date={"01/01/2025"}/>
            </div>
        </div>
    )
}

export default Transactions