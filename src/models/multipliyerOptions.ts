// Quem vai controlar as opções relativas a quantidade de pontos / multiplicadores
// Isso existe porque esses números podem ser alterados, segundo a questão 2
export interface MultipliyerOptions {
    autority: number;
    occurrency: number;
    meta: number;
    h1: number;
    h2: number;
    p: number;
    a: number;
    freshContent: number;
    freshContentPenalty : number;
    autoreferencePenalty: number;
}