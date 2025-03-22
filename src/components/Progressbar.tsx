import type { Component } from "solid-js"

type Props = {
  percentage: number
}

export const Progressbar: Component<Props> = (props) => {
  return (
    <div class="w-full h-1 my-auto bg-slate-200">
      <div classList={{ "h-1 bg-slate-900": true }} style={{ width: `${props.percentage}%` }}></div>
    </div>
  )
} 