// function to check if existing data has been saved in localStorage from previous visits
exports.loadToDo = function() {
  if (localStorage.getItem("savedList")) {
    theList.html(localStorage.getItem("savedList"));
  }
};

