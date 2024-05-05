import { TaskType } from '../types/types';

type SubTaskAddingProps = (
  id: string,
  array: TaskType[],
  task: TaskType,
) => TaskType[];

type RecursionProps = (
  id: string,
  array: TaskType[],
) => TaskType[];

type SearchProps = (
  id: string,
  array: TaskType[],
) => TaskType | null;

type CompleteTogglerProps = (
  array: TaskType[],
  state: boolean,
) => TaskType[];

export const subTaskAdding:SubTaskAddingProps = (id, array, task) => {
  return array.reduce((arr: TaskType[], item) => {
    if (item.id === id) {
        item.subTasks.push(task);
        arr.push(item);
    } else {
        arr.push({...item, subTasks: subTaskAdding(id, item.subTasks, task)});
    }

    return arr;
  }, []);
};

export const recursionSearch:SearchProps = (id, array) => {
  for (let item of array) {
    if (item.id === id) {
      return item;
    }

    const subItem = recursionSearch(id, item.subTasks);
    
    if (subItem) {
      return subItem;
    }
  }

  return null;
};

export const recursionCompleteToggler:RecursionProps = (id, array) => {
  return array.reduce((arr: TaskType[], item) => {
    if (item.id !== id) {
        arr.push({...item, subTasks: recursionCompleteToggler(id, item.subTasks)});
    } else {
        arr.push({
          ...item, 
          isChecked: !item.isChecked, 
          subTasks: subTasksCompleteToggler(item.subTasks, !item.isChecked)
        });
    }

    return arr;
  }, []);
};

export const subTasksCompleteToggler:CompleteTogglerProps = (array, state) => {
  return array.reduce((arr: TaskType[], item) => {
    arr.push({
      ...item, 
      isChecked: state, 
      subTasks: subTasksCompleteToggler(item.subTasks, state)
    });

    return arr;
  }, []);
};