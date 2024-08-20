import { useState } from 'react';

export default function AddWidgetModal({ isOpen, onClose, categories, addWidget }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [widgetName, setWidgetName] = useState('');
  const [widgetContent, setWidgetContent] = useState('');

  const handleAdd = () => {
    const newWidget = {
      id: Date.now(), // Unique ID generation
      name: widgetName,
      content: widgetContent,
    };
    addWidget(selectedCategory, newWidget);
    setWidgetName('');
    setWidgetContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Widget</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 mb-2  border-gray-300  border rounded-md outline-none focus:shadow-green-400 focus:border-green-400 shadow-sm mb-4"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Widget Name"
          required
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          className="w-full p-2 border rounded-md outline-none focus:shadow-green-400 focus:border-green-400 shadow-sm mb-4"
        />
        <input
          type="text"
          placeholder="Widget Content"
          required
          value={widgetContent}
          onChange={(e) => setWidgetContent(e.target.value)}
          className="w-full p-2 border rounded-md outline-none focus:shadow-green-400 focus:border-green-400 shadow-sm mb-4"
        />
        <div className="flex justify-between">
          <button onClick={handleAdd} className="p-2 bg-green-400 text-white rounded">
            Add Widget
          </button>
          <button onClick={onClose} className="p-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
