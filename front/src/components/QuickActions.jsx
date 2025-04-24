import Card from "./Card";
import CardGap from "../assets/card-gap.svg";
import { ArrowDown, BanknoteArrowDown, BanknoteArrowUp, Currency } from "lucide-react";
import { useState } from "react";
import RoundButton from "./RoundButton";

function QuickActions() {
    const [ openedWallet, setOpenedWallet ] = useState(false);
    const toggleWallet = () => {
        setOpenedWallet((previousState) => !previousState)
    }
    return (
        <div className="flex flex-col w-106 items-center z-10">
            <Card className={"absolute"} />

            <div className={"transition-all duration-500 h-fit w-full z-20 relative flex flex-col " + (openedWallet ? "mt-62" : "mt-4")}>
                <div className="w-full flex relative justify-center">
                    <div className="bg-[var(--overlay)] w-full rounded-tl-xl"></div>
                    <img className="h-10" src={CardGap} />
                    <div className="bg-[var(--overlay)] w-full rounded-tr-xl"></div>
                    <ArrowDown color={openedWallet ? "#FFF" : "#000"} size={28} className={"transition-all duration-250 absolute cursor-pointer " + (openedWallet && "rotate-180")} onClick={toggleWallet} />
                </div>
                <div className="w-full h-full bg-[var(--overlay)] rounded-b-xl px-8 pb-8 flex flex-col gap-2">
                    <p className="text-[var(--u-icon)]">Saldo Total</p>
                    <p className="text-4xl !text-white">R$150,00</p>
                    <p className="!text-[var(--ok)]">+ R$50,00</p>
                    <div className="w-full h-full flex justify-around items-center mt-6">
                        <RoundButton text={"Transferir"} icon={<BanknoteArrowUp />} />
                        <RoundButton text={"Depositar"} icon={<BanknoteArrowDown />} />
                        <RoundButton text={"Converter"} icon={<Currency />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickActions;
