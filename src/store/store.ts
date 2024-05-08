import { makeAutoObservable } from 'mobx';
import { Item } from '../type/type';

class Store {
    items: Item[] = [];
    selectedItem: Item | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadItemsFromLocalStorage();
    }

    private loadItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            this.items = JSON.parse(storedItems);
        } else {
            this.initializeDefaultItems();
        }
    }

    private saveItemsToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(this.items));
    }

    initializeDefaultItems() {
        this.items = [
            {
                id: "1",
                title: 'Песчаные дюны Арракиса',
                text: 'Необъятные песчаные дюны стремятся к небесам, словно пылающий океан горячего песка. Ветер несёт с собой таинственные шепоты пустыни, а вдали виднеются контуры гигантских червей',
                isChecked: false,
                subTasks: []
            },
            {
                id: "2",
                title: 'Битва на планете Хот',
                text: 'В пространстве разверзлись огненные рвы, вспыхивая как звёздные сверхновые. Между звёздными кораблями разворачивается смертельное противостояние, озаряемое сверкающими лазерными выстрелами',
                isChecked: false,
                subTasks: []
            },
            {
                id: "3",
                title: 'Джедайский храм на Корусанте',
                text: 'Величественные колонны храма уносятся к небу, словно молитвы возвышающихся монахов. Внутри царит тишина и спокойствие, пронизанное силой Силы, а вдалеке слышен шёпот учеников, стремящихся к просветлению.',
                isChecked: false,
                subTasks: []
            },
            {
                id: "4",
                title: 'Полёт на Миллениум Фальконе',
                text: 'Старый корабль Миллениум Фалькон мчится сквозь звёздное пространство, оставляя за собой следы сверкающего света. Экипаж сосредоточенно работает за пультами управления, готовясь к следующему захватывающему приключению.',
                isChecked: false,
                subTasks: []
            },
            {
                id: "5",
                title: 'Легенда и Предвестие',
                text: 'Легенда о Мессии Дюны давно сотрясает воображение жителей этой загадочной планеты. Он — источник надежды и страха, символ изменений и судьбоносных событий.',
                isChecked: false,
                subTasks: []
            },
            {
                id: "6",
                title: 'Песчаный Океан',
                text: 'Песчаный океан Дюны — не только великолепное явление природы, но и источник множества тайн и опасностей. Его непроглядные глубины скрывают артефакты древних цивилизаций, секреты которых могут перевернуть мир. Но среди этой красоты и тайн кроются ловушки песка, неумолимые и коварные, готовые поглотить тех, кто осмелится нарушить их безмолвие. В этом песчаном море каждый шаг — испытание, и только тот, кто смело бросится в бурные воды Дюны, сможет обрести ответы на свои вопросы и победить собственные страхи.',
                isChecked: false,
                subTasks: []
            },
        ];

        this.saveItemsToLocalStorage();
    }

    setSelectedItem(item: Item | null) {
        this.selectedItem = item;
    }

    toggleItem(item: Item) {
        item.isChecked = !item.isChecked;
        this.saveItemsToLocalStorage();
    }

    editItemTitle(item: Item, newTitle: string) {
        item.title = newTitle;
        this.saveItemsToLocalStorage();
    }

    addSubTask(item: Item, subTask: string) {
        item.subTasks.push(subTask);
        this.saveItemsToLocalStorage();
    }

    removeSubTask(item: Item, subTask: string) {
        item.subTasks = item.subTasks.filter(task => task !== subTask);
        this.saveItemsToLocalStorage();
    }
}

export default new Store();