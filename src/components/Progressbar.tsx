import type { Component } from "solid-js"

type Props = {
  percentage: number
}

export const Progressbar: Component<Props> = (props) => {
  return (
    <div class="w-full bg-color0 h-1 my-auto">
      <div class="bg-color4 h-1" style={{ width: `${props.percentage}%` }}></div>
    </div>
  )
} 