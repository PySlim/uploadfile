import {app} from "./app";
import {pool} from "./database/database";
import {ConstantsModule} from "./constants/constants";

const gracefulShutdown =()=>{
    pool.end(()=>{
        console.log("\nApplication ended gracefully");
        process.exit(0);
    })
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.listen(ConstantsModule.PORT,()=> console.log(`Listening in port: ${ConstantsModule.PORT}`));



