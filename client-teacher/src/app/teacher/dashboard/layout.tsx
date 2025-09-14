import TeacherDashboard from "@/app/component/dashboard/dashboard";

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