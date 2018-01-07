// ------------------------------------------- Libraries
// load jquery
const $ = require("jquery");

// ------------------------------------------- Imports
// js for drag and drop functionality
const sort = require("./sort");


$(document).ready(function(){

  // event for adding todos
  sort.addItemEvent;
  // event for removing todos
  sort.removeItem;
  // event for clearing list
  sort.clearList;

});
