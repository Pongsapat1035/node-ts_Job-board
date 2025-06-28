import express from "express"
import bodyParser from "body-parser"
import authRoute from './routes/auth.route'
import adminRoute from './routes/admin.route'
import companyRoute from './routes/company.route'
import userRoute from './routes/user.route'
import { checkAuth } from "./middleware/checkAuth"
import { errorHanler } from "./middleware/errorHanler"
import cookieParser from 'cookie-parser'

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next();
  }
  checkAuth(req, res, next);
});

app.use("/auth", authRoute)
app.use("/admin", adminRoute)
app.use("/company", companyRoute)
app.use("/user", userRoute)

app.use(errorHanler)

export default app;