import React from "react"
import { Link } from "@inertiajs/react"

interface HeaderProps {
    title: string
}

export default function Header( { title }: HeaderProps ) {
    return (
        <header className="flex items-center justify-between w-screen fixed px-30 py-4 border-b ">
            <Link
                href={ '/' }
            >
                <h1 className="font-medium text-lg inline-block"> { title } </h1>
            </Link>
        </header>
    )
}