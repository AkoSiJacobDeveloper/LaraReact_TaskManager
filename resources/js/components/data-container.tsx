import React from "react"
import { Head, usePage, Link, router } from "@inertiajs/react"
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { Trash } from "lucide-react";
import { PencilLine } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { AlertTriangle } from "lucide-react";

import type { Task } from "@/types/task"
import type { PaginatedData } from "@/types/task";

type PageProps = {
    tasks: PaginatedData<Task>
    filter: 'all' | 'pending' | 'finished'
}

const checkOverdue = (task: Task) => {
    if (task.status !== 'pending' || !task.due_date) return false;
    const today = new Date();
    const due = new Date(task.due_date);
    today.setHours(0,0,0,0);
    due.setHours(0,0,0,0);
    return due < today;
};

export default function DataContainer() {
    const { tasks, filter: currentFilter } = usePage<PageProps>().props
    const route = useRoute();

    const updateStatus = (taskId: number) => {
        router.put(route('task.update.status', { task: taskId }), {
            status: 'finished'
        });
    };

    const changeFilter = (newFilter: 'all' | 'pending' | 'finished' ) => {
        router.get(route('tasks.index'), { filter: newFilter }, {
            preserveScroll: true,
            preserveState: true
        })
    }

    return (
        <section className="min-h-[75vh] flex flex-col mt-5">
            <div className="mb-8 flex justify-between items-center gap-4">
                <div className="flex gap-1">
                    <button
                        onClick={() => changeFilter('all')}
                        className={`text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:cursor-pointer ${currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    
                    <button
                        onClick={() => changeFilter('pending')}
                        className={`text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:cursor-pointer ${currentFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}
                    >
                        Pending
                    </button>
                    
                    <button
                        onClick={() => changeFilter('finished')}
                        className={`text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:cursor-pointer ${currentFilter === 'finished' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                    >
                        Finished
                    </button>
                </div>

                {/* Show current filter info */}
                <div className="ml-auto text-sm text-gray-600">
                    Showing {tasks.from || 0}-{tasks.to || 0} of {tasks.total} tasks
                </div>
            </div>

            {tasks.data.length === 0 && (
                <div className="flex justify-center items-center h-96">
                    <p>No data is found</p>
                </div>
                
            )}

            <div className="grid grid-cols-3 gap-5">
                {tasks.data.map(task => {
                    const isOverdue = task.is_overdue;
                    
                    return (
                        <div 
                            key={task.id}
                            className={`rounded-md p-5 flex flex-col gap-3
                                ${task.status === 'finished' ? 
                                    'bg-green-50 border border-green-200' :
                                    isOverdue ?  
                                        'bg-red-50 border border-red-200' :
                                        'bg-amber-50 border border-amber-200'
                                }`}
                        >
                            <section className="">
                                <h1 className="font-medium text-2xl mb-1">{ task.title }</h1>
                                <div className="flex gap-2 items-center mb-3">
                                    <span 
                                        className={`capitalize text-xs px-3 py-1 font-bold rounded 
                                            ${task.status === 'finished' ? 
                                                'bg-green-200 text-green-700' : 
                                                isOverdue ?  
                                                    'bg-red-200 text-red-700' : 
                                                    'bg-amber-200 text-amber-700'
                                            }`}
                                    >
                                        {isOverdue ? 'Overdue' : task.status}  {}
                                    </span>

                                    {task.due_date && task.status === 'pending' && (
                                        <span
                                            className={`text-xs py-1 px-3 font-bold rounded 
                                                ${isOverdue ?  
                                                    'bg-red-100 text-red-700 border border-red-300' : 
                                                    'bg-blue-200 text-blue-700'
                                                }`}
                                        >
                                            {isOverdue ? (  
                                                <span className="flex items-center gap-1">
                                                    <AlertTriangle size={12} />
                                                    Due: { new Date(task.due_date).toLocaleDateString() }
                                                </span>
                                            ) : (
                                                `Due: ${new Date(task.due_date).toLocaleDateString()}`
                                            )}
                                        </span>
                                    )}

                                    {isOverdue && (  
                                        <span className="text-red-600" title="This task is overdue">
                                            <AlertTriangle size={16} />
                                        </span>
                                    )}
                                </div>
                                <div className="flex h-16">
                                    <p className="text-sm text-justify line-clamp-3">{ task.description }</p>
                                </div>
                            </section>
                            <section className="border-t pt-3">
                                <div className="py-2 flex justify-between items-center">
                                    <Link
                                        href={ route('tasks.show', { task: task.id })}
                                        className="text-sm text-blue-500 transition-all duration-300 hover:underline font-medium"
                                    >   
                                        Read More
                                    </Link>

                                    <div className="flex gap-5 items-center">
                                        {/* Finish button - only show for pending tasks */}
                                        {task.status === 'pending' && (
                                            <button
                                                onClick={() => updateStatus(task.id)}
                                                type="button"
                                                title={isOverdue ? "Mark overdue task as finished" : "Mark as finished"}
                                                className={ isOverdue ? 
                                                    "text-red-600 hover:text-red-800 transition-all duration-300 hover:cursor-pointer" : 
                                                    "text-green-600 hover:text-green-800 transition-all duration-300 hover:cursor-pointer"
                                                }
                                            >
                                                <CircleCheck size={18} />
                                            </button>
                                        )}

                                        {/* Edit */}
                                        <Link
                                            href={ route('tasks.edit', { task: task.id })}
                                            title="Edit task"
                                        >
                                            <PencilLine size={18} className="text-gray-600 hover:text-green-700" />
                                        </Link>

                                        {/* Delete */}
                                        <Link
                                            href={ route('tasks.destroy', { task: task.id })}
                                            method="delete"
                                            as="button"
                                            preserveState
                                            preserveScroll
                                            title="Delete task"
                                        >
                                            <Trash size={18} className="text-gray-600 hover:text-red-700 transition-all duration-300 hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );
                })}
            </div>

            
            <div className="mt-10 flex justify-end">
                <nav className="flex gap-2">
                    {tasks.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`
                                flex gap-2 px-4 py-2 rounded-lg text-xs
                                ${link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                                ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                            `}
                            preserveScroll
                            preserveState
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    )
}