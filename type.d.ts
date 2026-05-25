export type vibeType ="positive" | "negative" | "neutral";

export type UserType = "student" | "faculty" | "alumini" | "parent" | "other"

export interface Reviews {
    _id: string;
  vibe: VibeType;
  collegeName: string;
  isAnonymous: boolean;
  name?: string;
  anonymousId?: string;
  userType: UserType;
  title: string;
  story: string;
  createdAt: string;
  updatedAt: string;
}

export type CollegeType= {
    _id:string,
    name:string,
    positiveCount:number,
    negativeCount:number,
    totalReviews:number,
    neutralCount:number,
    reviews:Review[],
    complaintRate:number
}