// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const sidebars = require('./sidebars');
const earlyAccessRequestUrl = 'https://monadahq.typeform.com/waitlist';
const slackUrl = 'https://winglang.slack.com';

const docsRepoUrl = 'https://github.com/winglang/docsite';
const winglangRepoUrl = 'https://github.com/winglang/wing';
const stackOverflowUrl = 'https://stackoverflow.com/questions/tagged/winglang';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wing',
  tagline: 'Maximum cloud, minimum DevOps',
  url: process.env.DOCUSAURUS_URL || 'https://winglang.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  organizationName: 'winglang',
  projectName: 'docs',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en', locales: ['en'],
  },

  plugins: [
    'docusaurus-plugin-sass', 'docusaurus-plugin-segment'
  ],
  presets: [['classic', /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        includeCurrentVersion: false,
        sidebarPath: require.resolve('./sidebars.js'),
        async sidebarItemsGenerator({
                                      defaultSidebarItemsGenerator,
                                      ...args
                                    }) {
          return defaultSidebarItemsGenerator(args);
        },
        editUrl: winglangRepoUrl,
      },
      blog: {
        showReadingTime: true,
        editUrl: winglangRepoUrl,
      },
      theme: {
        customCss: require.resolve('./src/css/custom.css'),
      },
    }),
  ]],

  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        defaultMode: 'dark',
        navbar: {
          title: 'Wing',
          logo: {
            alt: 'Wing Logo', src: 'img/logo.svg', srcDark: 'img/logo-dark.svg',
          },
          items: [
            {
              to: 'blog', label: 'Blog', position: 'left',
            },
            {
              type: 'doc', docId: 'Getting Started/Welcome', position: 'left', label: 'Docs',
            },
            {
              href: 'https://github.com/orgs/winglang/projects/1', docId: 'roadmap', position: 'left', label: 'Roadmap'
            },
            {
              type: 'docsVersionDropdown',
              position: 'right',
              dropdownActiveClassDisabled: true,
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
              href: winglangRepoUrl,
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
                label: 'Getting Started', to: '/docs/Getting Started/Welcome',
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
      segment: {
        apiKey: 'MvkxDOKWzcs7MFrWu1UNaO2bGn1S2RvA',

      },
    }),

};

module.exports = config;
