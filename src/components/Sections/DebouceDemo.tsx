import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useDataContext } from '../../context/DataContext';

/**
 * DebounceDemo Section Component
 * 
 * @description
 * Showcases the `useDebounce` hook with real-time text input, delay adjustment,
 * live status indicators ("Typing..." vs "Waiting for input..."), and debounced search results.
 * 
 * Hooks & Context Architecture:
 * - Context: `useDataContext()`
 *   - Connects to global `data` (144 phone models).
 * - State:
 *   - `searchDelay`: Milliseconds before updating `debouncedValue` (default: 500).
 *   - `searchTerm`: Raw, immediate value typed by the user.
 * - Custom Hook: `useDebounce(searchTerm, searchDelay)`
 *   - Delays emitting the input value until typing pauses for `searchDelay` ms.
 * - Effect: `useEffect([debouncedValue])`
 *   - Simulates an external API query by logging `Searching for: [debouncedValue]`
 *     only when the debounce settles, avoiding query spamming.
 * 
 * Derived State:
 * - `isTyping`: Evaluated dynamically as `debouncedValue !== searchTerm`.
 * - `filteredData`: Matches phones containing `debouncedValue` (case-insensitive).
 */
export function DebounceDemo() {
    const { data } = useDataContext();

    const [searchDelay, setSearchDelay] = useState<number>(500);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Settle rapidly changing searchTerm using useDebounce
    const debouncedValue = useDebounce(searchTerm, searchDelay);

    // Side-effect: simulate API call upon settled debouncedValue
    useEffect(() => {
        if (debouncedValue.trim()) {
        console.log(`Searching for: ${debouncedValue.trim()}`);
        }
    }, [debouncedValue]);

    // Reactive phone filter matching the settled debounce search term
    const filteredData = data.filter((item) =>
        item.toLowerCase().includes(debouncedValue.trim().toLowerCase())
    );

    return (
        <div>
        {/* This is from DaisyUI, it's a mock browser added for design purposes only, it does not do anything */}
        <div className="mockup-browser bg-base-100 w-130 mx-auto mt-5 px-5 pb-5 border border-base-300">
            <div className="mockup-browser-toolbar"></div>
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
            <div className="flex flex-col justify-start gap-4 text-left">
                <input
                type="text"
                placeholder="Start typing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered bg-gray-400 text-black w-full"
                />
                {debouncedValue !== searchTerm ? <p>Typing...</p> : <p>Waiting for input...</p>}
                <p>Current Value: {searchTerm}</p>
                <p>Debounced Value (After {searchDelay}ms): {debouncedValue}</p>

                {debouncedValue.trim().length <= 0 ? (
                <p>Type to see results</p>
                ) : filteredData.length === 0 ? (
                <p className="text-gray-400 italic">No matches</p>
                ) : (
                <div className="h-100 overflow-y-scroll">
                    {filteredData.map((item, index) => (
                    <div key={index}>{`${index + 1}. ${item}`}</div>
                    ))}
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}