import { useForm } from "react-hook-form";
import PublicIcon from "@/assets/global.svg";
import PrivateIcon from "@/assets/locker.svg";
import { useState, MouseEvent, useContext } from "react";
import { toPairs } from "ramda";
import { UserContext } from "@/contexts/UserContext";
import { createNote, updateNote } from "@/services/note-fetch";
import { ModalContext } from "@/contexts/ModalContext";
import ModalLoginAndRegister from "../UserModalAccess/ModalLoginAndRegister";

type PrivacyStateNote = 'public' | 'private';
type CreateNoteFormProps = {
  note?: {
    id: string,
    text: string,
    is_public: boolean
  },
  createdNoteFn?: () => void;
}
type NoteTextForm = {
  text: string
}

function CreateNoteForm({ note, createdNoteFn }: CreateNoteFormProps) {
  const { register, handleSubmit, watch, formState, setValue } = useForm<NoteTextForm>({
    defaultValues: {
      text: note ? note.text : ''
    }
  });

  const [isPublic, setIsPublic] = useState(note?.is_public ? 'public' : 'private' as PrivacyStateNote);
  const [openPrivacyStates, setOpenPrivacyState] = useState(false)
  const { token, user } = useContext(UserContext);
  const { setModalContent } = useContext(ModalContext);

  const notePrivacyStates = {
    "public": { Icon: PublicIcon, label: 'Nota pública' },
    "private": { Icon: PrivateIcon, label: 'Nota privada' }
  }

  const currentState = notePrivacyStates[isPublic];

  return (
    <form className="px-5 pt-3"
      onSubmit={handleSubmit(handleSubmitFunction)}
      onClick={resetClickInForm}
    >
      <textarea className="w-full text-[0.9rem] bg-base-dark-100 p-2 px-4 border-[1.5px] border-base-dark-500 rounded-lg focus:outline-none focus:border-dark-text-600 max-h-[180px] min-h-[60px] placeholder:text-dark-text-400"
        rows={6}
        placeholder="Escreva sua nota"
        {...register('text', {
          required: { value: true, message: 'Texto está vazio' },
          maxLength: { value: 1000, message: 'Valor máximo é 1000 caracteres' }
        })
        }
      />

      <div className="flex justify-between px-1 text-[0.8rem]">
        <p className="text-red-500">{formState.errors.text?.message || ""}</p>
        <p className="text-dark-text-400">{watch('text')?.length || 0} / 1000</p>
      </div>


      <div className="flex relative my-2 w-[40%] text-[0.8rem] select-none"
        onClick={handleClickState}
      >
        <div className="hover:ring-1 ring-base-dark-500 rounded-lg w-full overflow-hidden">
          {privacyStateButton([isPublic, currentState])}
        </div>

        {openPrivacyStates ?
          <div className="absolute top-0 left-0 w-full ring-1 ring-base-dark-500 rounded-lg overflow-hidden">
            {toPairs(notePrivacyStates).map((state) => (
              privacyStateButton(state)
            ))}
          </div>

          : null
        }
      </div>

      <div className="flex justify-center w-full">
        <input className="space-x-auto mt-2 bg-base-dark-250 hover:bg-base-dark-500 transition-[background_200ms_ease] w-[50%] px-3 py-2.5 rounded-full cursor-pointer text-[0.85rem]"
          type="submit"
          value={note ? 'Atualizar Nota' : 'Criar Nota'}
        />
      </div>
    </form >
  )

  function privacyStateButton([key, { Icon, label }]: [key: PrivacyStateNote, typeof currentState]) {
    return (
      <div className="flex gap-6 px-2 items-center w-full bg-base-dark-100 py-2.5 cursor-pointer"
        key={key}
        onClick={() => handleSelectState(key)}
      >
        <Icon className="w-4 h-4 mx-2" />
        {label}
      </div>
    )
  }

  async function handleSubmitFunction({ text }: NoteTextForm) {
    console.log("1. ENTROU NA FUNCTION SUBMIT")
    if (!user && !token) {
      setModalContent('session-user', {
        title: 'Cadastre-se ou entre na sua conta',
        content: ModalLoginAndRegister,
      });

      return;
    }

    const is_public = isPublic === 'public';

    if (!note) {
      const res = await createNote(token, {
        text,
        is_public
      })
    }

    if (note) {
      await updateNote(token, {
        id: note.id,
        text,
        is_public
      })
    }

    if (createdNoteFn) createdNoteFn();
    resetFields()
  }

  function resetFields() {
    setValue('text', '')
  }

  function handleClickState() {
    setOpenPrivacyState(!openPrivacyStates)
  }

  function handleSelectState(state: PrivacyStateNote) {
    setIsPublic(state)
  }

  function resetClickInForm(e: any) {
    if (openPrivacyStates && e.currentTarget !== e.target) {
      setOpenPrivacyState(false);
    }
  }
}



export default CreateNoteForm;
