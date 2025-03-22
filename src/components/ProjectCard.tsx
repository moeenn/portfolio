import type { Component } from "solid-js"
import type { JSX } from "solid-js"

export type Props = {
  icon: JSX.Element
  heading: string
  desc: string
  technologies: string[]
}

export const ProjectCard: Component<Props> = (props) => {
  return (
    <div class="bg-slate-100 p-6 border-l-2 border-dotted border-slate-900">
      <div class="flex space-x-3">
        {props.icon}
        <h4 class="flex-1 text-xl mb-2">{props.heading}</h4>
      </div>
      <p class="text-sm leading-relaxed mb-5">{props.desc}</p>

      <div class="flex flex-wrap">
        {props.technologies.map(tech => (
          <span class="text-xs px-2 py-1 bg-slate-300 rounded mr-2 mb-2">{tech}</span>
        ))}
      </div>
    </div>
  )
}