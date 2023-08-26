import type { Component } from "solid-js"
import { Container } from "./Container"

export const Footer: Component = () => {
  const year = (new Date()).getFullYear()

  return (
    <footer class="py-4 bg-color0 opacity-50 text-nfg">
      <Container>
        <div class="flex">
          <span class="text-sm mx-auto">© {year} - Muhammad Moeen</span>
        </div>
      </Container>
    </footer>
  )
}