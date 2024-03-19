import fs from "fs";
export class Utils {
    static loadConf() {
        const content = fs.readFileSync("../data/params/params.json").toString();
        return JSON.parse(content);
    }
}
