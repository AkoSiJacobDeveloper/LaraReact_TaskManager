import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"

import MainLayout from "@/layouts/MainLayout/main-layout"
import TaskForm from "../Forms/AddTaskForm"

export default function CreateTask() {
    return (
        <MainLayout>
            <div className="h-screen flex items-center justify-center relative">
                <Link 
                    href={'/'}
                    className="group absolute top-20 left-0 flex items-center gap-1 transition-all duration-300 hover:cursor-pointer"
                >
                    <ArrowLeft size={20} className="transition-all duration-300 group-hover:text-blue-700" />
                    <span className="transition-all duration-300 group-hover:text-blue-700">Back</span>
                </Link>
                <TaskForm />
            </div>
        </MainLayout>
    )
}