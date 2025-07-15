const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
console.log("Connecting to url");
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to the mongo");
  })
  .catch((error) => {
    console.log("Damn, better luck next time", error.message);
  });

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{6,}$/.test(v);
      },
      message: (props) => `${props.value} is not valid unfortunately`,
    },
    minLength: 8,
  },
});

entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", entrySchema);
