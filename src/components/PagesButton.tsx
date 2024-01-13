import clsx from 'clsx'

interface IPagesButtonProps {
  label: string
  active?: boolean
  onClick?: () => void
}

const PagesButton = ({ label, active = false, onClick }: IPagesButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        'w-full max-w-full truncate bg-background rounded-sm p-2 select-none font-bold',
        'hover:bg-accent',
        active ? '' : 'text-muted'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default PagesButton
