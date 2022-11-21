// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();
console.log(process.env.AUTH0_DOMAIN);
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const earlyAccessRequestUrl = "https://monadahq.typeform.com/waitlist";
const slackUrl = "https://winglang.slack.com";

const docsRepoUrl = "https://github.com/winglang/docsite";
const winglangRepoUrl = "https://github.com/winglang/wing";
const stackOverflowUrl = "https://stackoverflow.com/questions/tagged/winglang";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Wing",
  tagline: "Maximum cloud, minimum DevOps",
  url: process.env.DOCUSAURUS_URL || "https://docs.winglang.io",
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
  plugins: ["docusaurus-plugin-sass", "docusaurus-plugin-segment"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          breadcrumbs: false,
          includeCurrentVersion: false,
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
            to: "https://winglang.io/blog",
            position: "left",
            label: "Blog",
            target: "_self",
          },
          {
            href: "https://github.com/orgs/winglang/projects/1",
            docId: "roadmap",
            position: "left",
            label: "Roadmap",
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
            items: [
              {
                label: "Getting Started",
                to: "getting-started",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: stackOverflowUrl,
              },
              {
                label: "Slack",
                href: slackUrl,
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: winglangRepoUrl,
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
