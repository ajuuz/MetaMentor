import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { BaseRepository } from "./base.repository";
import { reviewModel, IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { REVIEW_STATUS } from "shared/constants";
import { GetReviewResponseDTO } from "shared/dto/reviewDTO";


export class ReviewRepository extends BaseRepository<IReviewEntity,IReviewModel> implements IReviewRepository{

    constructor(){
        super(reviewModel)
    }
    
    async findByStudentAndDomain(studentId:string,domainId:string):Promise<GetReviewResponseDTO[]>{

            const reviews:GetReviewResponseDTO[]=await reviewModel.aggregate([
                {
                    $match:{studentId,domainId}
                },
                {
                    $sort:{createdAt:1}
                },
                {
                    $lookup:{
                        from:'users',
                        localField:'mentorId',
                        foreignField:'_id',
                        as:'mentor',
                        pipeline:[{$project:{_id:0,name:1}}]
                    }
                },
                {
                    $unwind:'$mentor'
                },
                {
                  $lookup:{
                      from:'levels',
                      localField:'levelId',
                      foreignField:'_id',
                      as:'level',
                      pipeline:[{$project:{_id:0,name:1,taskFile:1}}]
                  }
                },
                {
                    $unwind:'$level'
                },
                {
                    $project:{
                        status:1,
                        slot:1,
                        payment:1,
                        feedBack:1,
                        mentorName:'$mentor.name',
                        level:{
                            name:'$level.name',
                            taskFile:'$level.taskFile'
                        }
                    }
                }
            ])

            return reviews
            // const bookedSlots:IBookedSlotEntity[]= await reviewModel
            // .find({studentId,domainId,status:REVIEW_STATUS.PASS})
            // .sort({createdAt:1})
            // .populate('mentorId')
            // .populate('levelId')
            // return bookedSlots
    }

    async getPassedReviewsCount(studentId:string,domainId:string):Promise<number>{
        const count=await reviewModel.countDocuments({studentId,domainId,status:REVIEW_STATUS.PASS})
        return count
    }

}