import { FC } from 'react';
import { observer } from 'mobx-react';
import ActiveWindow from '../ActiveWindow/ActiveWindow';
import TaskButtonList from '../TaskButtonList/TaskButtonList';
import styles from './styles.module.css';

const Widget: FC = observer(() => {
    return (
        <main>
            <article className={styles.card}>
                <div className={styles.buttons}>
                    <TaskButtonList />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <ActiveWindow />
                    </div>
                </div>
            </article>
        </main>
    )
});

export default Widget;