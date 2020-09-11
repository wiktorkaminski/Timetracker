class ApiService {
    constructor() {
        this.key = "7086ac35-3824-4ae0-aeae-0be25d3683a0";
        this.url = "https://todo-api.coderslab.pl"
    }

    getTasks(successCallbackFn, errorCallbackFn) {
        fetch(this.url + "/api/tasks",
            {
                headers: {Authorization: this.key},
                method: "GET",
            }).then(function (response) {
            return response.json();
        }).then((responseData) => {
            if (typeof successCallbackFn === "function") {
                const tasksToProcess = responseData.data;
                const tasks = [];
                tasksToProcess.forEach(element => {
                    tasks.push(this.createTaskFromResponseData(element));
                });
                successCallbackFn(tasks);
            }
        }).catch((error) => {
            if (typeof errorCallbackFn === "function") {
                errorCallbackFn(error);
            }
        });
    }

    saveTask(task, successCallbackFn, errorCallbackfn) {
        fetch(this.url + "/api/tasks",
            {
                headers: {Authorization: this.key, "Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(task)
            }
        ).then(response => {
            return response.json();
        }).then(responseData => {
            console.log(responseData);
            if (typeof successCallbackFn === "function") {
                const newTask = this.createTaskFromResponseData(responseData.data);
                successCallbackFn(newTask);
            }
        }).catch(error => {
            if (typeof errorCallbackfn === "function") {
                errorCallbackfn(error);
            }
        });
    }

    modifyTask(task, successCallbackFn, errorCallbackFn) {
        fetch(this.url + "/api/tasks/" + task.id,
            {
                headers: {Authorization: this.key, "Content-type": "application/json"},
                method: "PUT",
                body: JSON.stringify(task)
            }).then(response => response.json()).then(
            responseData => {
                if (typeof successCallbackFn === "function") {
                    successCallbackFn(responseData);
                }
            }
        ).catch(error => errorCallbackFn(error));
    }

    deleteTask (taskId, successCallbackFn, errorCallbackFn) {
        fetch(this.url + "/api/tasks/" + taskId,
            {headers: {Authorisation: this.key, "Content-Type": "application/json"}, method: "DELETE"})
            .then(response => response.json())
            .then(responseData => successCallbackFn(responseData))
            .catch(error => {
                if (typeof errorCallbackFn === "function") {
                    errorCallbackFn(error);
                }
            })
    }

    getTaskWithOperations(taskId, successCallbackFn, errorCallbackFn) {
        fetch(this.url + "/api/tasks/" + taskId + "/operations",
            {headers: {Authorization: this.key, "Content-type": "application/json"}, method: "GET"})
            .then(response => response.json())
            .then(responseData => console.log(responseData))
            .catch(error => {
                if (typeof errorCallbackFn === "function") {
                    errorCallbackFn(error);
                }}
    )}

    createTaskFromResponseData(data) {
        if (data.id) {
            const task = new Task(data.title, data.description, data.status);
            if (data.id) {
                task.id = data.id;
            }
            return task;
        }
    }
}