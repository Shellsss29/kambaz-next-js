import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
  _id?: string;
  name: string;
  description?: string;
  module: string;
}

export interface Module {
  _id?: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },

    addModule: (state, action: PayloadAction<Module>) => {
      const newModule: Module = {
        _id: uuidv4(),
        ...action.payload,
      };
      state.modules.push(newModule);
    },

    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    updateModule: (state, action: PayloadAction<Module>) => {
      const updated = action.payload;
      const idx = state.modules.findIndex((m) => m._id === updated._id);
      if (idx !== -1) state.modules[idx] = updated;
    },

    editModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      const idx = state.modules.findIndex((m) => m._id === moduleId);
      if (idx !== -1) state.modules[idx].editing = true;
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
