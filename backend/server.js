import config from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/dbConnection.js";

const startServer = async () => {
  const PORT = config.port;
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
