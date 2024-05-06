// import { FC, useEffect, useState } from 'react';
// import styles from './styles.module.css';
// import { observer } from 'mobx-react';
// import items from '../../store/store';
// import { TaskType } from '../../types/types';

// interface ActiveBlockProps {
//     activeItem: TaskType | undefined;
// }

// const ActiveBlock: FC<ActiveBlockProps> = observer(({ activeItem }) => {
//     const [newTitle, setNewTitle] = useState<string>("");
//     const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

//     const filteredItems = activeItem ? items.itemArray.filter(item => item.id !== activeItem.id) : items.itemArray;

//     useEffect(() => {
//         if (activeItem) {
//             setNewTitle(activeItem.title);
//         }
//     }, [activeItem]);

//     const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setNewTitle(event.target.value);
//     };

//     const handleSave = () => {
//         if (activeItem) {
//             items.updateTitle(activeItem.id, newTitle);
//             setSaveSuccess(true);
//             setTimeout(() => {
//                 setSaveSuccess(false);
//             }, 3000);
//         }
//     };

//     if (!activeItem) {
//         return <p className={styles.text}>Выберите задачу</p>;
//     }

//     return (
//         <div className={styles.activeBlock}>
//             <input
//                 type="text"
//                 className={styles.activeBlock_title}
//                 value={newTitle}
//                 onChange={handleTitleChange}
//             />
//             <p className={styles.activeBlock_text}>{activeItem.text}</p>
//             {filteredItems.map((item) => (
//                 <div key={item.id} className={styles.item_box}>
//                     <button
//                         className={styles.item_button}
//                         id={item.id}
//                         onClick={() => items.addSubtask(item.title, item.text)}
//                     />
//                     {item.title}
//                 </div>
//             ))}
//             <button onClick={handleSave} className={styles.save_button}>Сохранить</button>
//             {saveSuccess && (
//                 <div className={styles.saveSuccess}>
//                     Изменения успешно сохранены!
//                 </div>
//             )}
//         </div>
//     )
// })

// export default ActiveBlock

// import { FC, useEffect, useState } from 'react';
// import styles from './styles.module.css';
// import { observer } from 'mobx-react';
// import items from '../../store/store';
// import { TaskType } from '../../types/types';

// interface ActiveBlockProps {
//     activeItem: TaskType | undefined;
// }

// const ActiveBlock: FC<ActiveBlockProps> = observer(({ activeItem }) => {
//     const [newTitle, setNewTitle] = useState<string>("");
//     const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
//     const [availableTasks, setAvailableTasks] = useState<TaskType[]>([]);

//     useEffect(() => {
//         if (activeItem) {
//             setNewTitle(activeItem.title);

//             // Фильтруем список задач, исключая текущую активную задачу и её подзадачи
//             const filteredTasks = items.itemArray.filter(task => task.id !== activeItem.id && !activeItem.subTasks.some(subTask => subTask.id === task.id));
//             setAvailableTasks(filteredTasks);
//         }
//     }, [activeItem]);

//     const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setNewTitle(event.target.value);
//     };

//     const handleSave = () => {
//         if (activeItem) {
//             items.updateTitle(activeItem.id, newTitle);
//             setSaveSuccess(true);
//             setTimeout(() => {
//                 setSaveSuccess(false);
//             }, 3000);
//         }
//     };

//     const handleAddSubtask = (subTask: TaskType) => {
//         if (activeItem) {
//             items.addSubtask(activeItem.id, subTask);
//         }
//     };

//     const handleRemoveSubtask = (subTask: TaskType) => {
//         if (activeItem) {
//             const updatedSubTasks = activeItem.subTasks.filter(task => task.id !== subTask.id);
//             items.updateSubTasks(activeItem.id, updatedSubTasks);
//         }
//     };

//     if (!activeItem) {
//         return <p className={styles.text}>Выберите задачу</p>;
//     }

//     return (
//         <div className={styles.activeBlock}>
//             <input
//                 type="text"
//                 className={styles.activeBlock_title}
//                 value={newTitle}
//                 onChange={handleTitleChange}
//             />
//             <p className={styles.activeBlock_text}>{activeItem ? activeItem.text : ''}</p>
//             {availableTasks.length > 0 ? (
//                 <>
//                     <h3>Добавить подзадачу:</h3>
//                     <ul>
//                         {availableTasks.map(task => (
//                             <li key={task.id}>
//                                 <button className={styles.item_button} onClick={() => handleAddSubtask(task)} />
//                                 {task.title}
//                             </li>
//                         ))}
//                     </ul>
//                 </>
//             ) : (
//                 <>
//                     <h3>Удалить подзадачу:</h3>
//                     <ul>
//                         {activeItem && activeItem.subTasks.length > 0 ? (
//                             activeItem.subTasks.map(subTask => (
//                                 <li key={subTask.id}>
//                                     <button className={styles.item_button_remove} onClick={() => handleRemoveSubtask(subTask)} />
//                                     {subTask.title}
//                                 </li>
//                             ))
//                         ) : (
//                             <p>Нет доступных задач</p>
//                         )}
//                     </ul>
//                 </>
//             )}
//             <button onClick={handleSave} className={styles.save_button}>Сохранить</button>
//             {saveSuccess && (
//                 <div className={styles.saveSuccess}>
//                     Изменения успешно сохранены!
//                 </div>
//             )}
//         </div>
//     );
// })

// export default ActiveBlock;

import { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { observer } from 'mobx-react';
import items from '../../store/store';
import { TaskType } from '../../types/types';
import SubtaskList from '../SubtaskList/SubtaskList';
import Button from '../UI/Button/Button';

interface ActiveBlockProps {
    activeItem: TaskType | undefined;
}

const ActiveBlock: FC<ActiveBlockProps> = observer(({ activeItem }) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [availableTasks, setAvailableTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        if (activeItem) {
            setNewTitle(activeItem.title);

            const filteredTasks = items.itemArray.filter(task => task.id !== activeItem.id && !activeItem.subTasks.some(subTask => subTask.id === task.id));
            setAvailableTasks(filteredTasks);
        }
    }, [activeItem]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleSave = () => {
        if (activeItem) {
            items.updateTitle(activeItem.id, newTitle);
            setSaveSuccess(true);
            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        }
    };

    const handleToggleSubtask = (task: TaskType) => {
        if (activeItem) {
            if (activeItem.subTasks.some(subTask => subTask.id === task.id)) {
                items.removeSubtask(activeItem.id, task.id);
                if (!availableTasks.some(availableTask => availableTask.id === task.id)) {
                    setAvailableTasks(prevTasks => [...prevTasks, task]);
                }
            } else {
                items.addSubtask(activeItem.id, task);
                setAvailableTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== task.id));
            }
        }
    };

    if (!activeItem) {
        return <p className={styles.text}>Выберите задачу</p>;
    }

    return (
        <div className={styles.activeBlock}>
            <input
                type="text"
                className={styles.activeBlock_title}
                value={newTitle}
                onChange={handleTitleChange}
            />
            <p className={styles.activeBlock_text}>{activeItem ? activeItem.text : ''}</p>
            <h4 className={styles.subTasks_title}>
                Добавить подзадачу:
            </h4>
            <SubtaskList tasks={availableTasks} activeItem={activeItem} handleToggleSubtask={handleToggleSubtask} />
            <h4 className={styles.subTasks_title}>
                Подзадачи:
            </h4>
            {activeItem && activeItem.subTasks.length > 0 ? (
                <SubtaskList tasks={activeItem.subTasks} activeItem={activeItem} handleToggleSubtask={handleToggleSubtask} />
            ) : (
                <p>Здесь пока нет активных подзадач</p>
            )}
            <Button onClick={handleSave} buttonTxt="Сохранить" />
            {saveSuccess && (
                <div className={styles.saveSuccess}>
                    Изменения успешно сохранены!
                </div>
            )}
        </div>
    );
})

export default ActiveBlock;
