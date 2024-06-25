import express, { Express } from "express" ;
import cors  from "cors" ;
import dotenv from "dotenv" ; 
import appointments from "./routes/appointments" ;
import email from "./routes/email" ;
import stats from "./routes/stats" ;

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/appointments", appointments);
app.use("/email", email);
app.use("/stats", stats);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})