import { UserContext } from "@/contexts/UserContext";
import { UserModalContext } from "@/contexts/UserModalContext";
import { formAccessMode } from "@/types/forms-type";
import { useContext, useEffect } from "react";
import CheckIcon from "@/assets/check.svg";
import ErrorIcon from "@/assets/error.svg"

type SubmitStateProps = {
  setForm: (form: formAccessMode) => void
}

function SubmitState({ setForm }: SubmitStateProps) {
  const { user } = useContext(UserContext);
  const { setModalContent } = useContext(UserModalContext);

  useEffect(showSubmitState, []);

  return (
    <div className="flex h-full text-[1.1rem] font-medium w-full items-center justify-center animate-open-modal ">
      {user ?
        messageState(CheckIcon, 'green', `Acesso concluído para o @${user.username}`) :
        messageState(ErrorIcon, 'red', 'Erro de dados')
      }
    </div>
  )

  function showSubmitState() {
    let state = setTimeout(() => {
      setModalContent(null)
    }, 3000)

    return () => {
      clearTimeout(state)
    }
  }

  function messageState(Icon: any, color: 'green' | 'red', message: string) {
    return (
      <div className="flex flex-col items-center">
        <Icon className={`text-${color}-300 animate-bounce duration-500 w-60 h-w-60 stroke-[1]`} />

        <p>{message}</p>
      </div>
    )
  }
}

export default SubmitState;