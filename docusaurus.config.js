// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const discordUrl = "https://t.winglang.io/discord";

const winglangOrgUrl = "https://github.com/winglang";
const redirects = require('./redirects');



// const { crete} = require('@docusaurus/plugin-client-redirects')

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
  favicon: "img/favicon.ico",
  organizationName: "winglang",
  projectName: "docs",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  markdown: {
    format: "detect"
  },
  customFields: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },
  plugins: [
    "docusaurus-plugin-sass",
    "docusaurus-plugin-segment",
    './plugins/example-generator.mjs',
    function tailwindPlugin(context, options) {
      return {
        name: 'tailwind-plugin',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
          ];
          return postcssOptions;
        },
      };
    },


    // this is needed in order to support symlinked `docs/` directory
    // which is the mechanism we use when we develop locally with the winglang repo.
    // see https://github.com/facebook/docusaurus/issues/3272#issuecomment-876374383
    function (context, options) {
      return {
        name: "webpack-configuration-plugin",
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              symlinks: false,
            },
            plugins: [new NodePolyfillPlugin()],
          };
        },
      };
    },
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects,
        createRedirects(existingPath) {

          if (existingPath.includes('/docs/api/standard-library')) {
            return [existingPath.replace('/docs/api/standard-library', '/docs/standard-library')];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "contributing",
        path: "contributing",
        routeBasePath: "contributing",
        editUrl: (params) =>
          `${winglangOrgUrl}/wing/tree/main/docs/contributing/${params.docPath}`,
        breadcrumbs: true,
        includeCurrentVersion: false,
        // sidebarPath: require.resolve('./sidebarsCommunity.js'),
        // ... other options
      }
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        path: "api",
        routeBasePath: "docs/api",
        editUrl: (params) =>
          `${winglangOrgUrl}/wing/tree/main/docs/api/${params.docPath}`,
        breadcrumbs: true,
        includeCurrentVersion: false,
        // sidebarPath: require.resolve('./sidebarsCommunity.js'),
        // ... other options
      }
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
          editUrl: (params) => {
            if (/\d+-standard-library\/\d+-cloud/.test(params.docPath)) {
              return `${winglangOrgUrl}/wing/tree/main/libs/wingsdk/src/cloud/${params.docPath
                .split("/")
                .pop()}`;
            }
            return `${winglangOrgUrl}/wing/tree/main/docs/docs/${params.docPath}`;
          },
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "/docs/sitemap.xml",
        },
        blog: {
          blogTitle: "What's up? The Wing Blog",
          blogDescription: "The latest news and updates from the Wing team",
          blogSidebarCount: "ALL",
          blogSidebarTitle: "Posts",
          postsPerPage: "ALL",
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
        { name: "keywords", content: keywords.join(", ") },
        {
          content:
            "Wing is a cloud-oriented programming language. Most programming languages think about computers as individual machines. In Wing, the cloud is the computer.",
          name: "description",
        },
        { content: "Wing Programming Language", property: "og:title" },
        {
          content:
            "/img/opengraph.png",
          property: "og:image",
        },
        {
          content:
            "/img/opengraph.png",
          property: "og:image:secure_url",
        },
        { content: "Wing Programming Language", property: "twitter:title" },
        {
          content:
            "Wing is a cloud-oriented programming language. Most programming languages think about computers as individual machines. In Wing, the cloud is the computer.",
          property: "twitter:description",
        },
        {
          content:
            "/img/opengraph.png",
          property: "twitter:image",
        },
        {
          content:
            "/img/opengraph.png",
          property: "twitter:image:source_url",
        },
        { content: "website", property: "og:type" },
        { content: "summary_large_image", name: "twitter:card" },
      ],
      colorMode: {
        defaultMode: "dark",
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "1LUMAGAJDN",

        // Public API key: it is safe to commit it
        apiKey: "1928419050bbd42a73be0c8548b60507",

        indexName: "winglang",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
      },
      navbar: {
        title: "",
        logo: {
          alt: "Wing Logo",
          src: "../img/winglang-logo-dark.svg",
          srcDark: "../img/winglang-logo-light.svg",
          href: "https://winglang.io",
          target: "_self",
        },
        items: [
          {
            to: "docs",
            position: "left",
            label: "Install",
            className: "header-text-link",
            target: "_self",
          },
         
          {
            to: "docs/why-wing",
            position: "left",
            label: "Learn",
            className: "header-text-link",
            target: "_self",
          },
          {
            to: "docs/api",
            position: "left",
            label: "API",
            className: "header-text-link",
            target: "_self",
          },
          {
            // href: "https://github.com/winglang/examples",
            to: "docs/examples",
            position: "left",
            label: "Examples",
            className: "header-text-link",
          },
          {
            href: "https://www.winglang.io/play/",
            position: "left",
            label: "Playground",
            className: "header-text-link",
            target: "_self",
          },
          
          {
            position: 'left',
            label: 'Community & Support',
            items: [
              {
                to: "blog",
                label: "Blog",
                target: "_self",
                className: "header-text-link",
              },
              {
                to: "contributing",
                label: "Contributing",
                target: "_self",
                className: "header-text-link",
              },
              {
                href: "/community",
                label: "Community",
                className: "header-text-link",
                target: "_self",
              },
              {
                href: "/contact",
                label: "Contact",
                target: "_self",
                className: "header-text-link",
              },
            ]
          },
          
          {
            href: discordUrl,
            "aria-label": "Discord server",
            label: " ",
            position: "right",
            target: "_self",
            className: "header-discord-link",
          },
          {
            href: `${winglangOrgUrl}/wing/`,
            "aria-label": "Winglang Repo",
            label: " ",
            position: "right",
            className: "header-github-link nav-git-mobile",
          },
          {
            type: "custom-GitHubButton",
            position: "right",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Installation",
                to: "/docs",
              },
              {
                label: "Getting Started",
                to: "/docs",
              },
              {
                label: "Concepts",
                to: "/docs/concepts/inflights",
              },
            ],
          },
          {
            title: "References",
            items: [
              {
                label: "Language Specification",
                to: "/docs/api/language-reference",
              },
              {
                label: "API Reference",
                to: "/docs/api/standard-library",
              },
              {
                label: "1.0 Roadmap",
                to: "/blog/2024/08/29/updated-roadmap",
              },
              {
                label: "Press Kit",
                to: "https://drive.google.com/drive/folders/1Qi0v3v638lLxxP9y80i4TyweZbkXFsZ_",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: discordUrl,
              },
              {
                label: "GitHub",
                href: winglangOrgUrl,
              },
              {
                label: "Report an Issue",
                href: "https://github.com/winglang/wing/issues/new/choose",
              },
              {
                label: "Contributor's Handbook",
                to: "contributing/",
              },
            ],
          },
          {
            title: "Terms and policies",
            items: [
              {
                label: "Code of Conduct",
                href: "https://github.com/winglang/wing/blob/main/CODE_OF_CONDUCT.md",
                target: "_blank",
              },
              {
                label: "MIT License",
                href: "https://github.com/winglang/wing/blob/main/LICENSE.md",
                target: "_blank",
              },
              {
                label: "Contribution Policy",
                href: "https://github.com/winglang/wing/blob/main/CONTRIBUTORS_TERMS_OF_SERVICE.md",
                target: "_blank",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Wing Cloud, Inc. `,
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
