import LogoSVG from "../assets/避難所.svg"
import LogoSubtitle from "./LogoSubtitle"

function Logo({ subtitle = false, margin = true }) {
    return (
        <>  
            {subtitle ?
                <div className={`flex flex-col items-start gap-2 ${margin && "my-4"}`}>
                    <img src={LogoSVG} />
                    <LogoSubtitle />
                </div> :
                <img className="my-4" src={LogoSVG} />
            }
        </>
    )
}

export default Logo