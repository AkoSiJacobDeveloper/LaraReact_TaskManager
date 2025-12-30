import React from "react"
import { useForm, usePage } from "@inertiajs/react"
import { useRoute } from '../../../../vendor/tightenco/ziggy';

import type { Task } from "@/types/task"

type PageProps = {
    task: Task;
}

export default function EditForm() {
    const headline = 'Let’s Refine This Task'
    const subtext = 'Adjust the info and keep moving forward'

    const { task } = usePage<PageProps>().props
    const route = useRoute();

    const { data, setData, put, errors, processing } = useForm({
        title: task.title,
        description: task.description,
        due_date: task.due_date ?? '',
        status: task.status
    })

    function submit(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()
        put(route('tasks.update', { task: task.id }))
    }

    return (
        <div className="w-1/2 mx-auto flex flex-col gap-5">
            <div>
                <h1 className="text-3xl font-semibold"> { headline } </h1>
                <p className="text-sm text-gray-500"> { subtext } </p>
            </div>
            <form onSubmit={ submit }>
                <div>
                    {/* Title */}
                    <div
                        className="mb-5"
                    >
                        <label 
                            htmlFor="title"
                            className="block text-sm font-medium"
                        >
                            Title
                        </label>

                        <input 
                            type="text" 
                            value={ data.title }
                            onChange={ (e) => setData('title', e.target.value) }
                            className={`border w-full p-3 rounded mb-2 ${
                                errors.title
                                    ? 'border-red-700'
                                    : ''
                            }`}
                        />

                        { errors.title && <p className="errors text-xs text-red-700"> { errors.title } * </p> }
                    </div>

                    {/* Due Date */}
                    <div
                        className="mb-5"
                    >
                        <label 
                            htmlFor="due_date"
                        >
                            Due Date
                        </label>

                        <input 
                            type="date" 
                            value={ data.due_date }
                            onChange={ (e) => setData('due_date', e.target.value) }
                            className={`border w-full p-3 rounded mb-2 ${
                                errors.title
                                    ? 'border-red-700'
                                    : ''
                            }`}
                        />

                        { errors.due_date && <p className="errors text-xs text-red-700"> { errors.due_date } * </p> }
                    </div>

                    {/* Description */}
                    <div
                        className="mb-5"
                    >
                        <label 
                            htmlFor="description"
                            className="block text-sm font-medium"
                        >
                            Description
                        </label>

                        <textarea 
                            rows={4}
                            value={ data.description }
                            onChange={ (e) => setData('description', e.target.value) }
                            className={`border w-full p-3 rounded mb-2 ${
                                errors.title
                                    ? 'border-red-700'
                                    : ''
                            }`}
                        />

                        { errors.description && <p className="errors text-xs text-red-700"> { errors.description } * </p> }
                    </div>

                    <div
                        className="flex justify-end"
                    >
                        <button
                            type="submit"
                            disabled = { processing }
                            className={`border px-4 py-3 rounded font-medium cursor-pointer transition-all duration-300 ${
                                processing
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'hover:bg-blue-500 hover:text-white'
                            }`}
                        >
                            { processing ? 'Updating task...' : 'Update task' }
                        </button>
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum adipisci quibusdam veniam ad eos quos voluptatibus quasi nulla temporibus. Temporibus recusandae vero porro quaerat doloremque cum dolore neque architecto. */}
                    </div>
                </div>
            </form>
        </div>
    )
}