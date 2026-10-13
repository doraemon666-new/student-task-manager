const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = [];

function renderTasks() {
  list.replaceChildren();

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.done ? "done" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Complete task");

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.name;

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
    });

    item.append(checkbox, text, remove);
    list.append(item);
  });

  document.getElementById("total").textContent = tasks.length;
  document.getElementById("pending").textContent =
    tasks.filter((t) => !t.done).length;
  document.getElementById("completed").textContent =
    tasks.filter((t) => t.done).length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = input.value.trim();
  if (!name) return;

  tasks.push({
    id: Date.now() + Math.random(),
    name,
    done: false
  });

  input.value = "";
  renderTasks();
});

renderTasks();