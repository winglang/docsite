// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const {reverseSidebarItems} = require("./src/utils/sidebar");

const discordInviteUrl = 'https://discord.gg/HEKYFXm6U6';
let monadaDocsRepoUrl = 'https://github.com/monadahq/winglang-docs';
let winglangRepoUrl = 'https://github.com/monadahq/winglang';
let twitterUrl = 'https://twitter.com/winglangio';
let stackOverflowUrl = 'https://stackoverflow.com/questions/tagged/wing';



/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wing',
  tagline: 'Fly to a new kind of cloud!',
  url: process.env.DOCUSAURUS_URL || 'https://monadahq.github.io',
  baseUrl: process.env.DOCUSAURUS_BASE_URL ?? '/winglang-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  organizationName: 'monadahq',
  projectName: 'winglang-docs',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en', locales: ['en'],
  },

  plugins: [
    'docusaurus-plugin-sass',

  ],
  presets: [['classic', /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),

        async sidebarItemsGenerator({
                                      defaultSidebarItemsGenerator,
                                      ...args
                                    }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          console.log('items:', JSON.stringify(sidebarItems));
          return reverseSidebarItems(sidebarItems);
        },
        editUrl: monadaDocsRepoUrl,
      }, blog: {
        showReadingTime: true,
        editUrl: monadaDocsRepoUrl,
      }, theme: {
        customCss: require.resolve('./src/css/custom.css'),
      },
    }),
  ]],

  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Wing', logo: {
          alt: 'Wing Logo', src: 'img/logo.svg',
        }, items: [{
          type: 'doc', docId: 'getting-started', position: 'left', label: 'Docs',
        }, {
          href: monadaDocsRepoUrl, label: 'GitHub', position: 'right',
        },],
      }, footer: {
        style: 'dark', links: [{
          title: 'Documentation', items: [{
            label: 'Getting Started', to: '/docs/getting-started',
          },],
        }, {
          title: 'Community', items: [{
            label: 'Stack Overflow', href: stackOverflowUrl,
          }, {
            label: 'Discord', href: discordInviteUrl,
          }, {
            label: 'Twitter', href: twitterUrl,
          },],
        }, {
          title: 'More', items: [{
            label: 'Blog', to: '/blog',
          }, {
            label: 'GitHub', href: winglangRepoUrl,
          },],
        },], copyright: `Copyright © ${new Date().getFullYear()} Monada, Inc. Built with Docusaurus.`,
      }, prism: {
        theme: lightCodeTheme, darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
