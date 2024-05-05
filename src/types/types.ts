export interface TaskType {
    id: string;
    title: string;
    text: string;
    isChecked: boolean;
    subTasks: TaskType[];
}