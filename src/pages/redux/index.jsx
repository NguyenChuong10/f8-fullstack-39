import { useDispatch, useSelector } from "react-redux";

function Redux() {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();
    
    console.log(count);
    return (
        <div>
            <h1> Count is {count} </h1>
            <button onClick={() => dispatch({type:"increase"})}>tang so luong</button>
            <button onClick={() => dispatch({type:"decrease"})}>giam so luong</button>
        </div>
         
    );
}

    
export default Redux;