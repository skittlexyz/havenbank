import { ArrowLeftRight, CreditCard, LayoutDashboard, UserRound, Users, Settings, LogOut } from "lucide-react"
import Divider from "./Divider"
import Link from "./Link"
import Logo from "./Logo"
import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import AsideOpener from "./AsideOpener"
import { ArrowLeft } from "lucide-react"

function Aside() {
    const [currentAddress] = useState(window.location.pathname)
    const [ opened, setOpened ] = useState(false)

    const topItems = [
        { path: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
        { path: "/profile", text: "Meu Perfil", icon: UserRound },
        { path: "/accounts", text: "Contas", icon: Users },
        { path: "/transactions", text: "Transações", icon: ArrowLeftRight },
        { path: "/cards", text: "Cartões", icon: CreditCard },
    ]

    const bottomItems = [
        { path: "/settings", text: "Configurações", icon: Settings },
        { path: "/logout", text: "Sair", icon: LogOut }
    ]
    
    const swipeHandler = useSwipeable({
        onSwipedLeft: (e) => {
            setOpened(false)
            console.log(e)
        },
        trackMouse: true
    })

    return (
        <>
            <AsideOpener onClick={() => setOpened(true)}/>
            <div className={`absolute ${opened ? "w-screen" : "w-0"} h-screen flex duration-500`}>
                <div className={`z-20 ${opened ? "bg-[var(--bg)]/25" : "bg-transparent"} duration-500 h-screen w-full backdrop-blur-sm`} id="shadow"></div>
                <div {...swipeHandler} className={`fixed top-0 ${opened ? "left-0" : "-left-64"} z-20 duration-500 bg-[var(--bg)] h-screen min-w-64 max-w-64 border-r-2 border-r-[var(--overlay)] p-8 flex flex-col gap-2`}>
                    <Logo />
                    <Divider />
                    {/* eslint-disable-next-line no-unused-vars */}
                    {topItems.map(({ path, text, icon: Icon }) => {
                        const isActive = currentAddress === path
                        const color = isActive ? "var(--accent)" : "#FFFFFF"
                        const activeClass = isActive ? "!text-[var(--accent)]" : ""
                        
                        return (
                            <Link
                            key={path}
                            text={text}
                            href={path}
                            icon={<Icon color={color} />}
                            className={activeClass}
                            />
                        )
                    })}
                    <div className="h-full"></div>
                    {/* eslint-disable-next-line no-unused-vars */}
                    {bottomItems.map(({ path, text, icon: Icon }) => {
                        const isActive = currentAddress === path
                        const color = isActive ? "var(--accent)" : "#FFFFFF"
                        const activeClass = isActive ? "!text-[var(--accent)]" : ""
                        
                        return (
                            <Link
                            key={path}
                            text={text}
                            href={path}
                            icon={<Icon color={color} />}
                            className={activeClass}
                            />
                        )
                    })}
                    <ArrowLeft onClick={() => setOpened(false)} size={32} color="var(--u-icon)" className={`cursor-pointer absolute top-[calc(50%-16px)] duration-500 ${opened ? "left-68" : "-left-0"}`}/>
                </div>
            </div>
        </>
    )
}

export default Aside
