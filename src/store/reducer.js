import { ADD_TODO , DELETE_TODO , EDIT_TODO } from "./constants";


const loadTodosFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem('todo');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading todos:', error);
        return [];
    }
};

const initialState = {
    todos: loadTodosFromLocalStorage()
};

const todoReducer=(state = initialState , action) => {
    let newState;

    switch(action.type){
        case ADD_TODO : {
            newState = {
                ...state,
                todos: [...state.todos, action.payload]
            };
            break;
        }
        case EDIT_TODO : {
            newState = {
                ...state,
                todos: state.todos.map(todo => 
                    todo.id === action.payload.id 
                        ? { ...todo, text: action.payload.text } 
                        : todo
                )
            };
            break;
       

        }
        case DELETE_TODO: {
            newState = {
                 ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
            break;
           
        }
        default : 
        return state;

    }
     localStorage.setItem('todo', JSON.stringify(newState.todos));
    return newState;
}

export default todoReducer