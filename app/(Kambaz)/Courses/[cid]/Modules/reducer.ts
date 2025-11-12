import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
  _id?: string;
  name: string;
  description: string;
  module: string;
}

export interface Module {
  _id?: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: modules as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<Module>) => {
      const moduleData = action.payload;
      const newModule: Module = {
        _id: uuidv4(),
        name: moduleData.name,
        description: moduleData.description,
        course: moduleData.course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },

    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    updateModule: (state, action: PayloadAction<Module>) => {
      const updated = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === updated._id ? updated : m
      );
    },

    editModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
