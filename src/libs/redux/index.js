const Redux = {
    createStore(reducer, preloadedState) {
       
        let state = reducer(preloadedState, {
            type: "@@redux/INITj.l.z.h.t.o"
        });
        
       
        let listeners = [];

        return { 
        
            getState() {
                return state;
            },
            
           
            dispatch(action) {
                state = reducer(state, action);
                listeners.forEach(listener => listener());
            },
            
  
            subscribe(listener) {
                listeners.push(listener);
                
                // 6. Hàm unsubscribe xóa listener
                return () => {
                    listeners = listeners.filter(l => l !== listener);
                };
            }
        }
    }
};

export default Redux;