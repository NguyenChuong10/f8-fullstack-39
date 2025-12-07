import { useContext , useEffect , useRef , useState } from "react";
import Context from './Context';

const ERROR_MESSAGE = 'Could not find  react-redux context value  please ensure the component is wrapped in a <Provider>'

export const useStore = () => {
    const store = useContext(Context);

    if(!store) {
        throw new Error(ERROR_MESSAGE)
    }
    return store;
}

export const useDispatch = () => {
    const store = useStore();
    return store.dispatch;
}

export const useSelector = (selector) => {
    //lấy state từ cái store ban đầu moẹ nó mất gần 2 ngày để hiểu
    const store = useStore();
    //sử dụng usestate để lấy giá trị ban đầu từ store bằng selector tra ve mot ham selector de lay state tuw store ban dau
    const[selectedState , setSelectedState] = useState(() => {selector(store.getState())})
    //Sau do luu gia tri nay vao useRef de cash gia tri nay mot lan ko bi rerender 

    const prevSelectedRef = useRef(selectedState);
    const prevStateRef = useRef(store.getState());
    const selectorRef = useRef(selector);
    selectorRef.current = selector;

    useEffect(() => {
    const checkForUpdates = () => {
      const currentState = store.getState();
      const newSelected = selectorRef.current(currentState);

      //  Cảnh báo nếu selector trả object mới nhưng state không đổi
      if (
        prevStateRef.current === currentState && // state không đổi
        typeof newSelected === "object" &&
        newSelected !== prevSelectedRef.current
      ) {
        console.warn(
          "Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders."
        );
      }

      // 5️⃣ Update nếu khác
      if (newSelected !== prevSelectedRef.current) {
        prevSelectedRef.current = newSelected;
        setSelectedState(newSelected);
      }

      prevStateRef.current = currentState;
    };

    const unsubscribe = store.subscribe(checkForUpdates);

    checkForUpdates(); // sync lần đầu

    return unsubscribe;
  }, [store]);

  return selectedState;
}

