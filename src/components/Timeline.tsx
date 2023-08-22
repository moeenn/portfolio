import type { Component } from "solid-js"

export type TimelineItem = {
  time: string
  heading: string
  desc: string
}

type Props = {
  items: TimelineItem[]
}

export const Timeline: Component<Props> = (props) => {
  return (
    <div class="ml-2">
      <ol class="relative border-l border-dashed border-color1">
        {props.items.map(item => (
          <li class="mb-10 ml-6">
            <div class="absolute w-3 h-3 bg-color1 rounded-full mt-1.5 -left-1.5"></div>
            <time class="mb-1 text-sm font-normal leading-none opacity-60">{item.time}</time>
            <h3 class="text-lg font-semibold">{item.heading}</h3>
            <p class="mb-4 text-sm font-normal opacity-80">{item.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}