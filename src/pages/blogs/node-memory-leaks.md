---
layout: ../../layouts/BlogLayout.astro
title: "Detect memory leaks in NodeJS applications"
desc: "Bad code is not only hard to maintain, it can also be hard on the running it. This articles gives a general idea of how to detect memory leaks in a NodeJs/Express application."
url: "/blogs/node-memory-leaks"
---

The NodeJS application needs to be started with the Garbage collector exposed.

```bash
# run nodejs process with GC exposed
$ node --expose-gc ./src/index.mjs
```

**Note**: Make sure that the GC is not exposes when applications are running in production.

#### Detect memory leak in `express` application

```js
import express from "express";
import process from "node:process";

/**
 * calculate current process memory usage in MBs
 * @returns {number}
 */
function memory() {
	const usage = process.memoryUsage().heapUsed;
	return Math.round((usage / 1024 / 1024) * 100) / 100;
}

/** @returns {Promise<void>} */
async function main() {
	const app = express();
	app.use(express.json());

	app.get("/", (_req, res) => res.json({ message: "hello world" }));
	app.get("/memory", (_req, res) => res.json({ memory: memory() }));

	app.listen(5000, () => {
		console.log("starting server...");
	});

	/* trigger GC every 5 seconds */
	setInterval(() => {
		try {
			if (global.gc) {
				/**
				 * manually call the garbage collector.
				 * this will only work when GC is exposed
				 */
				global.gc();
				console.log("running gc...");
			}
		} catch (err) {
			console.error("GC failed:", err);
		}
	}, 5000);
}

main().catch(console.error);
```

##### Todo

- Detect memory leaks [Link](<[https://techtldr.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/](https://techtldr.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/)>)
