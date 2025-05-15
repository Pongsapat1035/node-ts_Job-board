import express from "express"
import bodyParser from "body-parser"
import authRoute from './routes/auth.route'
import adminRoute from './routes/admin.route'
import companyRoute from './routes/company.route'
import { checkAuth } from "./middleware/middleware"

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next();
  }
  checkAuth(req, res, next);
});

app.use("/auth", authRoute)
app.use("/admin", adminRoute)
app.use("/company", companyRoute)

export default app;