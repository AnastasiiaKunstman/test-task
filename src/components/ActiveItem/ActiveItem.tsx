import { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { observer } from 'mobx-react';
import items from '../../store/store';
import { TaskType } from '../../types/types';

interface ActiveBlockProps {
    activeItem: TaskType | undefined;
}

const ActiveBlock: FC<ActiveBlockProps> = observer(({ activeItem }) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

    const filteredItems = activeItem ? items.itemArray.filter(item => item.id !== activeItem.id) : [];

    useEffect(() => {
        if (activeItem) {
            setNewTitle(activeItem.title);
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
            <p className={styles.activeBlock_text}>{activeItem.text}</p>
            {filteredItems.map((item) => (
                <div key={item.id} className={styles.item_box}>
                    <button
                        className={styles.item_button}
                        id={item.id}
                        onClick={() => items.addSubtask(item.id, item.title, item.text)}
                    />
                    {item.title}
                </div>
            ))}
            <button onClick={handleSave} className={styles.save_button}>Сохранить</button>
            {saveSuccess && (
                <div className={styles.saveSuccess}>
                    Изменения успешно сохранены!
                </div>
            )}
        </div>
    )
})

export default ActiveBlock