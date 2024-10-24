// app.ts
import express from "express";
import employeeRoutes from "./routes/employeeRoutes";
import employeeProfileRoutes from "./routes/employeeProfileRoutes";
import educationRoutes from "./routes/educationRoutes";
import employeeFamilyRoutes from "./routes/employeeFamilyRoutes";
import db from "./models";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/employee-profiles", employeeProfileRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/employee-families", employeeFamilyRoutes);

// Test database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });
