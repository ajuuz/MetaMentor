import { RepositoryRegistry } from "./repository.registry";
import { UseCaseRegistory } from "./usecase.registory";


export class DependencyInjection{
    static registerAll():void{
        RepositoryRegistry.registerRepositories();
        UseCaseRegistory.RegisterUsecases();
    }
}