export interface User {
    username: string;
    messages: number;
    lastActive: Date;
  }
  
  export interface TotalMembersResponse {
    totalMembers: number;
  }
  
  export interface GrowthRateResponse {
    growthRate: number;
  }
  
  export interface EngagementRateResponse {
    messagesPerDay: { _id: number; totalMessages: number }[];
  }
  
  export interface ActiveInactiveResponse {
    activeMembers: number;
    inactiveMembers: number;
  }
  
  export interface TopContributorsResponse {
    topContributors: User[];
  }
  