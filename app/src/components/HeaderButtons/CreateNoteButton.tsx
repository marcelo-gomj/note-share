'use client';
import { useContext } from "react";
import NavItem from "./NavHeaderItem";
import CreateNoteIcon from "@/assets/create.svg";
import { ModalContext } from "@/contexts/ModalContext";
import CreateNoteForm from "../Forms/CreateNoteForm";

function CreateNoteButton() {
  const { setModalContent } = useContext(ModalContext)
  return (
    <div
      onClick={handlerClickCreateNote}
    >
      <NavItem
        Icon={CreateNoteIcon}
      >
        <p>Criar Nota</p>
      </NavItem>

    </div>
  )

  function handlerClickCreateNote() {
    setModalContent('create-note', {
      title: 'Criar notas',
      content: CreateNoteForm,
      typeSize: 'md'
    })
  }
}

export default CreateNoteButton;