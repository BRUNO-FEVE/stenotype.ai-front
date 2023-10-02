import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface NewPageButtonProps {
    to: string
}

export default function NewPageButton({to}: NewPageButtonProps) {
  return (
    <Link to={to}>
        <button className="bg-skin-bg-base-foreground h-14 w-14 rounded-full fixed right-5 bottom-5 flex justify-center items-center">
            <ArrowRightIcon className="text-skin-inverted w-8 h-8" />
        </button>
    </Link>
  )
}
