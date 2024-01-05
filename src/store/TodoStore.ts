import { types, flow} from 'mobx-state-tree';
import TodoModel, { Todo } from './TodoModel';

// Определение хранилища TodoStore с использованием MobX State Tree
const TodoStore = types
    .model({
        todos: types.array(TodoModel), // Определение массива todos с использованием TodoModel
        status: types.optional(types.enumeration(['pending', 'success', 'error']), 'pending'), // Определение статуса
    })
    .actions((self) => ({
        // Асинхронное действие для загрузки задач
        fetchTodos: flow(function* () {
            try {
                self.status = 'pending'; // Установка статуса "в процессе загрузки"
                const response = yield fetch('https://jsonplaceholder.typicode.com/todos');
                const todos = yield response.json();

                // Очистка массива перед добавлением новых элементов
                self.todos.clear();

                // Добавление новых элементов в массив todos
                self.todos.replace(todos.map((todo: Todo) => TodoModel.create(todo)));
                self.status = 'success'; // Установка статуса "успех"
            } catch (error) {
                console.error('Error fetching todos', error);
                self.status = 'error'; // Установка статуса "ошибка" в случае ошибки загрузки
            }
        }),

        // Добавление новой задачи
        addTodo: (newTodo: { title: string }) => {
            const trimmedTitle = newTodo.title.trim(); // Удаление пробелов из начала и конца строки

            if (trimmedTitle !== '') {
                // Создание новой задачи с уникальным id (временная метка)
                const todo = TodoModel.create({
                    id: Date.now(),
                    completed: false,
                    title: trimmedTitle,
                });
                self.todos.push(todo); // Использование push для добавления в конец массива
            }
        },

        // Удаление задачи по id
        removeTodo: (todoId: number) => {
            const indexToRemove = self.todos.findIndex((todo) => todo.id === todoId);
            if (indexToRemove !== -1) {
                self.todos.splice(indexToRemove, 1); // Удаление задачи из массива
            }
        },
    }));

export default TodoStore;


