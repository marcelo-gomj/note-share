import { formAccessMode } from "@/types/forms-type";
import { RegisterOptions, useForm } from "react-hook-form";
import EyeOff from "@/assets/eye-off.svg";
import EyeIcon from "@/assets/eye.svg";
import { useContext, useState } from "react";
import { checkUsername, loginAndRegisterUser } from "@/services/fetch-api";
import { WrapRootErros, WrapErrorInputs } from "../FormsComponents/WrapErrorForms";
import { useCookies } from "react-cookie";
import { UserContext } from "@/contexts/UserContext";

type LoginFormTypes = {
  username: string,
  password: string
}

type RegisterFormProps = {
  setForm: (mode: formAccessMode) => void
}

export default function RegisterForm({ setForm }: RegisterFormProps) {
  const { setUserAuthByToken } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    setError
  } = useForm<LoginFormTypes>();
  const [passwordVisible, setPasswordVisible] = useState(false);


  return (
    <form className="flex flex-col animate-open-modal select-none text-[0.9rem] gap-2 pt-12 items-center h-full w-full"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="flex w-full flex-col h-full justify-center px-[17.5%]">

        <div className="flex justify-between gap-5 focus-within:border-dark-text-300 overflow-hidden group items-center pl-4 border-[1.75px] border-base-dark-500 rounded-lg">
          <label className="min-w-24 text-neutral-400 font-medium border-r-[1px] border-base-dark-500 my-3" htmlFor="username">Usuário</label>

          <input className="w-full select-text pl-5 h-full border-base-dark-800 placeholder:text-dark-text-500 group-focus:border-2 px-2 bg-transparent focus:outline-none"
            type="text"
            placeholder="Digite seu usuário"
            {...register('username', validateUsername())}
          />
        </div>

        <WrapErrorInputs error={formState.errors.username} />

        <div className="flex justify-between gap-5 focus-within:border-dark-text-300 overflow-hidden  group items-center pl-4 border-[1.75px] border-base-dark-500 rounded-lg ">
          <label className="min-w-24 text-neutral-400 font-medium border-r-[1px] border-base-dark-500 my-3" htmlFor="password">Senha</label>

          <input className="w-full pl-5 px-2 h-full border-base-dark-800 placeholder:text-dark-text-500 group-focus-visible:text-white bg-transparent focus:outline-none"
            {...register('password', validatePassword())}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Digite sua senha"
          />

          <div className="flex items-center peer-focus:hidden pl-3 pr-4 h-full cursor-pointer opacity-75 hover:opacity-100"
            onClick={handleToggleVisibilityPassword}
          >
            {passwordVisible ?
              <EyeOff className="h-5 w-5" /> :
              <EyeIcon className="h-5 w-5" />
            }
          </div>

        </div>

        <WrapErrorInputs error={formState.errors.password} />
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-4
       h-full px-[17.5%]">
        <input className="bg-base-dark-300 hover:bg-base-dark-500 transition-[background_0.2s_ease] w-[50%] py-3 rounded-full cursor-pointer active:bg-base-dark-700"
          type="submit"
          value="Entrar"
        />

        <WrapRootErros error={formState.errors.root?.message} />


        <button className="opacity-75 hover:opacity-100"
          onClick={handleCreateAccountButton}
        >
          Criar uma conta gratuitamente!
        </button>

      </div>

    </form>
  )

  async function handleLogin() {
    const { username, password } = getValues()

    const result = await loginAndRegisterUser('login', { username, password });

    if (!result) {
      setError('password', {
        message: 'Senha incorreta. Tente outra novamente!'
      });

      return;
    }

    if (result) {
      setUserAuthByToken(result.token, () => {
        setForm('SUBMIT_STATE')
      });
      return;
    }

    setError('root', {
      message: "Erro interno!"
    })

  }

  function handleToggleVisibilityPassword() {
    setPasswordVisible(!passwordVisible)
  }

  function handleCreateAccountButton() {
    setForm('REGISTER')
  }

  function validateUsername(): RegisterOptions {
    return {
      required: {
        value: true,
        message: "Nome de usuário é obrigatório"
      },
      validate: async () => {
        const existUsername = await checkUsername(getValues().username);

        if (!existUsername) return 'Usuário inválido';
        const { username } = existUsername;
        if (!username) return 'Usuário não existe';
      }
    }
  }

  function validatePassword(): RegisterOptions {
    return {
      required: {
        value: true,
        message: 'A senha é obrigatória'
      }
    }
  }
}