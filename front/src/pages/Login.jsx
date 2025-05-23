
import Button from "../components/Button"
import Divider from "../components/Divider"
import Input from "../components/Input"
import Link from "../components/Link"
import Logo from "../components/Logo"

import GoogleIcon from "../assets/google.svg"
import AppleIcon from "../assets/apple.png"

function Login() {
    return (
        <>
            <div className="flex flex-col gap-4 items-center p-4">
                <Logo className="mb-16" subtitle={true}/>
                <div className="flex gap-4 w-full">
                    <Button onClick={() => {}} text={"Google"} color="black" icon={GoogleIcon} />
                    <Button onClick={() => {}} text={"Apple"} color="black" icon={AppleIcon} />
                </div>
                <Divider text="ou" />
                <Input type={"email"} placeholder={"Email"}/>
                <Input type={"password"} placeholder={"Senha"}/>
                <Link  href={"/forgot-password"} text={"Esqueceu sua senha?"}/>
                <Button onClick={() => {}} text={"Log in"}/>
                <p className="w-full text-center flex flex-col min-[370px]:flex-row justify-center items-center gap-0 min-[370px]:gap-2">Não possui uma conta? <Link href={"/register"} text={"Registre-se!"}/></p>
            </div>
            
        </>
    )
}

export default Login