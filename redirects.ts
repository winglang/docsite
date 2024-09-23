// Redirects in place for v2 of documentation
export default [
    {
        to: "/docs/",
        from: ["/docs/start-here/installation"],
    },
    {
        to: "/docs/api/cli/",
        from: ["/docs/tools/cli"],
    },
    {
        to: "/docs/api/language/variable-declaration",
        from: ["/docs/examples/variable-declaration"],
    },
    {
        to: "/docs/api/language/primitives",
        from: ["/docs/examples/primitives"],
    },
    {
        to: "/docs/api/language/functions-example",
        from: ["/docs/examples/functions-example"],
    },
    {
        to: "/docs/api/language/flow-control",
        from: ["/docs/examples/flow-control"],
    },
    {
        to: "/docs/api/language/optionality",
        from: ["/docs/examples/optionality"],
    },
    {
        to: "/docs/api/language/json",
        from: ["/docs/examples/json"],
    },
    {
        to: "/docs/api/language/structs",
        from: ["/docs/examples/structs"],
    },
    {
        to: "/docs/api/language/classes",
        from: ["/docs/examples/classes"],
    },
    {
        to: "/docs/api/language/using-javascript",
        from: ["/docs/examples/using-javascript"],
    },
    {
        to: "/docs/api/language/api-gateway",
        from: ["/docs/examples/api-gateway"],
    },
    {
        to: "/docs/api/language/singletons",
        from: ["/docs/examples/singletons"],
    },
    {
        to: "https://github.com/winglang/examples",
        from: ["/docs/examples/examples-repository"],
    },
    {
        to: "/docs/api/language-reference",
        from: ["/docs/language-reference"],
    },
    {
        to: "/docs/why-wing",
        from: ["/docs/concepts/why-wing"],
    },
    {
        to: "/docs/platforms/AWS/awscdk",
        from: ["/docs/platforms/awscdk"],
    },
    {
        to: "/docs/platforms/AWS/tf-aws",
        from: ["/docs/platforms/tf-aws"],
    },
    {
        to: "/docs/platforms/google-cloud/tf-gcp",
        from: ["/docs/platforms/tf-gcp"],
    },
    {
        to: "/docs/platforms/microsoft-azure/tf-azure",
        from: ["/docs/platforms/tf-azure"],
    },
    {
        to: "/docs/winglibs/what-are-winglibs",
        from: ["/docs/libraries"],
    },
    {
        to: "/docs/api/analytics",
        from: ["/docs/analytics"],
    },
    { to: '/docs/api/language', from: ['/docs/category/examples'] },
    // Standard Library redirects for docs v2
    { to: '/docs/api/category/aws', from: ['/docs/category/aws'] },
    { to: '/docs/api/category/cloud', from: ['/docs/category/cloud'] },
    { to: '/docs/api/category/expect', from: ['/docs/category/expect'] },
    { to: '/docs/api/category/fs', from: ['/docs/category/fs'] },
    { to: '/docs/api/category/http', from: ['/docs/category/http'] },
    { to: '/docs/api/category/math', from: ['/docs/category/math'] },
    { to: '/docs/api/category/sim', from: ['/docs/category/sim'] },
    { to: '/docs/api/category/std', from: ['/docs/category/std'] },
    { to: '/docs/api/standard-library/ui/', from: ['/docs/category/ui'] },
    { to: '/docs/api/category/util', from: ['/docs/category/util'] },
    { to: '/docs/api/standard-library', from: ['/docs/category/standard-library'] },

    { to: '/docs/concepts/platforms', from: ['/docs/platforms/platforms'] },

    // redirects for wing.learn section
    { to: "https://learn.winglang.io/learn", from: ["/learn/"] },
    { to: "https://learn.winglang.io/learn/preflight-inflight", from: ["/learn/preflight-inflight"] },
    { to: "https://learn.winglang.io/learn/bucket", from: ["/learn/bucket"] },
    { to: "https://learn.winglang.io/learn/counter", from: ["/learn/counter"] },
    { to: "https://learn.winglang.io/learn/queue", from: ["/learn/queue"] },
    { to: "https://learn.winglang.io/learn/topic", from: ["/learn/topic"] },

    // Redirects for winglibs
    { to: "/docs/libraries/", from: ["/docs/winglibs/what-are-winglibs"] },
    { to: "/docs/libraries/using-winglibs", from: ["/docs/winglibs/using-winglibs"] },
    { to: "/docs/libraries/creating-winglibs", from: ["/docs/winglibs/creating-winglibs"] },
    { to: "/docs/libraries/all-winglibs", from: ["/docs/winglibs/all-winglibs"] },
    
]
