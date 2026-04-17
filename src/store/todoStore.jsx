import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useTodoStore = create(
  persist(
    (set) => ({
      list: [],

      addList: (input, category, priority) =>
        set((state) => ({
          list: [
            ...state.list,
            {
              id: uuidv4(),
              input,
              completed: false,
              category,
              priority,
            },
          ],
        })),

      deleteList: (id) =>
        set((state) => ({
          list: state.list.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "todo-storage",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);
