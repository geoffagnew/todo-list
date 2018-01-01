// -------------------------- Libraries
// load jquery
const $ = require("jquery");

// -------------------------- Plugins
// jquery plugin for html5 drag and drop sorting
const sortable = require("sortablejs");

var newListItem;
var newList = true;
var theList = $("#todo-list");
var theInput = $("#toDoItem");

// checkInput function() {
//   // check if input has received text
// }

// buildListItem function (text) {
//   return "<li>" + text + "</li>";
// }

// event listener for adding new to-dos to list

$("#addToDo").click(function(e){
  e.preventDefault();
  var inputText = $(theInput).text();
  var buildListItem = "<li>" + inputText + "</li>";
  console.log(buildListItem);
});


// exports.theList = theList;


// module.exports = {
//     myBurger: function(favBurg) {
//       return "My favourite burg is the " + favBurg + "!";
//     },
//     myPizza: function(favZa) {
//       return "My favourite Za is the " + favZa + "!";
//     }
// }
