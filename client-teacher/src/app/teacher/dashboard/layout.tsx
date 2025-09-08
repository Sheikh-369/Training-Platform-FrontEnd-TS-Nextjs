import TeacherDashboard from "@/app/dashboard/dashboard";

function TeacherDashboardLayout({children,}: Readonly<{children: React.ReactNode;}>){
    return(
        <>
        <TeacherDashboard>
            {children}
        </TeacherDashboard>
        
        </>
    )
}

export default TeacherDashboardLayout