import type { Component } from "solid-js"
import { createSignal, Show } from "solid-js"
import { Container } from "./Container";
import { Icon } from "solid-heroicons"
import { bars_2 } from "solid-heroicons/outline";

const navItems = [
  { id: "#expertise", text: "Expertise" },
  { id: "#projects", text: "Projects" },
  { id: "#xp", text: "Experience" },
  { id: "#contact", text: "Contact Me" },
]

export const Navbar: Component = () => {
  const [visible, setVisible] = createSignal(false)

  return (
    <Container>
      <nav>
        <div class="py-6 flex justify-between">
          <a class="my-auto cursor-pointer" href="#">
            <span class="font-mono text-nbg bg-color2 px-3 py-1">M.M</span>
          </a>

          <div class="block md:hidden">
            <div classList={{ "hover:bg-color0 p-2 cursor-pointer": true, "bg-color0": visible() }} onClick={() => setVisible(!visible())}>
              <Icon path={bars_2} class="text-nfg h-6 w-6" />
            </div>
          </div>

          <div class="hidden md:flex md:space-x-2">
            {navItems.map(item => (
              <a
                href={item.id}
                class="px-3 py-2 rounded text-nfg hover:text-color2 text-sm my-auto hover:bg-color0">{item.text}</a>
            ))}
          </div>
        </div>

        <Show when={visible()}>
          <div class="flex flex-col md:hidden bg-color0 rounded py-2">
            {navItems.map(item => (
              <a
                href={item.id}
                class="px-3 py-2 text-nfg hover:text-color0 hover:bg-color2 text-sm my-auto">{item.text}</a>
            ))}
          </div>
        </Show>
      </nav>
    </Container>
  )
}