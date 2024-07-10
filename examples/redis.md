---
title: "Wing with Redis"
subtitle: "Quick pattern to integrate with the redis winglib"
type: 
  - "guide"
  - "pattern"
  - "interactive-tutorial"
platform:
  - "awscdk"
  - "tf-aws"
  - "tf-gcp"
  - "tf-azure"
  - "sim"
language:
  - "wing"
githubURL: git@github.com:winglang/examples.git
coverImage: "https://github.com/winglang/examples/raw/main/examples/redis/diagram.png"
resources:
  - label: "Explore the Redis winglib"
    href: "https://github.com/winglang/winglibs/tree/main/redis"
  - label: "Explore all the winglibs"
    href: "https://github.com/winglang/winglibs"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
---

# Redis example

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sunt at molestiae, eaque est vel eum enim, beatae quidem, accusamus odio labore alias maiores dicta ratione qui laborum quo temporibus?

```js
bring cloud;
bring ex;
bring util;

let queue = new cloud.Queue();
let redis = new ex.Redis();

queue.setConsumer(inflight (message: str) => {
  redis.set("hello", message);
}, timeout: 3s);

test "Hello, world!" {
  queue.push("world!");

  util.waitUntil((): bool => {
    log("Checking if redis key exists");
    return redis.get("hello") != nil;
  });

  assert("world!" == "${redis.get("hello")}");
}
```

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sunt at molestiae, eaque est vel eum enim, beatae quidem, accusamus odio labore alias maiores dicta ratione qui laborum quo temporibus?