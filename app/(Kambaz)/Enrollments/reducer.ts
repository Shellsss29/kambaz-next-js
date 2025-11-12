import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolled: [] as string[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload: courseId }) => {
      if (!state.enrolled.includes(courseId)) {
        state.enrolled.push(courseId);
      }
    },

    unenrollCourse: (state, { payload: courseId }) => {
      state.enrolled = state.enrolled.filter((id) => id !== courseId);
    },

    toggleEnrollment: (state, { payload: courseId }) => {
      if (state.enrolled.includes(courseId)) {
        state.enrolled = state.enrolled.filter((id) => id !== courseId);
      } else {
        state.enrolled.push(courseId);
      }
    },
  },
});

export const { enrollCourse, unenrollCourse, toggleEnrollment } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
