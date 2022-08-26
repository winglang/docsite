function reverseSidebarItems(items, category = 'root') {
  // Reverse items in categories
  const result = items.map((item) => {
    if (item.type === 'category') {
      return {...item, items: reverseSidebarItems(item.items, `${category}-${item.label}`)};
    }
    return item;
  });
  // Reverse items at current level
  if (/Previous Versions/.test(category)) {
    if (!result.find(x=>x.type !== 'doc')){
      result.reverse();
      result.shift();
    }
  }
  return result;
}

module.exports = {
  reverseSidebarItems
};
