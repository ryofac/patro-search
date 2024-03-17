export class Evaluation {

    // TODO: não elaborar os pontos diretos, mas sim métodos para calcular a quantidade de pontos baseados em quanto ele apareceu em determinado critério

    // Por exemplo, se eu quiser encontrar o dado "Quantas vezes o termo de busca apareceu nessa página?" eu consigo facilmente
    // aí teria: 
    // autorityTimes: 0
    // getAutorityPoints: return autorityTimes * 50;
    
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