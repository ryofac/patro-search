export class Evaluation {
    constructor() {
        // Classe que vai guardar a referência da pontuação final
        this.autorityPoints = 0;
        this.frequencyPoints = 0;
        this.tagsPoints = 0;
        this.autoReferencePenalty = 0;
        this.freshPoints = 0;
    }
    getTotalPoints() {
        return this.autorityPoints + this.frequencyPoints + this.tagsPoints - this.autoReferencePenalty + this.freshPoints;
    }
}
