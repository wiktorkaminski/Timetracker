class DomElements {
    constructor() {
        this.appElement = document.querySelector(".todo-app");
        this.apiService = new ApiService();

        //initial load at app startup
        this.loadAll();

        this.addEventToNewTaskForm();
        this.addEventToShowNewOperationForm();
        this.addEventToSubmitNewOperation();
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
        let operationElement = document.createElement("li");
        operationElement.classList.add("list-group-item", "task-operation");
        operationElement.dataset.id = operation.id;
        operationElement.innerText = operation.description;

        let addTimeButton = document.createElement("a");
        addTimeButton.classList.add("btn", "btn-primary", "float-right");
        addTimeButton.innerText = "Add time manually";
        this.addEventToShowTimeInput(addTimeButton);
        operationElement.appendChild(addTimeButton);

        taskRelatedToOperation.appendChild(operationElement);
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

    addEventToShowNewOperationForm() {
        document.querySelector("div.todo-app").addEventListener("click", (e) => {
                if (e.target.classList.contains("add-operation")) {
                    e.preventDefault();
                    let currentEl = e.target;

                    let newLi = document.createElement("li");
                    newLi.classList.add("list-group-item", "task-operation");

                    let newOperationForm = document.createElement("form");
                    newOperationForm.classList.add("form-group");

                    let inputField = document.createElement("input");
                    inputField.classList.add("form-control")
                    inputField.type = "text";
                    inputField.name = "description";
                    inputField.placeholder = "Operation description";
                    newOperationForm.appendChild(inputField);

                    let button = document.createElement("input");
                    button.classList.add("btn", "btn-primary", "add-time-manually");
                    button.type = "submit";
                    button.value = "Add";
                    newOperationForm.appendChild(button);

                    newLi.appendChild(newOperationForm);

                    let taskUl = currentEl.parentElement.parentElement;
                    if (taskUl.children.length === 1) {
                        taskUl.appendChild(newLi);
                    } else {
                        taskUl.insertBefore(newLi, taskUl.children[1]);
                    }
                }
            }
        );
    }

    removeOperationForm(formElement) {
        let taskUl = formElement.parentElement;
        taskUl.removeChild(formElement);
    }

    addEventToSubmitNewOperation() {
        document.querySelector("div.todo-app").addEventListener("click", e => {
            if (e.target.parentElement.classList.contains("form-group")
                &&
                e.target.classList.contains("btn")) {
                e.preventDefault();
                let currentElement = e.target;
                let description = e.target.previousElementSibling.value;

                let taskId = currentElement.parentElement.parentElement.parentElement.parentElement.dataset.id;
                let taskUl = currentElement.parentElement.parentElement.parentElement;
                // console.log(taskId)
                let operation = new Operation(description);

                this.apiService.saveTaskOperation(taskId, operation,
                    operation => {
                    this.createOperationElement(operation, taskUl)
                    this.removeOperationForm(currentElement.parentElement.parentElement);
                    },
                    error => console.log(error)
                );
            }
        })
    }

    addEventToShowTimeInput(button) {
        button.addEventListener("click", e => {
            e.stopPropagation();

            let elementLi = button.parentElement;

            elementLi.removeChild(button);
            let saveTimeButton = document.createElement("a");
            saveTimeButton.classList.add("btn", "btn-primary", "float-right");
            saveTimeButton.innerText = "Save";
            elementLi.appendChild(saveTimeButton);

            this.addEventToSaveTimeInOperation(saveTimeButton);
            let timeInput = document.createElement("input");
            timeInput.classList.add("float-right");
            timeInput.type = "text";
            timeInput.name = "time";
            timeInput.placeholder = "Type in spend time";
            elementLi.appendChild(timeInput);
        })

    }

    addEventToSaveTimeInOperation(saveTimeButton) {
        saveTimeButton.addEventListener("click", e => {
            e.stopPropagation();
            let elementLi = saveTimeButton.parentElement;
            let timeToAdd = saveTimeButton.nextElementSibling.value === "" ? 0 : Number(saveTimeButton.nextElementSibling.value);

            this.apiService.getOperation(elementLi.dataset.id,
                operation => {
                    operation.timeSpent += timeToAdd;
                    this.apiService.modifyOperation(operaton);
                },
                error => console.log(error)
            );

            elementLi.removeChild(saveTimeButton.nextElementSibling);
            elementLi.removeChild(saveTimeButton);

            let addTimeButton = document.createElement("a");
            addTimeButton.classList.add("btn", "btn-primary", "float-right");
            addTimeButton.innerText = "Add time manually";
            elementLi.appendChild(addTimeButton);
            this.addEventToShowTimeInput(addTimeButton);

        });
    }


}
