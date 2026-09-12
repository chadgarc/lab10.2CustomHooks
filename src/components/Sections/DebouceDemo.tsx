import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useDataContext } from '../../context/DataContext';

export function DebounceDemo() {

    const { data } = useDataContext();

    const [searchDelay, setSearchDelay] = useState(500);
    const [searchTerm, setSearchTerm] = useState('');

    const deboucedValue = useDebounce(searchTerm.trim(), searchDelay);
    
    return (
        <div>
            {/* This is from DaisyUI, it's a mock browser added for design purposes only, it does not do anything */}
            <div className="mockup-browser bg-base-100 w-130 mx-auto mt-5 px-5 pb-5 border border-base-300">
                <div className="mockup-browser-toolbar">
                </div>
                <div className="flex flex-col w-full">
                    <h2>Debounce Search Demo</h2>
                    <div className="flex justify-start items-center gap-2 mb-4 ms-10">
                        <p>Debounce Delay (ms):</p>
                        <input
                            type="number"
                            value={searchDelay}
                            onChange={(e) => setSearchDelay(Number(e.target.value))}
                            className="input input-bordered w-20 bg-gray-400 text-black max-w-xs"
                        />
                    </div>
                    <div className='flex flex-col justify-start gap-4 text-left'>
                        <input
                            type="text"
                            placeholder="Start typing..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered bg-gray-400 text-black w-full"
                        />
                        {deboucedValue !== searchTerm ? <p>Typing...</p> : <p>Waiting for input...</p>}
                        <p>Current Value: {searchTerm}</p>
                        <p>Debounced Value (After {searchDelay}ms): {deboucedValue}</p>
                        {deboucedValue.length <= 0 ? <p>Type to see results</p>: <div className='h-100 overflow-y-scroll'>
                            {data.map((item, index) => {
                                if (item.toLowerCase().includes(deboucedValue.toLowerCase())) {
                                    return (
                                        <div key={index}>{`${index + 1}. ${item}`}</div>
                                    )
                                }
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}  