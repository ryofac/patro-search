import fs from "fs";
export class Utils {
    static loadConf() {
        const content = fs.readFileSync(relativePath).toString();
        return JSON.parse(content);
    }
}
