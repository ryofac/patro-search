import fs from "fs";

export class FileUtils {

    public static savePageFile(title: string, data: string){
        const fileName = title.split(" ").join('_');
        fs.writeFileSync(`./data/pages/${fileName}.html`, data)
    }

}   