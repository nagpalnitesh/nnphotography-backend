const mongoose = require("mongoose");
var { Schema } = mongoose;

const photoScehma = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", photoScehma);
