import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import items from '../../store/store';
import ActiveBlock from '../ActiveItem/ActiveItem';
import TaskButtonList from '../TaskButtonList/TaskButtonList';
import styles from './styles.module.css';

const Widget: FC = observer(() => {
    const [activeBlock, setActiveBlock] = useState<string>('');

    const activeItem = items.itemArray.find((item) => {
        // console.log("Current activeBlock:", activeBlock);
        return item.id === activeBlock;
    });

    const toggleMenuBlock = (id: string) => {
        setActiveBlock(id);
    };

    const handleChange = (id: string) => {
        items.completeToggler(id);
    };

    return (
        <main>
            <article className={styles.card}>
                <div className={styles.buttons}>
                    <TaskButtonList items={items.itemArray} activeBlock={activeBlock} toggleMenuBlock={toggleMenuBlock} handleChange={handleChange} />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <ActiveBlock activeItem={activeItem} />
                    </div>
                </div>
            </article>
        </main>
    )
});

export default Widget;