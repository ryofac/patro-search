export class RequestNotCompletedError extends Error {
    constructor(message: string){
        super(message);
    }
}