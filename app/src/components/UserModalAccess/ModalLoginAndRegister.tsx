'use client';
import { useState } from "react";
import RegisterForm from "../Forms/LoginForm";
import LoginForm from "../Forms/RegisterForm";
import { formAccessMode } from "@/types/forms-type";
import SubmitState from "../FormsComponents/SubmitState";


function ModalLoginAndRegister() {
  const [formAccess, setFormAccess] = useState<formAccessMode>('LOGIN');

  const FormComponent = {
    'LOGIN': RegisterForm,
    'REGISTER': LoginForm,
    'SUBMIT_STATE': SubmitState
  }[formAccess]

  return (
    <div className="h-full">
      <FormComponent
        setForm={setForm}
      />
    </div>
  )

  function setForm(mode: formAccessMode) {
    setFormAccess(mode)
  }
}

export default ModalLoginAndRegister;