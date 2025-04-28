import VisaLogo from "../assets/visa.svg"
import MastercardLogo from "../assets/mastercard.png"
import PaypalLogo from "../assets/paypal.svg"

function Card({ className }) {
    return (
        <>
            <div className={"w-96 h-56 bg-linear-45 from-[var(--card-primary)] to-[var(--card-secondary)] rounded-xl flex flex-col justify-between p-6 " + className}>
                <div>
                    <p className="!text-black">Standard</p>
                </div>
                <div className="w-full flex justify-between items-end">
                    <p className="!text-black text-2xl">**** 2401</p>
                    <img className="w-auto h-8" src={VisaLogo} alt="" />
                </div>
            </div>
        </>
    )
}

export default Card