import { useDispatch, useSelector } from 'react-redux';
import { add, sub } from '@reduxStore/actions/counter';
import { RootState } from '@reduxStore/reducers';

function Home() {
    const dispatch = useDispatch();
    const counter = useSelector((state: RootState) => state.count.countSum);
    console.log(counter);
    return (
        <div>
            <h1>Lets see how fast you can increase the counter</h1>
            <button onClick={() => dispatch(sub())}>-1</button>
            <div>{counter}</div>
            <button onClick={() => dispatch(add())}>+1</button>
        </div>
    );
}

export default Home;
