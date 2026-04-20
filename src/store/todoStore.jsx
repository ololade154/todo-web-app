import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useTodoStore = create(
  persist(
    (set) => ({
      list: [],
      filteredList: [],
      searchTerm: "",
      selectCategory: "all",

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

      toggleTodo: (id) =>
        set((state) => ({
          list: state.list.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item,
          ),
        })),
      setSearchTerm: (value) => set({ searchTerm: value }),
      setSelectCategory: (id) => set({ selectCategory: id }),
    }),

    {
      name: "todo-storage",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);
