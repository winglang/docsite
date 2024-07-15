// Read all the files in the directory
import fs from 'node:fs';
const EXAMPLES_DIR = './examples';
import matter from 'gray-matter'

const getAllExamples = () => {
    const files = fs.readdirSync(EXAMPLES_DIR);
    return files.map(file => {
        const rawFile = fs.readFileSync(`${EXAMPLES_DIR}/${file}`, 'utf-8');
        const { data, content } = matter(rawFile);
        return {
            slug: file.replace('.md', ''),
            content,
            ...data,
        };
    });
}


// Plugin that generates example pages for Wing /docs/examples/{PAGE}
export default async (context, options) => {
    return {
        name: "wing-example-generator",
        async loadContent() {
            return getAllExamples();
        },
        async contentLoaded({ content: examples, actions }) {

            // Add the page /examples
            actions.addRoute({
                path: `/docs/examples`,
                component: require.resolve("../src/components/PageTemplates/ExampleList.tsx"),
                exact: true,
                // see here: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-plugin-content-blog/src/index.ts#L343
                modules: {},
                customData: { examples }
            });


            const slugs = examples.map((page) => page.slug);

            await Promise.all(slugs.map(async (page) => {
                const content = examples.find((p) => p.slug === page);
                return actions.addRoute({
                    path: `/docs/examples/${page}`,
                    component: require.resolve("../src/components/PageTemplates/Example.tsx"),
                    exact: true,
                    // see here: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-plugin-content-blog/src/index.ts#L343
                    modules: {},
                    customData: { ...content, ...page }
                });
            })
            );
        },
    }
};