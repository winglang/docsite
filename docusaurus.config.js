// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const slackUrl = "https://t.winglang.io/slack";

const winglangOrgUrl = "https://github.com/winglang";

const keywords = [
  "Wing language",
  "Wing for cloud",
  "Wing compiler",
  "Wing cloud-oriented programming",
  "cloud-oriented programming",
  "Wing for serverless",
  "Wing programming language",
  "Wing cloud computing",
  "Wing cloud application development",
  "Wing cloud-native",
  "infrastructure from code",
  "Cloud programming language",
  "Cloud application development",
  "Glue logic reduction",
  "Boilerplate code elimination",
  "Serverless computing",
  "Cloud-native languages",
  "Cloud-oriented languages",
  "Cloud programming languages",
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Wing",
  tagline: "Maximum cloud, minimum DevOps",
  url: process.env.DOCUSAURUS_URL ?? `https://${process.env.VERCEL_URL}`,
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "winglang",
  projectName: "docs",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  customFields: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },
  plugins: [
    "docusaurus-plugin-sass", 
    "docusaurus-plugin-segment",

    // this is needed in order to to support symlinked `docs/` directory
    // which is the mechanism we use when we develop locally with the winglang repo.
    // see https://github.com/facebook/docusaurus/issues/3272#issuecomment-876374383
    function (context, options) {
      return {
        name: 'webpack-configuration-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              symlinks: false,
            }
          };
        }
      };
    },
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: 'contributing',
        editUrl: (params) => `${winglangOrgUrl}/wing/tree/main/contributing/${params.docPath}`,
        breadcrumbs: true,
        includeCurrentVersion: false,
        // sidebarPath: require.resolve('./sidebarsCommunity.js'),
        // ... other options
      },
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          includeCurrentVersion: false,
          editUrl: (params) => `${winglangOrgUrl}/wing/tree/main/docs/${params.docPath}`,
        },
        blog: {
          blogTitle: 'What\'s up? The Wing Blog',
          blogDescription: 'The latest news and updates from the Wing team',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Posts',
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        { name: "keywords", content: keywords.join(", ")},
        { content: "Wing is a cloud-oriented programming language. Most programming languages think about computers as individual machines. In Wing, the cloud is the computer.",  name: "description" },
        { content: "Wing Programming Language", property: "og:title" },
        { content: "https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/643fee35043e035a13daa0d5_opengraphv4c.png", property: "og:image" },
        { content: "https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/643fee35043e035a13daa0d5_opengraphv4c.png", property: "og:image:secure_url" },
        { content: "Wing Programming Language", property: "twitter:title" },
        { content: "Wing is a cloud-oriented programming language. Most programming languages think about computers as individual machines. In Wing, the cloud is the computer.", property: "twitter:description" },
        { content: "https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/643fee35043e035a13daa0d5_opengraphv4c.png", property: "twitter:image" },
        { content: "https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/643fee35043e035a13daa0d5_opengraphv4c.png", property: "twitter:image:source_url" },
        { content: "website", property: "og:type" },
        { content: "summary_large_image", name: "twitter:card" }
      ],
      colorMode: {
        defaultMode: "dark",
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '1LUMAGAJDN',

        // Public API key: it is safe to commit it
        apiKey: '1928419050bbd42a73be0c8548b60507',

        indexName: 'winglang',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
      navbar: {
        title: "",
        logo: {
          alt: "Wing Logo",
          src: "../img/wing-logo.svg",
          srcDark: "../img/wing-logo-dark.svg",
          href: "https://winglang.io",
          target: "_self",
        },
        items: [
          {
            href: "https://www.winglang.io/docs/start-here/installation",
            position: "left",
            label: "Install",
            className: "header-text-link",
          },
          {
            href: "https://play.winglang.io/",
            position: "left",
            label: "Playground",
            className: "header-text-link",
          },
          {
            to: "docs",
            position: "left",
            label: "Docs",
            className: "header-text-link",
          },
          {
            href: "https://www.winglang.io/community",
            label: "Community",
            position: "left",
            className: "header-text-link",
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'left',
            className: "header-text-link",
          },
          {
            href: "https://www.winglang.io/contact",
            label: 'Contact',
            position: 'left',
            className: "header-text-link",
          },
          // {
          //   type: "docsVersionDropdown",
          //   position: "right",
          //   dropdownActiveClassDisabled: true,
          // },
          {
            href: slackUrl,
            "aria-label": "Slack server",
            label: " ",
            position: "right",
            className: "header-slack-link",
          },
          {
            href: `${winglangOrgUrl}/wing/`,
            "aria-label": "Winglang Repo",
            label: " ",
            position: "right",
            className: "header-github-link",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          { 
            title: "Documentation",
            items:[
              {
                label: "Installation",
                to:"start-here/installation"
              },
              {
                label: "Getting Started",
                to: "/"
              },
              {
                label: "Concepts",
                to: "core-concepts/inflights"
              }
            ]
          },
          {
            title: "References",
            items: [
              {
                label: "Language Specification",
                to: "contributing/rfcs/language-spec",
              },
              {
                label: "API Reference",
                to: "contributing/rfcs/2023-01-20-wingsdk-spec",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label:"GitHub",
                href: winglangOrgUrl,
              },
              {
                label: "Slack",
                href: slackUrl,
              },
              {
                label:"Contributor's Handbook",
                to: "contributing/"
              },
            ],
          },
	        {
            title: "Terms and policies",
            items: [
              {
                label: "Code of Conduct",
                href: "https://github.com/winglang/wing/blob/main/CODE_OF_CONDUCT.md",
                target: "_blank"
              },
              {
                label: "MIT License",
                href: "https://github.com/winglang/wing/blob/main/LICENSE.md",
                target: "_blank"
              },
              {
                label: "Contribution Policy",
                href: "/terms-and-policies/contributors-terms-of-service.html",
                target: "_blank"
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
        apiKey: "MvkxDOKWzcs7MFrWu1UNaO2bGn1S2RvA",
      },
    }),
};

module.exports = config;
