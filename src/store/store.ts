import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import { TaskType } from '../types/types';
import { recursionCompleteToggler, recursionSearch } from '../utils/utils';

class Items {
    itemArray: TaskType[] = [];
    activeItem: TaskType | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadItemsFromLocalStorage();
    }

    private loadItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            this.itemArray = JSON.parse(storedItems);
        } else {
            this.initializeDefaultItems();
        }
    }

    private saveItemsToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(this.itemArray));
    }

    initializeDefaultItems() {
        this.itemArray = [
            {
                id: uuidv4(),
                title: 'Песчаные дюны Арракиса',
                text: 'Необъятные песчаные дюны стремятся к небесам, словно пылающий океан горячего песка. Ветер несёт с собой таинственные шепоты пустыни, а вдали виднеются контуры гигантских червей',
                isChecked: false,
                subTasks: []
            },
            {
                id: uuidv4(),
                title: 'Битва на планете Хот',
                text: 'В пространстве разверзлись огненные рвы, вспыхивая как звёздные сверхновые. Между звёздными кораблями разворачивается смертельное противостояние, озаряемое сверкающими лазерными выстрелами',
                isChecked: false,
                subTasks: []
            },
            {
                id: uuidv4(),
                title: 'Джедайский храм на Корусанте',
                text: 'Величественные колонны храма уносятся к небу, словно молитвы возвышающихся монахов. Внутри царит тишина и спокойствие, пронизанное силой Силы, а вдалеке слышен шёпот учеников, стремящихся к просветлению.',
                isChecked: false,
                subTasks: []
            },
            {
                id: uuidv4(),
                title: 'Полёт на Миллениум Фальконе',
                text: 'Старый корабль Миллениум Фалькон мчится сквозь звёздное пространство, оставляя за собой следы сверкающего света. Экипаж сосредоточенно работает за пультами управления, готовясь к следующему захватывающему приключению.',
                isChecked: false,
                subTasks: []
            },
        ];

        this.saveItemsToLocalStorage();
    }

    completeToggler(id: string) {
        this.itemArray = recursionCompleteToggler(id, this.itemArray);
        this.saveItemsToLocalStorage();
    }

    chooseItem(id: string) {
        this.activeItem = recursionSearch(id, this.itemArray);
    }

    updateTitle(id: string, newTitle: string) {
        const itemToUpdate = this.itemArray.find(item => item.id === id);
        if (itemToUpdate) {
            itemToUpdate.title = newTitle;
            this.saveItemsToLocalStorage();
        }
    }

    addSubtask(parentId: string, subTask: TaskType) {
        const parentTask = this.itemArray.find(task => task.id === parentId);
        if (parentTask) {
            parentTask.subTasks.push(subTask);
            this.saveItemsToLocalStorage();
        } else {
            console.error(`Parent task with id ${parentId} not found.`);
        }
    }

    updateSubTasks = (id: string, subTasks: TaskType[]) => {
        const task = this.itemArray.find(task => task.id === id);
        if (task) {
            task.subTasks = subTasks;
            this.saveItemsToLocalStorage();
        } else {
            console.error(`Task with id ${id} not found.`);
        }
    }

    removeSubtask = (parentId: string, subtaskId: string) => {
        const parentTask = this.itemArray.find(task => task.id === parentId);

        if (parentTask) {
            parentTask.subTasks = parentTask.subTasks.filter(subTask => subTask.id !== subtaskId);
            this.saveItemsToLocalStorage();
        } else {
            console.error(`Parent task with id ${parentId} not found.`);
        }
    }

}

const items = new Items();

export default items;