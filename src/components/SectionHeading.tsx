import type { Component } from "solid-js"

type Props = {
  text: string
}

export const SectionHeading: Component<Props> = (props) => {
  return (
    <h3 class="text-2xl space-x-2 mb-5">
      <span class="text-color1 font-normal">#</span>
      <span>{props.text}</span>
    </h3>
  )
}