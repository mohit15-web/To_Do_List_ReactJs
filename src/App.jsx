import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);

  const [labelValue, setLabelValue] = useState("");

  const [taskValue, setTaskValue] = useState("");

  const [showModal, setModal] = useState(false);

  const[filteredTaskList,setFilteredTaskList] = useState([])


  const createTask = () => {
    if (taskValue.trim() !== "") {
      setTaskList([
        ...taskList,
        {
          label: labelValue,
          task: taskValue,
          isCompleted: false,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        },
      ]);
    }
    toggleModal();
    setLabelValue("");
    setTaskValue("");
  };

  const labelInputValue = (e) => {
    setLabelValue(e.target.value);
    console.log(e.target.value);
  };
  const taskInputValue = (e) => {
    setTaskValue(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    setTaskList(
      localStorage.getItem("taskList")
        ? JSON.parse(localStorage.getItem("taskList"))
        : []
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleDelete = (index) => {
    let filteredArr = taskList.filter((item, idx) => {
      return idx !== index;
    });
    setTaskList(filteredArr);
  };

  const handleComplete = (index) => {
    let filteredArr = taskList.map((item, id) => {
      if (index === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTaskList(filteredArr);
  };

  const toggleModal = () => {
    setModal(!showModal);
  };

  return (
    <div className="flex">
      <Sidebar toggleModal={toggleModal} setTaskList={setTaskList}
      taskList={taskList}
      />{" "}
      <div className="p-10">
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          createTask={createTask}
          taskInputValue={taskInputValue}
          labelInputValue={labelInputValue}
          labelValue={labelValue}
          taskValue={taskValue}
          setFilteredTaskList={setFilteredTaskList}
        />
        {/* <button
          className="addnew-button bg-blue-500 text-white rounded-md "
          onClick={toggleModal}
        >
          New task
        </button> */}

        <div id="DisplayContainer " className="mt-[20px]">
          <h1 className="text-xl font-bold ">Today </h1>
          <h1 className="mt-4 text-lg font-semibold mb-4">My Projects</h1>
          {taskList.map((task, index) => (
            <div
              key={index}
              className={`
              flex  py-6 border-b-2 border-t-2 text-lg`}
            >
              {index + 1}. Label: {task.label} || task: {task.task} || date:{" "}
              {task.date} || time:{task.time}
              <button onClick={() => handleDelete(index)}>❌</button>
              <button
                onClick={() => handleComplete(index)}
                className="px-3 mx-1 bg-black text-white"
              >
                Done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
