document.addEventListener("DOMContentLoaded", function () {
    new DomElements();
});

let api = new ApiService();
api.getOperation("405219d2-bbd8-471b-8375-a9c76c8d01f7",
    o => console.log(o),
    e => console.log(e));