import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://incorcadit:fNd34Rzw-@cluster0.mxwfj.gcp.mongodb.net/chat?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err: any) => {
    if (err) {
      throw Error(err);
    }
  }
);
