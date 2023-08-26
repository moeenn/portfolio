import type { Component } from "solid-js"
import { createSignal, onMount } from "solid-js"
import { Icon } from "solid-heroicons"
import { chevronUp } from "solid-heroicons/outline";

export const ScrolltopButton: Component = () => {
  const [visible, setVisible] = createSignal(false)
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  })

  return (
    <div classList={{ "opacity-0": !visible(), "opacity-100": visible(), "transition-all duration-300": true }}>
      <button onClick={toTop} title="Go To Top"
        class="fixed z-90 bottom-8 right-8 border-0 w-10 h-10 rounded-full drop-shadow-md bg-color2 text-nbg text-3xl font-bold">
        <Icon path={chevronUp} class="h-4 w-4 m-auto" />
      </button>
    </div>
  )
}