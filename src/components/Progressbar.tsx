import type { Component } from "solid-js"

type Props = {
  percentage: number
  color: string
}

export const Progressbar: Component<Props> = (props) => {
  return (
    <div class="w-full h-1 my-auto bg-color0">
      <div classList={{ "h-1 bg-gradient-to-r from-color4 to-color6": true }} style={{ width: `${props.percentage}%` }}></div>
    </div>
  )
} 