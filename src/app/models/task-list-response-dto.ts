import { TaskListResponse } from "./task-list-response";

export class TaskListResponseDTO {
    status: string;
    message: string;
    results: number;
    data: Array<TaskListResponse>;
}