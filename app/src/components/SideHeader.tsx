export default function SideHeader() {
  return (
    <header
      className="flex items-center justify-center w-[20%] border-2"
    >
      <nav
        className="flex flex-col gap-5 text-white text-[1.2rem]"
      >
        <a>Inicio</a>
        <a>Pesquisar</a>
        <a>Perfil</a>
        <a>Sobre</a>
      </nav>
    </header>
  )
}