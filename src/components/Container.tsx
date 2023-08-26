import type { Component, JSX } from "solid-js"

type Props = {
  children: JSX.Element
}

export const Container: Component<Props> = (props) => {
  return (
    <div class="container mx-auto px-6 lg:px-10">
      {props.children}
    </div>
  )
}