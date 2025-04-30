import Transactions from "./Transactions";
import Wallet from "./Wallet";

function QuickActions() {
    
    return (
        <div className="flex flex-col gap-4 h-full w-fit">
            <Wallet />
            <Transactions />
        </div>
    );
}

export default QuickActions;
