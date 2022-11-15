/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  defaultSidebar:  [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'doc',
          id: 'Getting Started/Welcome',
        },
        {
          type: 'doc',
          id: 'Getting Started/Rationale',
        },
      ],
    },
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {
          type: 'doc',
          id: 'Introduction/Installation',
        },
        {
          type: 'doc',
          id: 'Introduction/Hello Wing',
        },
      ],
    },
    {
      type: 'category',
      label: 'Language Reference',
      items: [
        {
          type: 'doc',
          id: 'Language Reference/CLI Reference',
        },
        {
          type: 'doc',
          id: 'Language Reference/SDK Reference',
        },
      ],
    },
    {
      type: 'doc',
      id: 'FAQ',
    }
  ],
};

module.exports = sidebars;
