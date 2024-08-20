import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import AddWidgetModal from '../../components/AddWidgetModal';
import WidgetSearch from '../../components/WidgetSearch';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function DashboardPage() {
  const { categories, setCategories, addWidget, removeWidget } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const jsonData = require('../../data/dashboard.json');
    setCategories(jsonData.categories);
  }, [setCategories]);

  const handleWidgetSelect = (widgetId) => {
    setSelectedWidgetId(widgetId);
    
    // Find the category containing the selected widget
    const foundCategory = categories.find(category =>
      category.widgets.some(widget => widget.id === widgetId)
    );

    setSelectedCategory(foundCategory);
  };

  const filteredCategories = selectedCategory
    ? [{
        ...selectedCategory,
        widgets: selectedCategory.widgets.filter(widget => widget.id === selectedWidgetId)
      }]
    : categories;

  return (
    <>
      <WidgetSearch onWidgetSelect={handleWidgetSelect} />
      <div className="bg-gray-100 px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col gap-4">
        {filteredCategories.map((category) => (
          <div key={category.name} className="my-4 flex flex-col gap-3">
            <h2 className="text-xl font-bold">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="p-6 bg-white rounded-lg shadow-md shadow-gray-200 relative">
                  <h3 className="text-lg font-semibold">{widget.name}</h3>
                  {widget.data ? (
                    <div className="chart-container" style={{ height: '200px', width: '100%' }}>
                      {widget.name === "Response Times" ? (
                        <Line 
                          data={widget.data}
                          options={{
                            plugins: {
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}`;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      ) : (
                        <Doughnut 
                          data={widget.data}
                          options={{
                            plugins: {
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    let label = context.label || '';
                                    if (context.parsed !== null) {
                                      label += `: ${context.parsed} (${context.raw}%)`;
                                    }
                                    return label;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <p>{widget.content}</p>
                  )}
                  <button
                    onClick={() => removeWidget(category.name, widget.id)}
                    className="absolute top-2 right-2 text-black bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-4 border-dashed border-2 rounded-lg font-semibold text-green-500 bg-gray-200 col-span-1 sm:col-span-2 lg:col-span-3"
              >
                + ADD WIDGET
              </button>
            </div>
          </div>
        ))}
        {isModalOpen && (
          <AddWidgetModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            categories={categories} // Pass categories here
            addWidget={addWidget}
          />
        )}
      </div>
    </>
  );
}
