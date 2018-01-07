// -------------------------- Libraries
// load jquery
const $ = require("jquery");

// -------------------------- Plugins
// plugin for html5 drag and drop sorting
const sortable = require("sortablejs");

const theList = $("#todo-list");
const sortContainer = document.getElementById("todo-list"); // this is a dupe of the above. should consolidate
const theInput = $("#toDoItem");
const clearBtn = $("#clear-all");
var sortIt = sortable.create(sortContainer);
var hasAlert = false;

function checkListInput() {
  var inputValLength = theInput.val().length;
  return inputValLength;
}

function buildListItem() {
  var inputText = $(theInput).val();
  var buildItem = `<li><span class="handle">::</span> &nbsp; ${inputText} &nbsp; <span class="removeListItem">x</span></li>`;
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

// click event for removing list item
var removeItem = $(theList).click(function(e) {
  var target = $(e.target);
  if (target.is("li span.removeListItem")) {
    target.parent().remove();
  }
});

// click event for clear all list
var clearList = $(clearBtn).click(function(e) {
  e.preventDefault();
  if (checkListInput() === 0 && hasAlert === true) {
    clearBtn.addClass("hide");
    theList.children().remove();
    $("#input-alert").remove();
    hasAlert = false;
  } else {
    clearBtn.addClass("hide");
    theList.children().remove();
  }
});

exports.addItemEvent = addItemEvent;
exports.removeItem = removeItem;
exports.clearList = clearList;

