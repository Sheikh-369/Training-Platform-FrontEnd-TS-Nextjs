import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ICourseData } from "@/lib/store/institute/course/courseSliceTypes";
import { addCourse } from "@/lib/store/institute/course/courseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTeacher } from "@/lib/store/institute/teacher/teacherSlice";
import { fetchCategory } from "@/lib/store/institute/category/categorySlice";

interface ICloseModal {
  closeModal: () => void;
  
}

const CourseAddModal: React.FC<ICloseModal> = ({ closeModal}) => {
  const dispatch = useAppDispatch();
  const {data:categories}=useAppSelector((store)=>store.category)
  const {teacher:teachers}=useAppSelector((store)=>store.teacher)
  
  const [courseData, setCourseData] = useState<ICourseData>({
    id: "",
    courseName: "",
    coursePrice: "",
    courseDuration: "",
    courseDescription: "",
    courseLevel: "",
    teacherName:"",
    categoryName:"",
    teacherId:"",
    categoryId:""
    
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCourse(courseData));
    closeModal();
  };

  useEffect(()=>{
    dispatch(fetchTeacher())
    dispatch(fetchCategory())
  },[])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full"
      >
        <h2 className="text-lg font-bold mb-4 text-center">Add Course</h2>

        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={courseData.courseName}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="text"
          name="coursePrice"
          placeholder="Course Price"
          value={courseData.coursePrice}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          name="courseDuration"
          placeholder="Course Duration"
          value={courseData.courseDuration}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          name="courseDescription"
          placeholder="Course Description"
          value={courseData.courseDescription}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-3 rounded"
        />

        <select
  name="courseLevel"
  value={courseData.courseLevel}
  onChange={handleChange}
  className="border border-gray-300 p-2 w-full mb-3 rounded"
  required
>
  <option value="">Select course level</option>
  <option value="beginner">Beginner</option>
  <option value="intermediate">Intermediate</option>
  <option value="advance">Advance</option>
</select>

<select
  name="categoryId"
  value={courseData.categoryId}
  onChange={handleChange}
  className="border border-gray-300 p-2 w-full mb-3 rounded"
  required
>
  <option value="">Select category</option>
  {categories.length > 0 &&
    categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.categoryName}
      </option>
    ))}
</select>

        <select
  name="teacherId"
  value={courseData.teacherId}
  onChange={handleChange}
  className="border border-gray-300 p-2 w-full mb-3 rounded"
  required
>
  <option value="">Select teacher</option>
  {teachers.length > 0 &&
    teachers.map((teacher) => (
      <option key={teacher.id} value={teacher.id}>
        {teacher.teacherName}
      </option>
    ))}
</select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseAddModal;
