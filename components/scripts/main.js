// ------------------------------------------- Libraries
// load jquery
const $ = require("jquery");


$(document).ready(function(){

  // ------------------------------------------- Imports
  // js for localStorage
  const loadToDo = require("./local-storage");
  // js for list management
  const listActions = require("./list-actions");

  // call function to check if existing list data has been saved
  loadToDo();

});
