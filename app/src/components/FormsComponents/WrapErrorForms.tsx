import { FieldError } from "react-hook-form"

function WrapErrorInputs({ error }: { error: FieldError | undefined }) {
  return (
    <div className="empty:h-[2rem] text-red-400 text-[0.75rem] leading-6 py-1 font-normal px-3">
      {error?.message}
    </div>
  )
}

function WrapRootErros({ error }: { error: string | undefined }) {
  return (
    <div className="py-2.5 text-[0.9rem] empty:h-[0.9rem] leading-[0] text-red-400">
      {error || null}
    </div>
  )
}

export {
  WrapErrorInputs,
  WrapRootErros
};