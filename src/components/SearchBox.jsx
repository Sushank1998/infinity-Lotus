import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

function SearchBox() {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (input.trim() === "") {
            setData([]); 
            return;
        }

        const timeoutId = setTimeout(() => {
            setLoading(true);
            axios.get(`https://fakestoreapi.com/products`)
                .then(res => {
                    const filteredData = res.data.filter(item =>
                        item.title.toLowerCase().includes(input.toLowerCase())
                    );
                    setData(filteredData);
                    setError("");
                })
                .catch(err => {
                    console.error("Error fetching data:", err);
                    setError("Failed to fetch results.");
                })
                .finally(() => setLoading(false));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [input]);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <div className="absolute text-gray-400 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <IoIosSearch size={24} />
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for products..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

       
            {loading && <p className="text-gray-600 mt-2">Searching...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            
            {data.length > 0 && (
                <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {data.map((item) => (
                        <div key={item.id} className="p-3 hover:bg-gray-100 cursor-pointer">
                            {item.title}
                        </div>
                    ))}
                </div>
            )}

            {!loading && input && data.length === 0 && (
                <p className="text-gray-500 mt-2">No results found.</p>
            )}
        </div>
    );
}

export default SearchBox;
