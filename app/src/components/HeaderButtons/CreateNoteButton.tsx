import NavItem from "./NavHeaderItem";
import CreateNoteIcon from "@/assets/create.svg";

function CreateNoteButton(){
  return (
    <NavItem
    Icon={CreateNoteIcon}
  >
    <p>Criar Nota</p>
  </NavItem>
  )
}

export default CreateNoteButton;