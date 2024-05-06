import { FC } from 'react';
import { TaskType } from '../../types/types';

interface SubtaskListProps {
    tasks: TaskType[];
    activeItem: TaskType | undefined;
    handleToggleSubtask: (task: TaskType) => void;
}

const SubtaskList: FC<SubtaskListProps> = ({ tasks, activeItem, handleToggleSubtask }) => {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={activeItem && activeItem.subTasks.some(subTask => subTask.id === task.id)}
                        onChange={() => handleToggleSubtask(task)}
                    />
                    {task.title}
                </li>
            ))}
        </ul>
    );
};

export default SubtaskList;