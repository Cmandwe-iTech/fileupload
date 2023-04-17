const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: { type: String, required: true },
  file: { type: String, reuired: true },
  user :{type:String, ref:"users"}
});

const Filemodel = mongoose.model("files", FileSchema);
module.exports = Filemodel;
