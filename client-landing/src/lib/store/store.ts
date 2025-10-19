import { configureStore } from "@reduxjs/toolkit"

import homeSlice from "../store/home/home-slice"
import instituteCourseSlice from "../store/institute-course/institute-course"
import authSlice from "../store/auth/auth-slice"
import instituteRegisterSlice from "../store/register-institute/register-institute-slice"
import ownerSlice from "../store/owner/owner-slice"
import userInstituteRole from "../store/user-institute-role/user-institute-role-slice"
import categorySlice from "../store/owner/category/category-slice"
import teacherSlice from "../store/teacher/teacher-slice"
import instituteTeacherSlice from "../store/owner/teacher/teacher-slice"
import instituteStudentSlice from "../store/owner/student/student-slice"
import studentSlice from "../store/student/student-slice"
import courseOwnerSlice from "../store/owner/course/course-slice"

const store=configureStore({
    reducer:{
        home:homeSlice,
        course:instituteCourseSlice,
        auth:authSlice,
        instituteRegister:instituteRegisterSlice,
        owner:ownerSlice,
        userRole:userInstituteRole,
        category:categorySlice,
        teacher:teacherSlice,
        instituteTeacher:instituteTeacherSlice,
        instituteStudent:instituteStudentSlice,
        student:studentSlice,
        courseOwner:courseOwnerSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>