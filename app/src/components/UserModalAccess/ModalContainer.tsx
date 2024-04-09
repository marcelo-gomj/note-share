'use client';
import { ModalContext } from "@/contexts/ModalContext"
import { useContext, MouseEvent } from "react"
import CloseIcon from "@/assets/close.svg";
import { toPairs } from "ramda";

export default function ModalContainer({ }) {
  const { modals, setModalContent } = useContext(ModalContext);

  const modalsList = toPairs(modals);

  const ModalContent = modals?.content;


  return (
    <section>
      {
        modalsList.map(([idModal, { content: ModalContent, title, typeSize, finallyFn }]) => {
          const types = typeSize || 'lg';

          const sizeModal = {
            'md': "w-[40%] h-[60%]",
            'lg': "w-[50%] h-[75%]"
          }[types]

          return (
            <div className="absolute flex items-center justify-center left-0 top-0 w-full h-[100vh] bg-[rgb(10,10,10,0.9)] animate-open-modal animate-close-modal cursor-pointer"
              onClick={(e) => handleClickOutContainer(e, idModal)}
            >
              <div className={`flex flex-col relative bg-base-dark-100 cursor-default ${sizeModal} rounded-2xl border-[1px] border-base-dark-300`}>

                <div className="flex relative p-2 items-center justify-center w-full mt-2 mb-1">
                  <p className="text-[0.9rem] w-full px-5 text-center text-neutral-300">{title}</p>

                  <div className="absolute flex items-center right-2 opacity-75 hover:opacity-100 top-0 cursor-pointer p-1.5"
                    onClick={() => handleClickCloseModal(idModal)}
                  >
                    <CloseIcon className="w-6 h-6" />
                  </div>
                </div>

                <div className="h-full w-full">
                  <ModalContent finallyFn={finallyFn} />
                </div>
              </div>
            </div>
          )
        })
      }
    </section>
  )

  function handleClickCloseModal(id: string) {
    setModalContent(id)
  }

  function handleClickOutContainer(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string) {
    if (e.target === e.currentTarget) {
      handleClickCloseModal(id)
    }
  }
}