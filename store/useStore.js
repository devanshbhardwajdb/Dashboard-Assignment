import create from 'zustand';

const useStore = create((set) => ({
  categories: [],

  setCategories: (categories) => set({ categories }),

  addWidget: (categoryName, newWidget) => set((state) => {
    const updatedCategories = state.categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: [...category.widgets, newWidget],
        };
      }
      return category;
    });
    return { categories: updatedCategories };
  }),

  removeWidget: (categoryName, widgetId) => set((state) => {
    const updatedCategories = state.categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });
    return { categories: updatedCategories };
  }),
}));

export default useStore;
