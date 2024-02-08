const express = require("express");
const taskData = require("../task.json");
const Validator = require("./validators");
const taskRouter = express.Router();

const TASKS_KEY = "tasks";
const TASK_NOT_FOUND = "Task not found";


// validate task data
const validateTaskObject = (task) => {
  try {
    task.completed = task.hasOwnProperty("completed") ? task.completed : false;
    Validator.validateTaskInfo(task);
    return { task: task, status: true };
  } catch (error) {
    return { error: error.message, status: false };
  }
};

// get task by id
const getTaskObject = (taskId) => {
  let filteredTasks = taskData[TASKS_KEY].filter((task) => task.id == taskId);
  if (filteredTasks.length == 0) return null;
  return filteredTasks[0];
};

// filter tasks based on query parameters
// NOTE: Took help from TabNine (AI Tool)
const filterTasks = (tasks, query) => {
    if (query.priority) {
      tasks = tasks.filter((task) => task.priority === query.priority);
    }
    if (query.sortBy) {
      tasks = tasks.sort((a, b) => {
        if (a[query.sortBy] < b[query.sortBy]) return -1;
        if (a[query.sortBy] > b[query.sortBy]) return 1;
        return 0;
      });
    }
    return tasks;
  };

taskRouter.get("", (req, res) => {
    const query = req.query;
    let tasks = taskData[TASKS_KEY];
    tasks = filterTasks(tasks, query);
    if (tasks.length === 0)
        return res.status(404).send({ error: TASK_NOT_FOUND });
    return res.status(200).send(tasks);
});

taskRouter.post("", (req, res) => {
  const { task, error, status } = validateTaskObject(req.body);
  if (!status) return res.status(400).send({ error: error });
  const lengthOfData = taskData[TASKS_KEY].length;
  task.id = lengthOfData;
  taskData[TASKS_KEY].push(task);
  res.status(201).send(task);
});

taskRouter.get("/:id", (req, res) => {
  let task = getTaskObject(req.params.id);
  if (!task) return res.status(404).send({ error: TASK_NOT_FOUND });
  return res.status(200).send(task);
});

taskRouter.put("/:id", (req, res) => {
  let outdatedTask = getTaskObject(req.params.id);
  if (!outdatedTask) return res.status(404).send({ error: TASK_NOT_FOUND });
  const { task, error, status } = validateTaskObject(req.body);
  if (!status) return res.status(400).send({ error: error });
  outdatedTask = task;
  res.status(200).send(outdatedTask);
});

taskRouter.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  let task = getTaskObject(taskId);
  if (!task) return res.status(404).send({ error: TASK_NOT_FOUND });
  const index = taskData[TASKS_KEY].indexOf(task);
  taskData[TASKS_KEY].splice(index, 1);
  res.status(200).send({});
});

taskRouter.get("/priority/:level", (req, res) => {
    const level = req.params.level;
    let tasks = taskData[TASKS_KEY].filter((task) => task.priority === level);
    return res.status(200).send(tasks);
  });

module.exports = taskRouter;
