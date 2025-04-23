import Background from "../components/Background"
import Button from "../components/Button"
import Divider from "../components/Divider"
import Input from "../components/Input"
import Link from "../components/Link"
import Logo from "../components/Logo"

import GoogleIcon from "../assets/google.svg"
import AppleIcon from "../assets/apple.png"

function Register() {
    return (
        <>
            <div className="flex flex-col gap-4 items-end p-4">
                <Logo subtitle={true} className="mb-16" />
                <div className="flex gap-4 w-full">
                    <Button onClick={() => {}} text={"Google"} color="black" icon={GoogleIcon} />
                    <Button onClick={() => {}} text={"Apple"} color="black" icon={AppleIcon} />
                </div>
                <Divider text="ou" />
                <Input type={"text"} placeholder={"Nome"}/>
                <Input type={"email"} placeholder={"Email"}/>
                <Input type={"password"} placeholder={"Senha"}/>
                <Button onClick={() => {}} text={"Registrar-se"}/>
                <p className="w-full text-center flex flex-col min-[370px]:flex-row justify-center items-center gap-0 min-[370px]:gap-2">Já possui uma conta? <Link href={"/login"} text={"Faça login!"}/></p>
            </div>
            <Background />
        </>
    )
}

export default Register