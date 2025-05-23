
import Button from "../components/Button"
import Divider from "../components/Divider"
import Input from "../components/Input"
import Link from "../components/Link"
import Logo from "../components/Logo"

import GoogleIcon from "../assets/google.svg"
import AppleIcon from "../assets/apple.png"

function ForgotPassword() {
    return (
        <>
            <div className="flex flex-col gap-4 items-end p-4">
                <Logo subtitle={true} margin={false}/>
                <Divider />
                <p className="w-full text-center">Insira seu email para recuperar sua senha.</p>
                <Input type={"email"} placeholder={"Email"}/>
                <Button onClick={() => {}} text={"Enviar instruções"}/>
                <p className="w-full text-center flex flex-col min-[370px]:flex-row justify-center items-center gap-0 min-[370px]:gap-2">Já possui uma conta? <Link href={"/login"} text={"Faça login!"}/></p>
            </div>
            
        </>
    )
}

export default ForgotPassword