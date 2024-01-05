import { types, Instance } from 'mobx-state-tree';

// Определение модели TodoModel с использованием MobX State Tree
const TodoModel = types
    .model({
        id: types.identifierNumber, // Определение числового идентификатора (id) с использованием identifierNumber
        title: types.string, // Определение строки для заголовка задачи
        completed: types.boolean, // Определение булевого значения для статуса завершения задачи
    })
    .actions((self) => ({
        // Действие для переключения статуса завершения задачи
        toggle() {
            self.completed = !self.completed; // Инвертирование текущего значения completed
        },
    }));

// Экспорт модели TodoModel для использования в других частях приложения
export default TodoModel;

// Экспорт типа Todo для использования в других частях приложения
export type Todo = Instance<typeof TodoModel>;
