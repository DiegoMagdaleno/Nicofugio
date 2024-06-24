import express, { Express } from "express" ;
import cors  from "cors" ;
import dotenv from "dotenv" ; 

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})