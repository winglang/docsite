// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const {reverseSidebarItems} = require("./src/utils/sidebar");

const discordInviteUrl = 'https://discord.gg/HEKYFXm6U6';
const earlyAccessRequestUrl = 'https://monadahq.typeform.com/waitlist';
const slackUrl = 'https://winglang.slack.com';

const monadaBlogUrl = "https://blog.winglang.io"
const monadaDocsRepoUrl = 'https://github.com/monadahq/winglang-docs';
const winglangRepoUrl = 'https://github.com/monadahq/winglang';
const twitterUrl = 'https://twitter.com/winglangio';
const stackOverflowUrl = 'https://stackoverflow.com/questions/tagged/wing';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wing',
  tagline: 'Fly to a new kind of cloud!',
  url: process.env.DOCUSAURUS_URL || 'https://docs.winglang.io',
  baseUrl: '/',
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
          return reverseSidebarItems(sidebarItems);
        },
        editUrl: monadaDocsRepoUrl,
      },
      blog: {
        showReadingTime: true,
        editUrl: monadaDocsRepoUrl,
      },
      theme: {
        customCss: require.resolve('./src/css/custom.css'),
      },
    }),
  ]],

  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Wing',
        logo: {
          alt: 'Wing Logo', src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc', docId: 'tutorial', position: 'left', label: 'Tutorial',
          },
          {
            href: monadaBlogUrl, position: 'left', label: 'Blog',
          },
          {
            type: 'doc', docId: 'getting-started', position: 'left', label: 'Docs',
          },
          {
            type: 'doc', docId: 'roadmap', position: 'left', label: 'Roadmap',
          },
          {
            href: earlyAccessRequestUrl, label: 'Request Early Access', position: 'right',
          },
          {
            href: slackUrl,
            "aria-label": "Slack server",
            label: ' ',
            position: 'right',
            className: 'header-slack-link'
          },
          {
            href: monadaDocsRepoUrl,
            "aria-label": "GitHub repository",
            label: ' ',
            position: 'right',
            className: 'header-github-link'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [{
              label: 'Getting Started', to: '/docs/getting-started',
            }],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow', href: stackOverflowUrl,
              },
              {
                label: 'Slack', href: slackUrl,
              },
              {
                label: 'Twitter', href: twitterUrl,
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog', to: '/blog',
              },
              {
                label: 'GitHub', href: winglangRepoUrl,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Monada, Inc. `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
