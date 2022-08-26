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
    // are all the items in this category docs?
    if (!result.find(x => x.type !== 'doc')) {
      result.reverse();
      result.shift(); // pop the top element off because it's the 'latest' version and we don't need to display that in the previous versions
    }
  }
  return result;
}

module.exports = {
  reverseSidebarItems
};
