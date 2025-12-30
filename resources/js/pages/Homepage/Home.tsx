import React from "react"

import MainLayout from "@/layouts/MainLayout/main-layout"
import DataContainer from "@/components/data-container"
import AddTaskBtn from "@/components/add-task-btn"

export default function Home() {
    const headline = 'Task Overview'
    const subtext = 'Track your work. Update progress. Keep moving.'

    return (
        <MainLayout>
            <div className="pt-20">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-semibold"> { headline } </h1>
                        <p className="text-sm text-gray-500"> { subtext } </p>
                    </div>
                    <AddTaskBtn />
                </div>

                <DataContainer />
            </div>
        </MainLayout>
    )
}