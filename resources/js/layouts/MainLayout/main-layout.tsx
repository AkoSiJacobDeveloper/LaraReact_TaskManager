import Header from "@/components/header";

interface MainLayoutProps {
    children: React.ReactNode
}

export default function( { children }: MainLayoutProps ) {
    return (
        <>
            <Header title="Task Manager" />
            <main className="px-30">
                { children }
            </main>
        </>
    )

}