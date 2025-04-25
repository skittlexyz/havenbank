import { ArrowLeftRight, CreditCard, LayoutDashboard, UserRound, Users, Settings, LogOut } from "lucide-react"
import Divider from "./Divider"
import Link from "./Link"
import Logo from "./Logo"
import { useState } from "react"

function Aside() {
    const [currentAddress] = useState(window.location.pathname)

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
    
    return (
        <div className="h-screen min-w-64 max-w-64 border-r-2 border-r-[var(--overlay)] p-8 flex flex-col gap-2">
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
        </div>
    )
}

export default Aside
