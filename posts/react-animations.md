---
title: "Animations in React"
desc: "Rich animations can breathe life into plain-looking user interfaces. Here is how we can implement animations in a React application."
category: "Javascript"
tags: ["Front-end", "React", "Typescript"]
---

## Installation

```
$ npm i framer-motion
```

## Animation accordion example

### Method One

```ts
import { FC, useState } from "react";
import { Variants, motion } from "framer-motion"

const variants: Variants = {
  open: { opacity: 1, height: "100%" },
  closed: { opacity: 0, height: 0, overflow: "hidden" },
}

export const AnimatedToggle: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button className="text-xs bg-stone-200 hover:bg-stone-100 rounded px-3 py-2"
        onClick={() => setOpen(o => !o)}
      >Toggle</button>

      <motion.div variants={variants} initial="closed" exit="closed"
      animate={open ? "open" : "closed"}>
        <p className="text-xs leading-relaxed pt-6">Lorem ipsum dolor sit...</p>
      </motion.div>
    </div>
  )
}
```

### Method Two

```ts
import { FC, useState } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion"

const variants: Variants = {
  open: { opacity: 1, height: "100%" },
  closed: { opacity: 0, height: 0, overflow: "hidden" },
}

export const AnimatedToggle: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button className="text-xs bg-stone-200 hover:bg-stone-100 rounded px-3 py-2"
        onClick={() => setOpen(o => !o)}
      >Toggle</button>

      <AnimatePresence>
        {open && (
          <motion.div variants={variants} initial="closed" exit="closed" animate="open">
            <p className="text-xs leading-relaxed pt-6">Lorem ipsum dolor sit...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**Note**: Avoid adding classes directly on `motion.*` elements because it can cause janky animations.
