// load jquery
const $ = require("jquery");

// function to check if existing data has been saved in localStorage from previous visits
function loadToDo() {
  if (localStorage.getItem("savedList")) {
    $("#todo-list").html(localStorage.getItem("savedList"));
    $("#todo-list").addClass("has-items");
    $(".controls").removeClass("hide");
  }
};

module.exports = loadToDo;

