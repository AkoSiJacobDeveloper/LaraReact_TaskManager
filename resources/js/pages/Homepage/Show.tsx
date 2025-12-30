import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Trash } from "lucide-react";
import { PencilLine } from "lucide-react";
import { CircleCheck } from "lucide-react";

import { useRoute } from '../../../../vendor/tightenco/ziggy';

import MainLayout from "@/layouts/MainLayout/main-layout";

import type { Task } from "@/types/task";

type PageProps = {
    task: Task
}

export default function Show() {
    const { task } = usePage<PageProps>().props;
    const route = useRoute();

    const updateStatus = (taskId: number) => {
        router.put(route('task.update.status', { task: taskId}), {
            status: 'finished'
        })
    }
    return (
        <MainLayout>
            <div className="h-screen flex items-center justify-center relative">
                {/* Back Button */}
                <Link 
                    href={'/'}
                    className="group absolute top-20 -left-0 flex items-center gap-1 transition-all duration-300 hover:cursor-pointer"
                >
                    <ArrowLeft size={20} className="transition-all duration-300 group-hover:text-blue-700" />
                    <span className="transition-all duration-300 group-hover:text-blue-700">Back</span>
                </Link>
                <section 
                    // className="w-1/2 border p-20 rounded-md"
                    className={`w-1/2 p-20 rounded-md 
                        ${ task.status === 'pending'  ? 
                            'bg-amber-50' : 'bg-green-50'
                        } `}
                >
                    <h1 className="font-medium text-3xl">{ task.title }</h1>
                    <div className="flex gap-2 items-center mb-3">
                        <span 
                            className={`capitalize text-xs px-3 py-1 font-bold rounded 
                                ${ task.status === 'pending' ? 
                                    'bg-amber-200 text-amber-700' : 'bg-green-200 text-green-700'
                                }`}
                        >
                            { task.status }
                        </span>

                        {task.status === 'finished' ? null : (
                            task.due_date && (
                                <span className="text-xs py-1 px-3 font-bold rounded bg-red-200 text-red-700">
                                    Due: {new Date(task.due_date).toLocaleDateString()}
                                </span>
                            )
                        )}
                    </div>
                    <p className="text-lg text-justify mb-3">{ task.description }</p>

                    <section className="border-t">
                            {/* Delete and Edit button */}
                            <div className="py-2 flex justify-end item-center">
                                <div className="flex gap-5 item-center">
                                    {/* Finish the task */}
                                    <button
                                        onClick={() => updateStatus(task.id)}
                                        type="button"
                                    >
                                        <CircleCheck size={18} className="transition-all duration-300 hover:text-green-700 hover:cursor-pointer" />
                                    </button>

                                    {/* Edit */}
                                    <Link
                                        href={ route('tasks.edit', { task: task.id })}
                                    >
                                        <PencilLine size={18} className="transition-all duration-300 hover:text-green-700 hover:cursor-pointer" />
                                    </Link>

                                    {/* Delete */}
                                    <Link
                                        href={ route('tasks.destroy', { task: task.id })}
                                        method="delete"
                                        as={"button"}
                                    >
                                        <Trash size={18} className="transition-all duration-300 hover:text-red-700 hover:cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                </section>
            </div>
        </MainLayout>
    )
}