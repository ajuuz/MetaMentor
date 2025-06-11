import { RepositoryRegistry } from "./repository.registry";
import { ServiceRegistory } from "./service.register";
import { UseCaseRegistory } from "./usecase.registory";


export class DependencyInjection{
    static registerAll():void{
        RepositoryRegistry.registerRepositories();
        UseCaseRegistory.registerUsecases();
        ServiceRegistory.registerServices()
    }
}