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
      <ol class="relative border-l border-dashed border-slate-800">
        {props.items.map(item => (
          <li class="mb-10 ml-6">
            <div class="absolute w-2 h-2 bg-slate-800 rounded-full mt-2 -left-1"></div>
            <time class="mb-1 text-xs font-normal leading-none text-slate-600">{item.time}</time>
            <h3 class="text-lg font-semibold pb-1">{item.heading}</h3>
            <p class="mb-4 text-sm font-normal text-slate-800">{item.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}