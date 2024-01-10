interface IHeaderTabItemProps {
  name: string
  active?: boolean
  onClick?: () => void
}

const HeaderTabItem = ({
  name,
  onClick,
  active = false,
}: IHeaderTabItemProps) => {
  return (
    <button
      onClick={() => onClick?.()}
      type="button"
      className={`
        flex-1 text-center font-bold rounded py-2 cursor-pointer hover:bg-neutral-800
        ${active ? 'text-white' : 'text-neutral-700'}
      `}
    >
      {name}
    </button>
  )
}

export default HeaderTabItem
