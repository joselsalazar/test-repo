// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var NewsSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // Saves One Comment ObjectId, ref refers to the Comment model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Create the News model with the NewsSchema
var News = mongoose.model("News", NewsSchema);

// Export the news model
module.exports = News;