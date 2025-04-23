import { useEffect } from "react"
import { redirectUser } from "./utils"

function App() {
  useEffect(() => { redirectUser(window.location.href) }, [])
  return (<></>)
}

export default App
