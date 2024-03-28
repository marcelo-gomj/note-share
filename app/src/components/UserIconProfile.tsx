import { NextFontWithVariable } from "next/dist/compiled/@next/font"
import { head } from "ramda"

type UserIconProps = {
  username: string,
  size: number,
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

export default function UserIconProfile({ username, size, weight }: UserIconProps) {
  return (
    <div>
      <div className={`flex justify-center items-center leading-[0] rounded-full border-base-dark-500`}
        style={{ width: size + 'rem', height: size + 'rem', fontWeight: weight, fontSize: size + 'rem' }}
      >
        {head(username).toUpperCase()}
      </div>
    </div>
  )
}