import type { Component } from "solid-js"
import type { JSX } from "solid-js"

export type Props = {
  icon: JSX.Element
  heading: string
  desc: string
  color: string
  technologies: string[]
}

export const ProjectCard: Component<Props> = (props) => {
  return (
    <div classList={{ "bg-color0 p-6 border-l-4": true, ["border-" + props.color]: true }}>
      <div class="flex space-x-3">
        {props.icon}
        <h4 class="flex-1 text-xl mb-2">{props.heading}</h4>
      </div>
      <p class="text-sm leading-relaxed mb-5">{props.desc}</p>

      <div class="flex flex-wrap">
        {props.technologies.map(tech => (
          <span class="text-xs px-2 py-1 bg-nbg rounded mr-2 mb-2">{tech}</span>
        ))}
      </div>
    </div>
  )
}