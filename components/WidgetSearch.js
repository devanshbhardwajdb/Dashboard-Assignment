import { useState } from 'react';
import useStore from '../store/useStore';
import { FaSearch } from "react-icons/fa";

export default function WidgetSearch({ onWidgetSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories } = useStore();

  const filteredWidgets = searchTerm
    ? categories.flatMap(category =>
        category.widgets.filter(widget =>
          widget.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <div className="bg-gray-200 flex flex-col items-center relative p-4 shadow-sm shadow-gray-100">
      <div className='flex items-center justify-center gap-4'>
        {/* <FaSearch className='text-3xl' /> */}
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[50vw] p-2 border rounded-md outline-none focus:shadow-green-400 focus:border-green-400 shadow-sm"
        />
      </div>

      <div className='absolute z-50 bg-gray-200 w-1/2 top-full'>
        {filteredWidgets.map(widget => (
          <div 
            key={widget.id} 
            className="border border-black/20 p-2 cursor-pointer"
            onClick={() => {onWidgetSelect(widget.id); setSearchTerm("")}}
          >
            <h3 className="font-semibold">{widget.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
