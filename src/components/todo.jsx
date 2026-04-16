import { FunnelIcon } from "../icons/funnelIcon";

export const Todo = () => {
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "School" },
  ];
  return (
    <div className="bg-blue-50 flex pt-7 items-center h-screen flex-col">
      <div className="mb-8">
        <h1 className="text-blue-700 text-[35px] font-bold">My Todo App</h1>
        <p className="text-[15px] text-center text-gray-500">
          Stay organized and productive
        </p>
      </div>
      <div className="w-full  max-w-200 bg-white p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Add a new task...."
            className="border-0 w-full py-2 px-4 rounded-sm bg-gray-100 outline-0 text-[16px] md:text-[12px]"
          />
          <button className="text-center whitespace-nowrap px-5 py-2  bg-gray-400 rounded-sm text-[13px] text-white">
            <span className="mr-2">+</span> Add
          </button>
        </div>
        <div className="mt-4 flex items-center gap-x-4 text-[14px]">
          <div className="flex items-center gap-1">
            <span>Category</span>
            <select className="border border-gray-200 rounded-sm outline-0 p-1.5">
              <option>Select category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1 ">
            <span>Priority</span>
            <select className="border border-gray-200 rounded-sm outline-0 p-1.5 ">
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full  max-w-200 bg-transparent  mt-8 ">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search task...."
            className="border-0 w-full py-2 px-4 rounded-sm bg-gray-100 outline-0 text-[16px] md:text-[12px]"
          />
          <div className="flex items-center gap-1">
            <FunnelIcon />
            <select className="border border-gray-200 rounded-sm outline-0 p-1.5 bg-white text-[14px]">
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
