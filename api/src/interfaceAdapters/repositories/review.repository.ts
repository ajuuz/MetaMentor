import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { BaseRepository } from "./base.repository";
import { reviewModel, IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { REVIEW_STATUS } from "shared/constants";
import { BookReviewDTO, GetReviewResponseDTO } from "shared/dto/reviewDTO";
import mongoose from "mongoose";


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

    async createReview(reviewDetails:BookReviewDTO):Promise<IReviewModel>{
        const studentId=new mongoose.Types.ObjectId(reviewDetails.studentId)
        const mentorId=new mongoose.Types.ObjectId(reviewDetails.mentorId)
        const levelId=new mongoose.Types.ObjectId(reviewDetails.levelId)
        const domainId=new mongoose.Types.ObjectId(reviewDetails.domainId)
        const newReview = new reviewModel({...reviewDetails,studentId,mentorId,levelId,domainId})
        return newReview
    }

    async saveReview(review:IReviewModel):Promise<void>{
        await review.save()
    }

    async checkIsBookedSlot(mentorId:string,day:string,start:number,end:number):Promise<boolean>{
         const review = await reviewModel.findOne({mentorId,'slot.day':day,'slot.start':{$lt:end},'slot.end':{$gt:start}})
         return review?true:false
    }

}