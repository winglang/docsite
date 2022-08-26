const { reverseSidebarItems } = require('../src/utils/sidebar');

const testItems = [{ "type": "doc", "id": "getting-started" }, {
  "type": "doc",
  "id": "learning-winglang"
}, {
  "type": "category",
  "label": "Reference",
  "items": [{ "type": "doc", "id": "reference/intro" }, { "type": "doc", "id": "reference/WingSDK" }, {
    "type": "doc",
    "id": "reference/WingConsole"
  }, {
    "type": "category",
    "label": "Previous Versions",
    "items": [{
      "type": "category",
      "label": "WingSDK",
      "items": [{
        "type": "doc",
        "id": "reference/previous_versions/WingSDK/0.0.39",
        "label": "0.0.39"
      }, { "type": "doc", "id": "reference/previous_versions/WingSDK/0.0.40", "label": "0.0.40" }, {
        "type": "doc",
        "id": "reference/previous_versions/WingSDK/1.1.39",
        "label": "1.1.39"
      }, { "type": "doc", "id": "reference/previous_versions/WingSDK/1.2.0", "label": "1.2.0" }],
      "link": { "type": "generated-index", "description": "Reference Documentation" }
    }],
    "link": { "type": "generated-index", "description": "Previous Versions" }
  }],
  "link": { "type": "generated-index", "description": "Reference Documentation" }
}, { "type": "doc", "id": "resources" }];

describe('sidebar', () => {
  it('reverses only the previous versions category and popping the top', () => {
    const results = reverseSidebarItems(testItems);
    expect(results).toMatchSnapshot()
  });
});
