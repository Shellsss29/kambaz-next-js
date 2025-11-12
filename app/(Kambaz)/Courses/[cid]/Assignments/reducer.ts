import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id?: string;
  title: string;
  course: string | string[] | undefined;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      const newAssignment = { ...action.payload, _id: uuidv4() };
      state.assignments.push(newAssignment);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const updated = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
