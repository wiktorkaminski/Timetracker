class DomElements {
    constructor() {
        this.appElement = document.querySelector(".todo-app");
        this.apiService = new ApiService();

        //initial load at app statrup
        this.loadAll();

        this.addEventToNewTaskForm();
        this.addEventToShowOperationsInTask();
    }

    createTaskElement(task) {
        let taskSectionEl = document.createElement("section");
        taskSectionEl.classList.add("task");
        taskSectionEl.dataset.id = task.id;

        let taskHeaderEl = document.createElement("h2");
        taskHeaderEl.innerText = task.title;
        taskSectionEl.appendChild(taskHeaderEl);

        let taskList = document.createElement("ul");
        taskList.classList.add("list-group", "todo");
        taskSectionEl.appendChild(taskList);

        let taskListItem = document.createElement("li");
        taskListItem.classList.add("list-group-item", "active", "task-description");
        taskListItem.innerText = task.description;
        taskList.appendChild(taskListItem);

        if (task.status === "open") {
            let finishBtn = document.createElement("a");
            finishBtn.classList.add("btn", "btn-secondary", "float-right", "close-task");
            finishBtn.innerText = "Finish";
            taskListItem.appendChild(finishBtn);

            let addOperationBtn = document.createElement("a");
            addOperationBtn.classList.add("btn", "btn-secondary", "float-right", "add-operation");
            addOperationBtn.innerText = "Add operation";
            taskListItem.appendChild(addOperationBtn);
        }

        this.appElement.appendChild(taskSectionEl);
    }

    createOperationElement(operation, taskRelatedToOperation) {
        let operationElement = document.createElement("div");
        operationElement.classList.add("list-group-item", "task-operation");
        operationElement.dataset.id = operation.id;
        operationElement.innerText = operation.description;
        taskRelatedToOperation.appendChild(operationElement);
    }

    addEventToShowOperationsInTask() {
        let allTasks = document.querySelectorAll(".task");
        console.log(allTasks);
        allTasks.forEach(task => addEventListener("click", e => {
            let taskId = e.currentTarget.dataset.id;
            let taskUl = e.currentTarget.querySelector(".list-group.todo")
            console.log("Target task id = " + taskId);
            this.apiService.getTaskOperations(taskId,
                operations => {
                    operations.forEach(operation => this.createOperationElement(operation, taskUl))
                },
                error => console.log(error)
            );
        }));
        console.log("addEventToShowOperationsInTask() - done")
    }

    loadAll() {
        this.apiService.getTasks(
            allTasks => {
                for (let i = 0; i < allTasks.length; i++) {
                    this.createTaskElement(allTasks[i]);
                }
            },
            error => console.log(error)
        );
        console.log("loadAll done")
    }

    addEventToNewTaskForm() {
        let newTaskForm = document.querySelector("form.new-task");
        newTaskForm.addEventListener("submit", e => {
            e.preventDefault();
            let newTaskTitle = e.currentTarget.querySelector("input[name=title]");
            let newTaskDescription = e.currentTarget.querySelector("input[name=description]");
            let newTask = new Task(newTaskTitle.value, newTaskDescription.value, "open");

            this.apiService.saveTask(newTask, savedTask => {
                    this.createTaskElement(savedTask);
                    newTaskTitle.value = "";
                    newTaskDescription.value = ""
                },
                error => console.log(error)
            );
        });
        console.log("addEventToNewTaskForm() - done")
    }

}