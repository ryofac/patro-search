import fs from "fs";
export class Utils {
    static loadConf() {
        const content = fs.readFileSync("./src/utils/params.json").toString();
        return JSON.parse(content);
    }
}
