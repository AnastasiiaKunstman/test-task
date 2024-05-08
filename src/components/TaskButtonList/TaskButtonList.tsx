/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import { Item } from '../../type/type';

import Checkbox from '../UI/Checkbox/Checkbox';
import edit from '../../assets/edit.svg'

import styles from './styles.module.css';

const TaskButtonList: FC = observer(() => {

    const handleClick = (item: Item) => {
        store.setSelectedItem(item);
    };

    const handleCheckboxChange = (item: Item, _checked: boolean) => {
        store.toggleItem(item);

        store.items.forEach((storedItem) => {
            if (item.subTasks.includes(storedItem.title)) {
                store.toggleItem(storedItem);
            }
        });
    };

    return (
        <ul>
            {store.items.map(item => (
                <li key={item.id} onClick={() => handleClick(item)} className={`${styles.task} ${store.selectedItem === item ? styles.active : ''}`}>
                    <div className={styles.box}>
                        <Checkbox
                            checked={item.isChecked}
                            onChange={(checked) => handleCheckboxChange(item, checked)}
                        />
                        {item.title}
                    </div>
                    <img
                        src={edit}
                        alt='edit task'
                        className={styles.edit_icons}
                        onClick={() => handleClick(item)}
                    />
                </li>
            ))}
        </ul>
    )
});

export default TaskButtonList;
