import type { Component } from "solid-js"

const navItems = [
  { id: "#tech", text: "Technologies" },
  { id: "#projects", text: "Projects" },
  { id: "#xp", text: "Experience" },
]

export const Navbar: Component = () => {
  return (
    <nav class="py-6 flex justify-between">
      <a class="my-auto cursor-pointer" href="#">
        <span class="font-mono text-nbg bg-color2 px-3 py-1 rounded">M.M</span>
      </a>
      <div class="flex space-x-2">
        {navItems.map(item => (
          <a
            href={item.id}
            class="px-3 py-2 rounded text-nfg hover:text-color2 text-sm my-auto hover:bg-color0">{item.text}</a>
        ))}
      </div>
    </nav>
  )
}