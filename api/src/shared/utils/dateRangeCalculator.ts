import {startOfDay,endOfDay,startOfWeek,endOfWeek,startOfMonth,endOfMonth,startOfYear,endOfYear} from 'date-fns';

export const dateRangeCalculator=(dateRange:string)=>{
    const today=new Date()
    let start,end;
    switch(dateRange){
        case "today" :
            start=startOfDay(today)
            end=endOfDay(today)
            break;
        
        case "week":
            start=startOfWeek(today)
            end=endOfWeek(today)
            break;

        case "month":
            start=startOfMonth(today)
            end=endOfMonth(today)
            break;

        case "year":
            start=startOfYear(today)
            end=endOfYear(today)
            break;

        default:
            start=null;
            end=null
            break;
    }
    return {start,end}
}