import { useContext, useState } from "react";
import { FieldError, RegisterOptions, UseFormRegisterReturn, useForm } from "react-hook-form"
import EyeOff from "@/assets/eye-off.svg";
import EyeIcon from "@/assets/eye.svg";
import { formAccessMode } from "@/types/forms-type";
import { checkUsername, loginAndRegisterUser } from "@/services/fetch-api";
import { WrapErrorInputs, WrapRootErros } from "../FormsComponents/WrapErrorForms";
import { useCookies } from "react-cookie";
import { UserContext } from "@/contexts/UserContext";

type RegisterFormTypes = {
  username: string,
  password: string,
  repeatPassword: string
}

type LoginFormProps = {
  setForm: (mode: formAccessMode) => void
}

export default function RegisterForm({ setForm }: LoginFormProps) {
  const { register, handleSubmit, formState, getValues } = useForm<RegisterFormTypes>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUserAuthByToken } = useContext(UserContext);

  return (
    <form className="flex flex-col animate-open-modal select-none text-[0.9rem] gap-4 pt-10 items-center h-full w-full"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div className="flex w-full flex-col px-[15%]">

        <div className="flex focus-within:border-dark-text-300 overflow-hidden group items-center pl-4 border-[1.75px] border-base-dark-500 rounded-lg">
          <label className="min-w-28 text-[0.85rem] text-neutral-400 font-medium border-r-[1px] border-base-dark-500 my-3"
            htmlFor="username"
          >Usuário</label>

          <input className="w-full select-text pl-5 h-full border-base-dark-800 placeholder:text-dark-text-500 group-focus:border-2 px-2 bg-transparent focus:outline-none"
            type="text"
            placeholder="Crie um usuário"
            {...register('username', validateUsernameInput())}
          />

        </div>

        <WrapErrorInputs error={formState.errors.username} />

        <div className="flex focus-within:border-dark-text-300 overflow-hidden  group items-center pl-4 border-[1.75px] border-base-dark-500 rounded-lg ">
          <label className="min-w-28 text-[0.85rem] text-neutral-400 font-medium border-r-[1px] border-base-dark-500 my-3"
            htmlFor="password"
          >Senha</label>

          <input className="w-full pl-5 px-2 h-full border-base-dark-800 placeholder:text-dark-text-500 group-focus-visible:text-white bg-transparent focus:outline-none"
            {...register('password', validateFirstPasswordInput())}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Crie sua senha"
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


        <div className="flex focus-within:border-dark-text-300 overflow-hidden  group items-center pl-4 border-[1.75px] border-base-dark-500 rounded-lg ">
          <label className="min-w-28 text-[0.85rem] text-nowrap text-neutral-400 shrink-0 font-medium border-r-[1px] border-base-dark-500 my-3" htmlFor="password">Repetir senha</label>

          <input className="w-full pl-5 px-2 h-full border-base-dark-800 placeholder:text-dark-text-500 group-focus-visible:text-white bg-transparent focus:outline-none"
            type="password"
            {...register('repeatPassword', validateRepeatPasswordInput())}
            placeholder="Repetir senha"
          />
        </div>

        <WrapErrorInputs error={formState.errors.repeatPassword} />

      </div>

      <div className="flex flex-col w-full h-full items-center gap-2  px-[15%]">
        <input className="bg-base-dark-300 hover:bg-base-dark-500 transition-[background_0.2s_ease] w-[33.33%] py-3 rounded-full cursor-pointer active:bg-base-dark-700"
          type="submit"
          value="Cadastrar conta"
        />


        <WrapRootErros error={formState.errors.root?.message} />

        <button className="opacity-75 hover:opacity-100"
          onClick={handleBackToLogin}
        >
          Já tem conta? Então faça o login aqui
        </button>
      </div>
    </form>
  )

  async function handleRegister() {
    const { username, password } = getValues()

    const result = await loginAndRegisterUser('register', { username, password })

    if (result) {

      setUserAuthByToken(result.token, () => {
        setForm('SUBMIT_STATE')
      })

    }
  }

  function handleBackToLogin() {
    setForm('LOGIN')
  }

  function handleToggleVisibilityPassword() {
    setPasswordVisible(!passwordVisible)
  }

  function validateUsernameInput(): RegisterOptions {
    return {
      required: {
        value: true,
        message: 'Usuário é obrigatório'
      },
      validate: async () => {
        const res = await checkUsername(getValues().username)

        if (!res) return 'Erro ao verificar usuário';

        const { username } = res;

        if (username) return 'Usuário já exite. Tente outro!'

      },
      pattern: {
        value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w._-]{3,29}$/g,
        message: 'usuário incorreto, é permitido apenas: A-Z, a-z, 0-9, "-", ".", "_"'
      },
      minLength: {
        value: 4,
        message: 'O usuário tem que ter no mínimo 3 caracteres '
      },
      maxLength: {
        value: 29,
        message: 'O usuário tem que ter no máximo 29 caracteres'
      },
    }
  }

  function validateFirstPasswordInput(): RegisterOptions {
    return {
      pattern: {
        value: /^(?=.*?[0-9])(?=.*?[A-Za-z]).{5,32}$/ig,
        message: 'Na senha é obrigátorio ter letras e números'
      },
      required: {
        value: true,
        message: 'Senha é obrigatório'
      },
      minLength: {
        value: 6,
        message: 'A senha tem que ter no mínimo 6 caracteres'
      },
      maxLength: {
        value: 32,
        message: 'A senha tem que ter no máximo 29 caracteres'
      },
    }
  }

  function validateRepeatPasswordInput(): RegisterOptions {
    return {
      required: {
        value: true,
        message: 'Repetir a senha é obrigatório'
      },
      validate: () => {
        if (getValues().password !== getValues().repeatPassword) {
          return 'As senhas tem que ser semelhantes!'
        }

      }
    }
  }
}

