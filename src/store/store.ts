import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import { TaskType } from '../types/types';
import { recursionCompleteToggler, recursionSearch } from '../utils/utils';

class Items {
    itemArray: TaskType[] = [];
    activeItem: TaskType | null = null;

    constructor() {
        makeAutoObservable(this);

        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            this.itemArray = JSON.parse(storedItems);
        } else {
            this.initializeDefaultItems();
        }
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

        localStorage.setItem('items', JSON.stringify(this.itemArray));
    }

    completeToggler(id: string) {
        this.itemArray = recursionCompleteToggler(id, this.itemArray);
        this.saveToLocalStorage();
    }

    chooseItem(id: string) {
        this.activeItem = recursionSearch(id, this.itemArray);
    }

    updateTitle(id: string, newTitle: string) {
        const itemToUpdate = this.itemArray.find(item => item.id === id);
        if (itemToUpdate) {
            itemToUpdate.title = newTitle;
            this.saveToLocalStorage();
        }
    }

    getFlatTasks(): TaskType[] {
        const flatTasks: TaskType[] = [];

        const flatten = (tasks: TaskType[]) => {
            tasks.forEach(task => {
                flatTasks.push(task);
                flatten(task.subTasks);
            });
        };

        flatten(this.itemArray);

        return flatTasks;
    }

    addSubtask = (parentId: string, title: string, text: string) => {
        console.log("Adding subtask with parentId:", parentId, "title:", title, "text:", text);

        // Создаем новую подзадачу
        const subTask: TaskType = {
            id: uuidv4(),
            title: title,
            text: text,
            isChecked: false,
            subTasks: [],
        };

        // Находим родительскую задачу в массиве
        const parentTask = this.itemArray.find(task => task.id === parentId);

        // Если родительская задача найдена
        if (parentTask) {
            // Добавляем новую подзадачу в родительскую задачу
            parentTask.subTasks.push(subTask);
            this.saveToLocalStorage();
        } else {
            console.error(`Parent task with id ${parentId} not found.`);
        }
    }

    private saveToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(this.itemArray));
    }
}

const items = new Items();

export default items;