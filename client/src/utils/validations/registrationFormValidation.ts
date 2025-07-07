import type { DomainType } from "@/types/domainTypes";
import type { MentorRegistrationErrorType } from "@/types/mentorType";


export const registrationFormValidation=(selectedDomains:Pick<DomainType,'_id'|'name'>[],description:string,workedAt:string[],skills:string[],images:(Blob|null)[])=>{

    const errors:MentorRegistrationErrorType={};

    if(selectedDomains.length<1){
        errors.selectedDomainsError = 'you should know atleast one Domain'
    }

    if(!description.trim() || !description.trim()===null){
        errors.descriptionError ='description cannot be empty';
    }else if(description.trim().length<5){
        errors.descriptionError="description should be more than 5 character"
    }

    if(workedAt.length<1){
        errors.workedAtError="you should add atleast one company"
    }

    if(skills.length<1){
        errors.skillsError="you should have atlease one skills"
    }

    if(images.filter(Boolean).length<2){
        errors.images="upload necessary images"
    }


    return errors
}