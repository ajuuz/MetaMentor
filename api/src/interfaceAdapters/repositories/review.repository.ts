import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { reviewModel, IReviewModel } from "frameworks/database/models/bookedSlot.model";
import mongoose, { FilterQuery } from "mongoose";
import { PENDING_REVIEW_STATE, REVIEW_STATUS } from "shared/constants";
import { BookReviewDTO, GetDomainReviewResponseDTO,DomainReviewSlotResponseDTO, GetStudentReviewResponseDTO, ReviewsDataForMentorResponseDTO, ReviewDataForMentorResponseDTO } from "shared/dto/reviewDTO";

import { BaseRepository } from "./base.repository";


export class ReviewRepository extends BaseRepository<IReviewEntity,IReviewModel> implements IReviewRepository{

    constructor(){
        super(reviewModel)
    }
    
    async findByStudentAndDomain(studentId:string,domainId:string):Promise<GetDomainReviewResponseDTO[]>{
            const reviews:GetDomainReviewResponseDTO[]=await reviewModel.aggregate([
                {
                    $match:{studentId:new mongoose.Types.ObjectId(studentId),domainId:new mongoose.Types.ObjectId(domainId)}
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
    }

    async getPassedReviewsCount(studentId:string,domainId:string):Promise<number>{
        const count=await reviewModel.countDocuments({studentId,domainId,status:REVIEW_STATUS.PASS})
        return count
    }

    async findByStudentId(studentId:string,status:REVIEW_STATUS[]):Promise<GetStudentReviewResponseDTO[]>{
        const reviews:GetStudentReviewResponseDTO[]= await reviewModel.aggregate([
            {
                $match:{studentId:new mongoose.Types.ObjectId(studentId),status:{$in:status}}
            },
            {
                $lookup:{
                    from:'domains',
                    localField:'domainId',
                    foreignField:'_id',
                    as:'domain'
                }
            },
            {
                $unwind:'$domain'
            },
            {
                $lookup:{
                    from:'users',
                    localField:'mentorId',
                    foreignField:'_id',
                    as:'mentor'
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
                    as:'level'
                }
            },
            {
                $unwind:'$level'
            },
            {
                $project:{
                    status:1,
                    payment:1,
                    feedBack: 1,
                    slot:1,
                    mentorName:'$mentor.name',
                    domainName:'$domain.name',
                    level:{
                        name:'$level.name',
                        taskFile:'$level.taskFile'
                    },
                }
            }
        ])

        return reviews
    }

    async findByDomain(domainId:string):Promise<DomainReviewSlotResponseDTO[]>{
        const reviews=await reviewModel.aggregate([
            {$match:{domainId:new mongoose.Types.ObjectId(domainId)}},
            {
                $lookup:{
                    from:'mentors',
                    localField:'mentorId',
                    foreignField:'userId',
                    as:'mentor'
                }
            },
            {
                $unwind:'$mentor'
            },
            {
                $group:{_id:'$mentor.userId',mentor:{$first:'$mentor'},slots:{$push:'$slot'}}
            },
            {
                $sort:{'mentor.rating.star':-1}
            },
            {
                $project:{
                    _id:0,
                    mentorId:'$mentor.userId',
                    slots:1
                }
            }
        ])
        return reviews
    }

    async findReviewsForMentor(filter:any,skip:number,limit:number):Promise<Omit<ReviewsDataForMentorResponseDTO,'totalPages'>>{
        const mentorObjectId=new mongoose.Types.ObjectId(filter.mentorId)
        const mongoFilter:FilterQuery<IReviewEntity>={mentorId:mentorObjectId};

        if(filter.status){
            mongoFilter.status={$in:filter.status}
        }

        if(filter.dateRange){
            mongoFilter['slot.isoStartTime']={$gte:filter.dateRange.start,$lte:filter.dateRange.end}
        }
        if(filter.pendingReviewState!=='undefined'){
            const currentDate = new Date();
            if(filter.pendingReviewState===PENDING_REVIEW_STATE.NOTOVER){
                 mongoFilter['slot.isoStartTime']={$gt:currentDate}
                }else{
                mongoFilter['slot.isoEndTime']={$lt:currentDate}
            }
        }

        const [reviews,totalDocuments] = await Promise.all([
            reviewModel.aggregate([
                {$match:mongoFilter},
                {$skip:skip},
                {$limit:limit},
                {
                    $lookup:{
                        from:'domains',
                        localField:'domainId',
                        foreignField:'_id',
                        as:'domain'
                    }
                },
                {$unwind:'$domain'},
                {
                    $lookup:{
                        from:'levels',
                        localField:'levelId',
                        foreignField:'_id',
                        as:'level'
                    }
                },
                {$unwind:'$level'},
                {
                    $lookup:{
                        from:'users',
                        localField:'studentId',
                        foreignField:'_id',
                        as:'student'
                    }
                },
                {$unwind:'$student'},
                {
                    $project:{
                        mentorId:1,
                        student:{
                            name:'$student.name',
                            profileImage:'$student.profileImage'
                        },
                        domainName:'$domain.name',
                        level:{
                            name:'$level.name',
                            taskFile:'$level.taskFile'
                        },
                        status:1,
                        payment:{method:'$payment.method',status:'payment.status'},
                        feedBack:1,
                        slot:1
                    }
                }
            ]),
            reviewModel.countDocuments(mongoFilter)
        ])
        return {reviews,totalDocuments}
    }

    async findReviewForMentor(mentorId:string,reviewId:string):Promise<ReviewDataForMentorResponseDTO|null>{
         const reviews=await reviewModel.aggregate([
            {
                $match:{mentorId,reviewId}
            },
            {
                $limit:1
            },
            {
                $lookup:{
                    from:'domains',
                    localField:'domainId',
                    foreignField:'_id',
                    as:'domain'
                }
            },
            {$unwind:'$domain'},
            {
                $lookup:{
                    from:'levels',
                    localField:'levelId',
                    foreignField:'_id',
                    as:'level'
                }
            },
            {$unwind:'$level'},
            {
                $lookup:{
                    from:'users',
                    localField:'studentId',
                    foreignField:'_id',
                    as:'student'
                }
            },
            {$unwind:'$student'},
            {
                $project:{
                    mentorId:1,
                    student:{
                        name:'$student.name',
                        profileImage:'$student.profileImage'
                    },
                    domainName:'$domain.name',
                    level:{
                        name:'$level.name',
                        taskFile:'$level.taskFile'
                    },
                    status:1,
                    payment:{method:'$payment.method',status:'payment.status'},
                    feedBack:1,
                    slot:1
                }
            }
         ])
         return reviews[0]
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