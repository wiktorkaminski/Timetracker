const apiService = new ApiService();

// apiService.getTasks(function (toPrintSucc) {
//     console.log(toPrintSucc)
// }, function (toPrintErr) {
//     console.log(toPrintErr)
// });
let tempTask = new Task("Modified Title", "Modified description...", "open");

tempTask.id = "94582ec6-b07c-4153-8dd7-49020b07ffa3"

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

apiService.getTaskWithOperations(tempTask.id,  function (succ) {
        console.log(succ)
    },
    function (error) {
        console.log(error);
    });

apiService.getTasks(
    function (succ) {
        console.log(succ);
    },
    function (error) {
        console.log(error);
    });

