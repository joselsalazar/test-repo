// Grab the news articles as a json
$.getJSON("/news", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

// **************Whenever someone clicks delete comment button tag****************************
$(document).on("click", "#deletecomment", function() {
  // Empty the comments from the comment section
  $("#comments").empty();

  })

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the comments from the comment section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the news article
  $.ajax({
    method: "GET",
    url: "/news/" + thisId
  })
    // With that done, add the comments information to the page
    .done(function(data) {
      console.log(data);
      // The title of the News article
      $("#comments").append("<h3>" + data.title + "</h3>");
      // A textarea to add a new comment body
      $("#comments").append("<textarea id='bodyinput' name='body' id='comment'></textarea><br>");
      // container for comments to pop up after being submitted
      $("#container").append("<container id='comments' name='CommentBody'></container><br>");
      // A button to submit a new comment, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
       // A button to delete comment, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='deletecomment'>Delete Comment </button>");


      // If there's a comment in the article
      if (data.comment) {
        // Place the title of the comment in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the comment in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
});

// When you click the savecomment button
$(document).on("click", "#savecomment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/news/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from the comments textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the comments section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for comment entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
