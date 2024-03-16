'use client';
import { UserModalContext } from "@/contexts/UserModalContext"
import { useContext, MouseEvent } from "react"
import CloseIcon from "@/assets/close.svg";

export default function ModalContainer({ }) {
  const { userModal, setModalContent } = useContext(UserModalContext);

  const ModalContent = userModal?.content;

  return (
    <section>
      {
        ModalContent ?
          <div className="absolute flex items-center justify-center left-0 top-0 w-full h-[100vh] bg-[rgb(10,10,10,0.5)] animate-open-modal animate-close-modal cursor-pointer"
            onClick={handleClickOutContainer}
          >
            <div className="flex flex-col relative bg-base-dark-100 cursor-default w-[50%] h-[75%] rounded-2xl">

              <div className="flex relative p-2 items-center justify-between w-full px-2 my-2">
                <p className="text-[0.9rem] w-full px-5 text-center text-neutral-300">{userModal.title}</p>

                <div className="absolute right-2 top-0 cursor-pointer p-1.5 rounded-full h-full hover:bg-base-dark-600"
                  onClick={handleClickCloseModal}
                >
                  <CloseIcon className="w-7 h-7" />
                </div>
              </div>

              <div className="h-full w-full">
                <ModalContent />
              </div>
            </div>
          </div> : null
      }
    </section>
  )

  function handleClickCloseModal() {
    setModalContent(null)
  }

  function handleClickOutContainer(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (e.target === e.currentTarget) {
      handleClickCloseModal()
    }
  }
}