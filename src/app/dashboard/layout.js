import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <DashboardNavbar />

            <div className="mx-auto flex max-w-[1600px]">
                <DashboardSidebar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}