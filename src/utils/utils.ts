import http from 'http';
import fs from "fs";
import { MultipliyerOptions } from '../models/multipliyerOptions.js';
import path from "path"


export class Utils {

    static loadConf() {
        const content = fs.readFileSync("../data/params/params.json").toString();
        return JSON.parse(content) as MultipliyerOptions;
    }
}
