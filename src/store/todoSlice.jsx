import axios from "axios";

const initialState = {
    todos: [],
};

const todoSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'REMOVE_TODO':
            return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
        case 'SET_TODOS':
            return { ...state, todos: action.payload };
        case 'EDIT_TODOS':
            const updated = state.todos.find(t => t.id === action.payload.id);
            if (updated) {
                const todos = state.todos.filter(t => Number(t.id) !== Number(action.payload.id));
                return { ...state, todos: [...todos, { ...updated, ...action.payload }] };
            }
            return state;
        default:
            return state;
    }
};

export const fetchTodos = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=25');
            dispatch({ type: 'SET_TODOS', payload: response.data });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
};

export const deleteTodo = (id) => {
    return { type: 'REMOVE_TODO', payload: id };
};

export const addTodo = (payload) => ({
    type: 'ADD_TODO',
    payload,
});

export default todoSlice;
