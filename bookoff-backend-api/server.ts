import app from "./src/app";
import { globalConfig } from "./constants/configs";
import { myDataSource } from "./src/databases/data_source";
const PORT = globalConfig.PORT;

/// Connect to SQL Server
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
