const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error to connect to DB");
  }
};

module.exports = {
  dbConnection,
};
