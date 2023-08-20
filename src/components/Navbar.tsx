import type { Component } from "solid-js"
import type { Page } from "../types"

type Props = {
  setScreen: (id: Page) => void,
}

const navItems: { id: Page, text: string }[] = [
  { id: "xp", text: "Experience" },
  { id: "skills", text: "Skills" },
  { id: "projects", text: "Projects" },
]

export const Navbar: Component<Props> = (props) => {
  return (
    <nav class="py-6 flex justify-between">
      <div class="my-auto cursor-pointer" onClick={() => props.setScreen("home")}>
        <span class="font-mono text-nbg bg-color2 px-3 py-1 rounded">M.M</span>
      </div>
      <div class="flex space-x-2">
        {navItems.map(item => (
          <button
            class="px-3 py-2 rounded text-nfg hover:text-color2 text-sm my-auto hover:bg-color0"
            onClick={() => props.setScreen(item.id)}>{item.text}</button>
        ))}
      </div>
    </nav>
  )
}