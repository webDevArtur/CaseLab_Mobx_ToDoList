import React from 'react';
import { observer } from 'mobx-react-lite';
import TodoApp from './components/TodoApp';


const App: React.FC = observer(() => {
    return (
        <div className='container'>
            <TodoApp />
        </div>
    );
});

export default App;
