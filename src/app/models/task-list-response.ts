import { TimeTaken } from "./duration";

export class TaskListResponse {
    taskName: string;
    taskCode: string;
    startDate: Date;
    endDate: Date;
    status: string;
    project: string;
    monday: TimeTaken;
    tuesday: TimeTaken;
    wednesday: TimeTaken;
    thursday: TimeTaken;
    friday: TimeTaken;
    saturday: TimeTaken;
    sunday: TimeTaken;
}