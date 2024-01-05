import React, { useEffect, FC } from 'react';
import { observer } from 'mobx-react-lite';
import TodoStore from '../store/TodoStore';
import './TodoApp.css';

// Создание экземпляра хранилища задач
const todoStore = TodoStore.create();

// Объявление функционального компонента TodoApp с использованием MobX observer
const TodoApp: FC = observer(() => {

    // Эффект, вызывающий загрузку задач при монтировании компонента
    useEffect(() => {
        todoStore.fetchTodos();
    }, []);

    // Функция для определения цвета статуса загрузки
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'orange';
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'black';
        }
    };


    return (
        <div className="todo-app">
            <h1>Todo App</h1>
            {/* Контейнер для статуса запроса и кнопки перезагрузки */}
            <div className='reload-container'>
                {/* Отображение статуса */}
                <div style={{ fontWeight: 'bold', fontSize: '20px', color: getStatusColor(todoStore.status) }}>
                    Status: {todoStore.status}
                </div>
                {/* Кнопка для перезагрузки задач */}
                <button onClick={() => todoStore.fetchTodos()} className='reload'>Reload Todos</button>
            </div>
            {/* Форма для создания новой задачи */}
            <div className="create-todo">
                <h2>Create Todo</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input = (e.target as HTMLFormElement).querySelector('input');
                        if (input) {
                            // Добавление новой задачи при отправке формы
                            todoStore.addTodo({
                                title: input.value,
                            });
                            input.value = '';
                        }
                    }}
                >
                    {/* Поле ввода для названия новой задачи */}
                    <input type="text" placeholder="Todo title" />
                    {/* Кнопка для добавления новой задачи */}
                    <button type="submit">Add Todo</button>
                </form>
            </div>
            {/* Список задач */}
            <ul>
                {/* Отображение задач */}
                {todoStore.todos.slice().reverse().map((todo) => (
                    <li key={todo.id}>
                        {/* Флажок для отметки выполнения задачи */}
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => todo.toggle()}
                            className='checkbox'
                        />
                        {/* Название задачи */}
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} >{todo.title}</span>
                        {/* Кнопка для удаления задачи */}
                        <button className='delete' onClick={() => todoStore.removeTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
});


export default TodoApp;
