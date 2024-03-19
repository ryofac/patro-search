import { ViewHandler } from "./views/viewHandler.js";
import { View } from "./views/view.js";
import { MainMenuView } from "./views/mainMenu.js";
import { Searcher } from "../models/searcher.js";
import { Indexer } from "../models/indexer.js";

export class App {
    private viewHandler: ViewHandler = new ViewHandler();

    private indexer: Indexer = new Indexer();
    private searcher: Searcher = new Searcher(this.indexer);

    private baseView : View = new MainMenuView(this.viewHandler, this.searcher);
    

    public async run(): Promise<void>{
        
        await this.searcher.initializeSearcher();

        this.viewHandler.goToView(this.baseView);

        do {
            await this.viewHandler.getActualView()?.execute();
        }
        while(!this.viewHandler.isEmpty());
    }

}


