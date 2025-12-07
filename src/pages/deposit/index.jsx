import { useEffect, useRef, useState } from "react";

import Redux from "@/libs/redux";

import reducer from "./reducer";

function Deposit() {
    console.log('Deposit component rendered');

    const initState = 0;
    const [balance, setBalance] = useState(0);

    const storeRef = useRef(null);
    if (!storeRef.current) {
        console.log('Creating store...');
        try {
            storeRef.current = Redux.createStore(reducer, initState);
            console.log('Store created:', storeRef.current);
        } catch (error) {
            console.error('Error creating store:', error);
        }
    }
    const store = storeRef.current;

    useEffect(() => {
        console.log('useEffect running, store:', store);
        const unsubscribe = store.subscribe(() => {
            setBalance(store.getState())
        });

        return () => {
            unsubscribe();
        }
    }, [store])

    const handleDeposit = () => {
        console.log('Deposit clicked');
        store.dispatch({ type: "deposit", payload: 10 });
    }

    const handleWithdraw = () => {
        console.log('Withdraw clicked');
        store.dispatch({ type: "withdraw", payload: 10 })
    }

    return (
        <>
            <div>
                <h1>tien : ${balance}</h1>
                <button onClick={handleDeposit}>deposit</button>
                <button onClick={handleWithdraw}>withdraw</button>
            </div>
        </>
    )
}

export default Deposit;