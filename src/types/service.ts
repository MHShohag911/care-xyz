export interface Service {
    _id?: string;
    name: string; 
    slug: string;
    description: string;
    image: string;
    hourlyRate: number;
    dailyRate: number;
    features: string[];
    createdAt: Date;
    updatedAt: Date;

}