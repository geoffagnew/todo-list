// -------------------------- Libraries
// load jquery
const $ = require("jquery");

// -------------------------- Plugins
// jquery plugin for html5 drag and drop sorting
const sortable = require("sortablejs");

var theList = $("#todo-list");
var theInput = $("#toDoItem");
var hasAlert = false;

function checkListInput(){
  var inputValLength = theInput.val().length;
  return inputValLength;
}

function buildListItem() {
  var inputText = $(theInput).val();
  var buildItem = "<li>" + inputText + "</li>";
  theList.append(buildItem);
  theInput.val("");
}

var addItemEvent = $("#addToDo").click(function(e){
  e.preventDefault();
  if (checkListInput() > 0 && hasAlert === true) {
    $("#input-alert").remove();
    buildListItem();
    hasAlert = false;
  } else if (checkListInput() === 0 && hasAlert === true) {
    hasAlert = true;
    $("#input-alert").text("Sorry mate, try again.");
  } else if (checkListInput() > 0) {
    buildListItem();
  } else {
    hasAlert = true;
    $("#listForm").append("<p id=input-alert>Please add your todo to the input field above.</p>");
  }
});

exports.addItemEvent = addItemEvent;

