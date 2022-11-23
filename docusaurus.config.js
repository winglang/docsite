// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const slackUrl = "https://t.winglang.io/slack";

const winglangRepoUrl = "https://github.com/winglang/wing";
const stackOverflowUrl = "https://stackoverflow.com/questions/tagged/winglang";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Wing",
  tagline: "Maximum cloud, minimum DevOps",
  url: process.env.DOCUSAURUS_URL ?? `https://${process.env.VERCEL_URL}`,
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
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
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          breadcrumbs: false,
          includeCurrentVersion: false,
          editUrl: (params) => `${winglangRepoUrl}/tree/main/docs/${params.docPath}`,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        title: "Wing",
        logo: {
          alt: "Wing Logo",
          src: "img/logo-black.png",
          srcDark: "img/logo-turq.png",
          href: "https://winglang.io",
          target: "_self",
        },
        items: [
          {
            type: "doc",
            docId: "welcome",
            position: "left",
            label: "Docs",
          },
          {
            type: 'doc',
            docId: 'status',
            position: 'left',
            label: 'Roadmap'
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            href: slackUrl,
            "aria-label": "Slack server",
            label: " ",
            position: "right",
            className: "header-slack-link",
          },
          {
            href: winglangRepoUrl,
            "aria-label": "GitHub repository",
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
                to:"getting-started/installation"
              },
              {
                label: "Getting Started",
                to: "getting-started/hello"
              },
              {
                label: "Concepts",
                to: "category/concepts"
              }
            ]
          },
          {
            title: "References",
            items: [
              {
                label: "Language Specification",
                to: "reference/spec",
              },
              {
                label: "API Reference",
                to: "reference/sdk",
              },
              {
                label: "Roadmap",
                to: "status"
              }
            ],
          },
          {
            title: "Community",
            items: [
              {
                label:"GitHub",
                href: `${winglangRepoUrl}`
              },
              {
                label: "Slack",
                href: slackUrl,
              },
              {
                label: "GitHub Discussions",
                href: `${winglangRepoUrl}/discussions`
              },
              {
                label: "Stack Overflow",
                href: stackOverflowUrl,
              },
              {
                label:"Report an Issue",
                href: `${winglangRepoUrl}/issues/new/choose`
              },
              {
                label:"Contributor's Handbook",
                to: "contributors/handbook"
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
