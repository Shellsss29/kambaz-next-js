import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
  _id?: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image?: string;
  editing?: boolean;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: courses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      const newCourse: Course = {
        _id: uuidv4(),
        name: course.name,
        number: course.number,
        startDate: course.startDate,
        endDate: course.endDate,
        department: course.department,
        credits: course.credits,
        description: course.description,
        author: course.author,
        image: course.image ?? "/images/reactjs.jpg",
      };
      state.courses.push(newCourse);
    },

    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },

    updateCourse: (state, action: PayloadAction<Course>) => {
      const updated = action.payload;
      const idx = state.courses.findIndex((c) => c._id === updated._id);
      if (idx !== -1) state.courses[idx] = updated;
    },

    editCourse: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idx = state.courses.findIndex((c) => c._id === id);
      if (idx !== -1)
        state.courses[idx] = { ...state.courses[idx], editing: true };
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, editCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
