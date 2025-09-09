

export interface IEnrollDomainUsecase{

    execute(studentId:string,domainId:string,fullCourse:boolean,selectedLevelsId?:string[]):Promise<void>
}