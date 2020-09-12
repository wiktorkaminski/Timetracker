class DomElements {
    constructor() {
        this.appElement = document.querySelector(".todo-app");
        this.apiService = new ApiService();

        //initial load at app statrup
        this.loadAll();

        this.addEventToNewTaskForm();
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
        this.addEventToShowOperationsInTask(taskSectionEl)
    }

    createOperationElement(operation, taskRelatedToOperation) {
        let operationElement = document.createElement("div");
        operationElement.classList.add("list-group-item", "task-operation");
        operationElement.dataset.id = operation.id;
        operationElement.innerText = operation.description;
        taskRelatedToOperation.appendChild(operationElement);
    }

    addEventToShowOperationsInTask(taskElement) {
        let h2Element = taskElement.firstElementChild;
        let ulElement = taskElement.querySelector("ul");
        let taskId = taskElement.dataset.id;

        h2Element.addEventListener("click", e => {
            if (!h2Element.dataset.operationsLoaded) {
                this.apiService.getTaskOperations(taskId,
                    operations => {
                        operations.forEach(operation => this.createOperationElement(operation, ulElement));
                        h2Element.dataset.operationsLoaded = "true"
                    },
                    error => console.log(error)
                );
            }
        });


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