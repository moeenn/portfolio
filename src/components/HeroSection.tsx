import type { Component } from "solid-js"
import { Icon } from "solid-heroicons"
import { link } from "solid-heroicons/outline";

export const HeroSection: Component = () => {
  return (
    <div class="py-12 md:py-20">
      <div class="lg:grid lg:grid-cols-2 lg:gap-4">
        <div class="flex py-4 flex-col space-y-8">
          <p class="text-color2">Hello, my name is</p>
          <h1 class="text-5xl lg:text-7xl my-auto font-serif font-bold text-white">Muhammad Moeen.</h1>
          <p class="flex-1">I am a software engineer with focus on web development and interests in low-level systems programming and machine learning.</p>
          <div class="flex space-x-4">
            <a class="px-4 py-2 bg-color0 text-nfg text-sm cursor-pointer border-l-2 border-color2 inline-flex space-x-3" href="/resume.pdf" target="_blank">
              <Icon path={link} class="h-4 w-4" />
              <span class="my-auto">CV</span>
            </a>

            <a class="px-4 py-2 bg-color0 text-nfg text-sm cursor-pointer border-l-2 border-color2 inline-flex space-x-3" href="https://github.com/moeenn" target="_blank">
              <Icon path={link} class="h-4 w-4" />
              <span class="my-auto">GitHub</span>
            </a>
          </div>
        </div>

        <div class="bg-white rounded">
          <div class="hidden lg:block w-full h-full bg-[url('/picture.png')] bg-center bg-contain bg-no-repeat">
          </div>
        </div>
      </div>
    </div>
  )
}