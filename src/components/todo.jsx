import { useState } from "react";
import { FunnelIcon } from "../icons/funnelIcon";
import { SearchIcon } from "../icons/searchIcon";
import { useTodoStore } from "../store/todoStore";
import { CloseIcon } from "../icons/closeIcon";

export const Todo = () => {
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "School" },
    { id: 4, name: "Shopping " },
    { id: 5, name: "Health" },
  ];

  const priorities = [
    {
      id: 1,
      name: "high",
      textColor: "text-red-500",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
    },
    {
      id: 2,
      name: "medium",
      textColor: "text-orange-500",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
    {
      id: 3,
      name: "low",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
    },
  ];

  const [input, setInput] = useState("");
  const {
    list,
    addList,
    deleteList,
    toggleTodo,
    setSearchTerm,
    searchTerm,
    selectCategory,
    setSelectCategory,
  } = useTodoStore();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const displayList = list
    .filter((item) =>
      selectCategory === "all" ? true : item.category === selectCategory,
    )
    .filter((item) =>
      item.input.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  return (
    <div className="box-border bg-blue-50 min-h-screen flex px-4 pt-7 items-center flex-col">
      <div className="mb-8">
        <h1 className="text-blue-700 text-[35px] font-bold">My Todo App</h1>
        <p className="text-[15px] text-center text-gray-500">
          Stay organized and productive
        </p>
      </div>

      {/* INPUT BOX */}
      <div className="w-full md:max-w-200 bg-white md:p-5 py-4 px-3 rounded-2xl border border-gray-200">
        <div className="flex items-center md:gap-3 gap-2">
          <input
            required
            type="text"
            placeholder="Add a new task...."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="border-0 w-full py-1 px-2 md:py-2 md:px-4 rounded-sm bg-gray-100 outline-0 text-[16px] md:text-[12px]"
          />

          <button
            className="text-center whitespace-nowrap px-3 py-1 md:px-5 md:py-2 bg-gray-400 rounded-sm text-[13px] text-white"
            onClick={() => {
              addList(input, selectedCategory, selectedPriority);
              setInput("");
            }}
          >
            <span className="md:mr-2">+</span> Add
          </button>
        </div>

        {/* CATEGORY + PRIORITY */}
        <div className="mt-4 flex items-center gap-x-6 md:gap-x-4 text-[12px] md:text-[14px]">
          <div className="flex items-center gap-1">
            <span>Category</span>
            <select
              className="appearance-none border border-gray-200 rounded-sm outline-0 md:p-1.5 p-1 "
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span>Priority</span>
            <select
              className="appearance-none border border-gray-200 rounded-sm outline-0 md:p-1.5 p-1"
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">Select priority</option>
              {priorities.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full  md:max-w-200 bg-transparent mt-6 md:mt-8 ">
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search task...."
              className="border-0 w-full py-1 pl-8 pr-2 md:py-2 md:pl-10 md:pr-4 rounded-sm bg-gray-200 outline-0 text-[16px] md:text-[12px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <SearchIcon />
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FunnelIcon />
            <select
              className="appearance-none border border-gray-200 rounded-sm outline-0 py-1.5 px-1.5 md:py-2 md:px-3  bg-white text-[12px] md:text-[14px]"
              onChange={(event) => setSelectCategory(event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className="w-full md:max-w-200 mt-8">
        {displayList.map((item) => {
          const priorityObj = priorities.find((p) => p.name === item.priority);
          return (
            <div
              key={item.id}
              className="bg-white p-4 md:p-5 rounded-2xl mb-4 flex justify-between items-center border border-gray-200"
            >
              <div className="flex items-center gap-3 md:gap-2">
                <input
                  type="checkbox"
                  className="accent-gray-500 w-4 h-4"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                />
                <div>
                  <h1
                    className={`${
                      item.completed ? "line-through text-gray-400" : ""
                    } mb-1`}
                  >
                    {item.input}
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="md:px-3 px-2 py-0.5 border border-gray-200 rounded-lg outline-0 flex items-center">
                      <p className="text-[12px]">{item.category}</p>
                    </div>
                    <div
                      className={`${priorityObj?.textColor} ${priorityObj?.bgColor} ${priorityObj?.borderColor} md:px-3 px-2 py-0.5 border border-gray-200 rounded-lg outline-0 flex items-center `}
                    >
                      <p className="text-[12px]">{item.priority}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => deleteList(item.id)}>
                <CloseIcon />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
