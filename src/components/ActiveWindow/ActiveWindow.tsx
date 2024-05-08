/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import { Item } from '../../type/type';

import Button from '../UI/Button/Button';
import Checkbox from '../UI/Checkbox/Checkbox';

import styles from './styles.module.css';

const ActiveWindow: FC = observer(() => {
  const [newTitle, setNewTitle] = useState<string>((store.selectedItem && store.selectedItem.title) || '');
  const [subTasksState, setSubTasksState] = useState<{ [key: string]: boolean }>({});
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (store.selectedItem) {
      setNewTitle(store.selectedItem.title);
      const subTasksMap: { [key: string]: boolean } = {};
      store.items.forEach((item) => {
        subTasksMap[item.title] = store.selectedItem!.subTasks.includes(item.title);
      });
      setSubTasksState(subTasksMap);
    }
  }, [store.selectedItem]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSave = () => {
    if (store.selectedItem) {

      const newSubTasks: string[] = [];
      for (const subTask in subTasksState) {
        if (subTasksState[subTask]) {
          newSubTasks.push(subTask);
        }
      }
      store.selectedItem.subTasks = newSubTasks;

      store.editItemTitle(store.selectedItem, newTitle);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  const handleCheckboxChange = (item: Item, checked: boolean) => {
    setSubTasksState(prevState => ({
      ...prevState,
      [item.title]: checked
    }));
  };

  return (
    <>
      {store.selectedItem ? (
        <div className={styles.activeBlock}>
          <div>
            <div>
              <input
                type="text"
                className={styles.activeBlock_title}
                value={newTitle}
                onChange={handleTitleChange}
              />
              <p className={styles.activeBlock_text}>{store.selectedItem.text}</p>
            </div>
            <ul>
              {store.items.map((item) => (
                <li key={item.id}>
                  <Checkbox
                    checked={subTasksState[item.title] || false}
                    onChange={(checked) => handleCheckboxChange(item, checked)}
                  />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={handleSave} buttonTxt={'Сохранить'} />
          {saveSuccess && (
            <div className={styles.saveSuccess}>
              Изменения успешно сохранены!
            </div>
          )}
        </div>
      ) : (
        <div className={styles.text}>Выберите элемент для просмотра деталей</div>
      )}
    </>
  )
});

export default ActiveWindow;