import fs from "fs";
export class FileUtils {
    static savePageFile(title, data) {
        const fileName = title.split(" ").join('_');
        fs.writeFileSync(`./data/pages/${fileName}.html`, data);
    }
}
