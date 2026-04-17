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
  ];

  const priorities = [
    { id: 1, name: "high", textColor: "text-red-500", bgColor: "bg-red-100" },
    {
      id: 2,
      name: "medium",
      textColor: "text-orange-500",
      bgColor: "bg-yellow-100",
    },
    {
      id: 3,
      name: "low",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
  ];

  const { list, addList, deleteList } = useTodoStore();

  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  // const selectedPriorityObj = priorities.find(
  //   (item) => item.name === selectedPriority,
  // );

  return (
    <div className="bg-blue-50 min-h-screen flex pt-7 items-center flex-col">
      <div className="mb-8">
        <h1 className="text-blue-700 text-[35px] font-bold">My Todo App</h1>
        <p className="text-[15px] text-center text-gray-500">
          Stay organized and productive
        </p>
      </div>

      {/* INPUT BOX */}
      <div className="w-full max-w-200 bg-white p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <input
            required
            type="text"
            placeholder="Add a new task...."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="border-0 w-full py-2 px-4 rounded-sm bg-gray-100 outline-0 text-[16px] md:text-[12px]"
          />

          <button
            className="text-center whitespace-nowrap px-5 py-2 bg-gray-400 rounded-sm text-[13px] text-white"
            onClick={() => {
              addList(input, selectedCategory, selectedPriority);
              setInput("");
            }}
          >
            <span className="mr-2">+</span> Add
          </button>
        </div>

        {/* CATEGORY + PRIORITY */}
        <div className="mt-4 flex items-center gap-x-4 text-[14px]">
          <div className="flex items-center gap-1">
            <span>Category</span>
            <select
              className="border border-gray-200 rounded-sm outline-0 p-1.5"
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
              className="border border-gray-200 rounded-sm outline-0 p-1.5"
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
      <div className="w-full max-w-200 bg-transparent mt-8 ">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="relative w-full">
            {" "}
            <input
              type="text"
              placeholder="Search task...."
              className="border-0 w-full py-2 pl-10 pr-4 rounded-sm bg-gray-200 outline-0 text-[16px] md:text-[12px]"
            />{" "}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {" "}
              <SearchIcon />{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-1">
            {" "}
            <FunnelIcon />{" "}
            <select className="border border-gray-200 rounded-sm outline-0 p-1.5 bg-white text-[14px]">
              {" "}
              <option>All categories</option>{" "}
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {" "}
                  {item.name}{" "}
                </option>
              ))}{" "}
            </select>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      {/* LIST */}
      <div className="w-full max-w-200 mt-8">
        {list.map((item) => {
          const priorityObj = priorities.find((p) => p.name === item.priority);

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl mb-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-gray-500 w-4 h-4" />

                <div>
                  <h1>{item.input}</h1>

                  <div className="flex items-center gap-3">
                    <p>{item.category}</p>

                    <p
                      className={`${priorityObj?.textColor} ${priorityObj?.bgColor}`}
                    >
                      {item.priority}
                    </p>
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
