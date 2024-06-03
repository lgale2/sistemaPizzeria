import app from "./app.js";
import { connectionDB } from "./config/db.js";

connectionDB();
app.listen(3000);
console.log("Server on port", 3000);
