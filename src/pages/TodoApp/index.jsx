import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "@/store/constants";
import { Trash, Pencil, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function TodoApp() {


    const [inputValue, setInputValue] = useState('');
    const [validationValue, setValidationValue] = useState('');
    const [editingId, seteditingID] = useState(null);
    const [editValue, seteditValue] = useState('');


    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);


    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }, [todos])

    const handleSubmit = () => {

        console.log('handleSudmit called');
        console.log('input value')
        if (!inputValue.trim()) {
            console.log("chưa nhập gì cả")
            setValidationValue('please enter the item');
            return
        }
        const isDuplicated = todos.some(todo => todo.text.toLowerCase() === inputValue.toLowerCase());

        if (isDuplicated) {
            console.log("việc bạn muốn làm đã có")
            setValidationValue('this todo already exist');
            setInputValue('');
            setValidationValue('');
            return;
        }

        dispatch({
            type: ADD_TODO,
            payload: {
                id: Date.now(),
                text: inputValue.trim(),
            }
        });


        setInputValue('');
        setValidationValue('');
    };

    const handleDelete = (id) => {
        dispatch({
            type: DELETE_TODO,
            payload: id
        });
    };

    const handleEdit = (todo) => {
        seteditingID(todo.id);
        seteditValue(todo.text);
    }

    const handleSaveEdit = (id) => {
        if (!editValue.trim()) {
            setValidationValue('Công việc của bạn không được để trống');
            return;
        }

        dispatch({
            type: EDIT_TODO,
            payload: {
                id: id,
                text: editValue.trim()
            }
        });
        seteditingID(null);
        seteditValue('');
    }

    const handleCancelEdit = () => {
        seteditingID(null);
        seteditValue('');
    }


    const handlekeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    console.log(' DEBUG - Current todos from Redux:', todos);
    console.log(' DEBUG - Input value:', inputValue);
    console.log(' DEBUG - Validation error:', validationValue);


    return (
        <div className="w-200 h-[500px] bg-sky-100 rounded-2xl p-4">
            <div className="mx-auto w-1/2 h-full bg-gradient-to-br from-emerald-200 to-teal-300 p-6 rounded-2xl">
                <h1 className="text-2xl font-bold text-center mb-6 mt-5">ToDo List</h1>

                <div className="flex gap-2 mb-6" action="">
                    <input
                        className="flex-1 h-10 py-3 px-4 outline-none border border-gray-300 bg-white rounded-lg"
                        type="text"
                        placeholder=" Enter your to do "
                        value={inputValue}
                        onChange={(e) => { const newValue = e.target.value; console.log('input change : ', newValue); setInputValue(newValue); if (validationValue) setValidationValue('') }}
                        onKeyDown={handlekeyPress}
                    />

                </div>

                <button
                    className="flex items-center justify-center h-10 px-6 bg-blue-500 text-black rounded-lg hover:bg-blue-700"
                    onClick={handleSubmit}
                >
                    Add
                </button>
                {validationValue && (<p className="text-red-600 text-sm ml-1">
                    {validationValue}
                </p>)}
            
                <ul className="flex flex-col gap-3 max-h-48 overflow-y-auto ">
                    {todos.map((todo, index) => (
                        <li key={todo.id} className="flex justify-between items-center px-4 py-3 bg-amber-50 rounded-lg w-90 mt-2 ">
                            {editingId === todo.id ? (
                                <>
                                    <input
                                        className="flex-1 mr-2 px-3 py-2 border-2 border-blue-500 rounded outline-none"
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => seteditValue(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="flex gap-2 " > 
                                        <button
                                            className="p-2 hover:bg-green-100 rounded"
                                            onClick={() => handleSaveEdit(todo.id)}
                                        >
                                            <Check size={16} className="text-green-500" />
                                        </button>
                                        <button
                                            className="p-2 hover:bg-gray-100 rounded"
                                            onClick={handleCancelEdit}
                                        >
                                            <X size={16} className="text-gray-500" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-left flex-1">
                                        {index++}. {todo.text}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 hover:bg-red-100 rounded"
                                            onClick={() => handleDelete(todo.id)}
                                        >
                                            <Trash size={18} className="text-red-500" />
                                        </button>
                                        <button
                                            className="p-2 hover:bg-blue-100 rounded"
                                            onClick={() => handleEdit(todo)}
                                        >
                                            <Pencil size={18} className="text-blue-500" />
                                        </button>
                                    </div>
                                </>
                            )
                            }
                        </li>
                    ))}

                    </ul>
                </div>
            
        </div>
    );
}

export default TodoApp;