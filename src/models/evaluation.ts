export class Evaluation {
    // Classe que vai guardar a referência da pontuação final
    autorityPoints: number = 0;
    frequencyPoints: number = 0;
    tagsPoints: number = 0;
    autoReferencePenalty: number = 0;
    freshPoints: number = 0;

    getTotalPoints(){
        return this.autorityPoints + this.frequencyPoints + this.tagsPoints - this.autoReferencePenalty  + this.freshPoints;
    }
    


}