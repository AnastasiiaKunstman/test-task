import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import Checkbox from '../Checkbox/Checkbox';
import edit from '../../assets/edit.svg';
import chevronIcon from '../../assets/chevron.svg';
import styles from './styles.module.css';
import { TaskType } from '../../types/types';

interface TaskButtonListProps {
    items: TaskType[];
    activeBlock: string;
    toggleMenuBlock: (id: string) => void;
    handleChange: (id: string) => void;
}

const TaskButtonList: FC<TaskButtonListProps> = observer(({ items, activeBlock, toggleMenuBlock, handleChange }) => {
    const [expandedTasks, setExpandedTasks] = useState<{ [id: string]: boolean }>({});

    const toggleTaskExpansion = (id: string) => {
        setExpandedTasks((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <>
            {items.map((item) => (
                <div key={item.id} className={styles.taskContainer}>
                    <button
                        key={item.id}
                        className={`${styles.button} ${activeBlock === item.id ? styles.active : ''}`}
                    >
                        <div className={styles.box}>
                            <img
                                src={chevronIcon}
                                alt='toggle subtasks'
                                className={`${styles.icons} ${expandedTasks[item.id] ? styles.rotated : ''}`} onClick={() => toggleTaskExpansion(item.id)}
                            />
                            <Checkbox
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() => handleChange(item.id)}
                            />
                            {item.title}
                        </div>
                        <img
                            src={edit}
                            alt='edit task'
                            className={styles.edit_icons}
                            onClick={() => toggleMenuBlock(item.id)}
                        />

                    </button>
                    {expandedTasks[item.id] && item.subTasks.map((subTask) => (
                        <div key={subTask.id} className={styles.item_box}>
                            <Checkbox
                                id={subTask.id}
                                checked={subTask.isChecked}
                                onChange={() => handleChange(subTask.id)}
                            />
                            {subTask.title}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
});

export default TaskButtonList;
