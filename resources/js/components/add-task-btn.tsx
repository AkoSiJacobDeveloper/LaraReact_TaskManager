import { Link } from "@inertiajs/react"

export default function() {
    return (
        <Link
            href={'tasks/create'}
            className="border px-4 py-3 rounded "
        >
            Create task
        </Link>
    )
}