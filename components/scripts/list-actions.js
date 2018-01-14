// -------------------------- Libraries
// load jquery
const $ = require("jquery");

// -------------------------- Plugins
// plugin for html5 drag and drop sorting
const sortable = require("sortablejs");
// load dom purify sanitizer
const DOMPurify = require("dompurify");

// -------------------------- Variables
const theList = $("#todo-list");
const sortContainer = document.getElementById("todo-list"); // this is a dupe of the above. should consolidate
const theInput = $("#toDoItem");
const $clearBtn = $("#clear-all");
const $saveBtn = $("#save-all");
const $controls = $(".controls");
var hasAlert = false;

// initiate the sortable plugin
var sortIt = sortable.create(sortContainer, {
  handle: ".handle",
  onEnd: function (evt) {
    localStorage.setItem("savedList", theList.html());
  },
});

// Check to see if anything has been typed into the input field
function checkListInput() {
  var inputValLength = theInput.val().length;
  return inputValLength;
}

// sanitize form input
function sanitizeInput(val) {
  var cleanInput = DOMPurify.sanitize(val, {SAFE_FOR_JQUERY: true});
  return cleanInput;
}

// sanitize input and build list item
function buildListItem() {
  var inputText = $(theInput).val();
  var cleanText = sanitizeInput(inputText);
  var buildItem = `<li><span class="handle">::</span><input class="item-content" type="text" value="${cleanText}"><span class="removeListItem">x</span></li>`;
  theList.append(buildItem);
  theInput.val("");
}

// click event for adding new items to the list
$("#addToDo").click(function(e){
  e.preventDefault();

  if (checkListInput() > 0 && hasAlert === true) {
    $("#input-alert").remove();
    buildListItem();
    $controls.removeClass("hide");
    theList.addClass("has-items");
    hasAlert = false;
  } else if (checkListInput() === 0 && hasAlert === true) {
    hasAlert = true;
    $("#input-alert").text("Sorry mate, try again.");
  } else if (checkListInput() > 0) {
    buildListItem();
    $controls.removeClass("hide");
    theList.addClass("has-items");
  } else {
    hasAlert = true;
    $("#listForm").append("<p id=input-alert>Please add your todo to the field above.</p>");
  }
  localStorage.setItem("savedList", theList.html());
});

// click event for removing list item
$(theList).click(function(e) {
  var target = $(e.target);
  var listLength = theList.children().length;
  if (target.is("li span.removeListItem") && listLength > 1) {
    target.parent().remove();
    localStorage.setItem("savedList", theList.html());
  } else if (target.is("li span.removeListItem") && listLength <= 1) {
    target.parent().remove();
    $controls.addClass("hide");
    theList.removeClass("has-items");
    localStorage.setItem("savedList", theList.html());
  }
});

// listener event for initiating list item editing
$(theList).focusin(function(e) {
  e.preventDefault();
  var target = $(e.target);
  target.parent().addClass("active-edit");
});

// listener event for completion of editing list item
$(theList).focusout(function(e) {
  e.preventDefault();
  var target = $(e.target);
  if (target.is(".item-content")) {
    var currentVal = target.val();
    var cleanText = sanitizeInput(currentVal);
    target.parent().removeClass("active-edit");
    target.attr("value", cleanText);
    localStorage.setItem("savedList", theList.html());
  }
});

// click event for the saveall button
$($saveBtn).on("click", function(e) {
  e.preventDefault();
  localStorage.setItem("savedList", theList.html());
});

// click event for clear all list
$($clearBtn).click(function(e) {
  e.preventDefault();
  if (checkListInput() === 0 && hasAlert === true) {
    $controls.addClass("hide");
    theList.children().remove();
    $("#input-alert").remove();
    hasAlert = false;
  } else {
    $controls.addClass("hide");
    theList.removeClass("has-items");
    theList.children().remove();
    localStorage.setItem("savedList", theList.html());
  }
});

