import { Input } from "../Input"
import { register } from "../../data/register"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"


export const RegisterSection = ({ title, userType }) => {
    const navigate = useNavigate()
    const { buttonState, setButtonState, sendRegister, inputsHandle } = useRegister(userType)

    const handleSubmit = async e => {
        e.preventDefault()
        setButtonState(true)
        const result = await sendRegister()

        if (result.success) {
            localStorage.setItem("x-acess-token", result.data.token)
            return navigate("/verificar-email")
        }
        
        console.error(result.error)
        setButtonState(false)
    }

    return (
        <section>
            <form
                onSubmit={handleSubmit} 
                className="bg-zinc-800 px-10 min-h-[400px] py-10 text-white flex text-xl flex-col justify-between rounded-xl gap-5"
            >
                <h1 className="flex justify-center font-bold text-3xl">{title}</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {register.inputs.map((input, index) => (
                        <Input handle={inputsHandle} key={`input-${index}`} labelName={input.label} {...input.input}/>
                    ))}
                </ul>
                <Button disabledState={buttonState} title="Enviar registro"/>
            </form>
        </section>
    )
}