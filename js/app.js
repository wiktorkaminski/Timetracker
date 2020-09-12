const apiService = new ApiService();

// apiService.getTasks(function (toPrintSucc) {
//     console.log(toPrintSucc)
// }, function (toPrintErr) {
//     console.log(toPrintErr)
// });
// let tempTask = new Task("Modified Title", "Modified description...", "open");
//
// tempTask.id = "94582ec6-b07c-4153-8dd7-49020b07ffa3"

// apiService.modifyTask(tempTask,
//     function (succ) {
//         console.log(succ);
//     },
//     function (error) {
//         console.log(error);
//     });

// apiService.deleteTask(tempTask,
//     function (succ) {
//         console.log(succ)
//     },
//     function (error) {
//         console.log(error);
//     });
//
// let operation1 = new Operation("Zrobić jajecznicę z grzybami", 20);
// let operation2 = new Operation("Wyspać się", 420);
//
// apiService.saveTaskOperation(tempTask.id, operation1, function (succ) {
//         console.log(succ)
//     },
//     function (error) {
//         console.log(error);
//     });
//
// apiService.saveTaskOperation(tempTask.id, operation2, function (succ) {
//         console.log(succ)
//     },
//     function (error) {
//         console.log(error);
//     });
//
// apiService.getTaskOperations(tempTask.id,  function (succ) {
//         console.log(succ)
//     },
//     function (error) {
//         console.log(error);
//     });
//
//
// let operation = new Operation();
// operation.id = "6742b827-61fa-495b-8c7d-bb242218a806"
// operation.description = "Zmieniony opis operacji";
// operation.timeSpent = 999;
//
// apiService.modifyOperation(operation);

const pr = function p(x) {
    console.log(x);
}

const pr2 = function p(x) {
    console.log(x);
}

// apiService.getOperation("6742b827-61fa-495b-8c7d-bb242218a806",
//     function (succ) {
//         console.log(succ);
//     },
//     function (error) {
//         console.log(error);
//     })

apiService.getTasks(pr, pr2);
apiService.getTaskOperations("12112693-e9fa-45c5-b0ca-2fdba5e405be", pr, pr2);
apiService.deleteTask("12112693-e9fa-45c5-b0ca-2fdba5e405be", pr, pr2);
apiService.getTasks(pr, pr2);
// apiService.getTaskOperations("94582ec6-b07c-4153-8dd7-49020b07ffa3", pr, pr2);
// apiService.deleteOperation("f1bfbf6f-2aae-4028-ae4e-e5c292be86c4");
// apiService.deleteTask("94582ec6-b07c-4153-8dd7-49020b07ffa3", pr, pr2);
// apiService.getTasks(pr, pr2);



