// -------------------------- Libraries
// load jquery
const $ = require("jquery");

// -------------------------- Plugins
const sortable = require("sortablejs"); // plugin for html5 drag and drop sorting

// -------------------------- Variables
const theList = $("#todo-list");
const sortContainer = document.getElementById("todo-list"); // this is a dupe of the above. should consolidate
const theInput = $("#toDoItem");
const clearBtn = $("#clear-all");
var hasAlert = false;

// initiate the sortable plugin
var sortIt = sortable.create(sortContainer, {
  onEnd: function (evt) {
    localStorage.setItem("savedList", theList.html());
  },
});

// Check to see if anything has been typed into the input field
function checkListInput() {
  var inputValLength = theInput.val().length;
  return inputValLength;
}

function buildListItem() {
  var inputText = $(theInput).val();
  var buildItem = `<li><span class="handle">::</span> &nbsp; <input type="text" value="${inputText}"> &nbsp; <span class="removeListItem">x</span></li>`;
  theList.append(buildItem);
  theInput.val("");
}

// click event for adding new items to the list
$("#addToDo").click(function(e){

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
  localStorage.setItem("savedList", theList.html());
});

// click event for removing list item
$(theList).click(function(e) {
  var target = $(e.target);
  if (target.is("li span.removeListItem")) {
    target.parent().remove();
    localStorage.setItem("savedList", theList.html());
  }
});

// listener event for the editing list item inline
$(theList).focusout(function(e) {
  e.preventDefault();
  var target = $(e.target);
  var currentVal = target.val();
  if (target.is("input")) {
    target.attr("value", currentVal);
    localStorage.setItem("savedList", theList.html());
  }
});

// click event for the saveall button
$("#save-all").on("click", function(e) {
  e.preventDefault();
  localStorage.setItem("savedList", theList.html());
});

// click event for clear all list
$(clearBtn).click(function(e) {
  e.preventDefault();
  if (checkListInput() === 0 && hasAlert === true) {
    clearBtn.addClass("hide");
    theList.children().remove();
    $("#input-alert").remove();
    hasAlert = false;
  } else {
    clearBtn.addClass("hide");
    theList.children().remove();
    localStorage.setItem("savedList", theList.html());
  }
});

