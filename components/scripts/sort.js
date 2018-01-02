// -------------------------- Libraries
// load jquery
const $ = require("jquery");

// -------------------------- Plugins
// jquery plugin for html5 drag and drop sorting
const sortable = require("sortablejs");

var theList = $("#todo-list");
var theInput = $("#toDoItem");
var hasAlert = false;
const clearBtn = $("#clear-all");

function checkListInput() {
  var inputValLength = theInput.val().length;
  return inputValLength;
}

function buildListItem() {
  var inputText = $(theInput).val();
  var buildItem = `<li>${inputText}</li>`;
  theList.append(buildItem);
  theInput.val("");
}

// click event for adding new items to the list
var addItemEvent = $("#addToDo").click(function(e){

  e.preventDefault();
  var listLength = $(theList).children().length;

  if (checkListInput() > 0 && hasAlert === true) {
    $("#input-alert").remove();
    buildListItem();
    clearBtn.removeClass("hide");
    hasAlert = false;
  } else if (checkListInput() === 0 && hasAlert === true) {
    hasAlert = true;
    $("#input-alert").text("Sorry mate, try again.");
  } else if (checkListInput() > 0) {
    buildListItem();
    clearBtn.removeClass("hide");
  } else {
    hasAlert = true;
    $("#listForm").append("<p id=input-alert>Please add your todo to the input field above.</p>");
  }

});

// click event for clear all list
var clearList = $(clearBtn).click(function(e) {
  e.preventDefault();
  clearBtn.addClass("hide");
  theList.children().remove();
});

exports.addItemEvent = addItemEvent;
exports.clearList = clearList;

