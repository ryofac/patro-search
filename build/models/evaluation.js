export class Evaluation {
    constructor() {
        // TODO: não elaborar os pontos diretos, mas sim métodos para calcular a quantidade de pontos baseados em quanto ele apareceu em determinado critério
        // Por exemplo, se eu quiser encontrar o dado "Quantas vezes o termo de busca apareceu nessa página?" eu consigo facilmente
        // aí teria: 
        // autorityTimes: 0
        // getAutorityPoints: return autorityTimes * 50;
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
