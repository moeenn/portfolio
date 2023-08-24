import type { Component } from "solid-js"
import { Icon } from "solid-heroicons"
import { phone, atSymbol, codeBracket, chevronDoubleRight } from "solid-heroicons/outline";
import { SectionHeading } from "./SectionHeading";

export const ContactSection: Component = () => {
  return (
    <div class="py-14" id="contact">
      <div class="flex">
        <div class="flex flex-col lg:flex-row lg:mx-auto">
          <h4 class="text-4xl lg:text-6xl text-color1 lg:p-4 rounded mb-4 lg:mb-0 lg:text-right lg:mr-2">Let's start a <br class="hidden lg:block" />project together</h4>

          <div class="flex flex-col my-auto lg:border-l lg:border-dashed lg:border-color1 lg:pl-6">
            <div class="flex-1 flex space-x-3 hover:text-color1 py-2">
              <Icon path={phone} class="h-5 w-5 text-color1 my-auto" />
              <span class="my-auto">0336-4220030</span>
            </div>

            <div class="flex-1 flex space-x-3 hover:text-color1 py-2">
              <Icon path={atSymbol} class="h-5 w-5 text-color1 my-auto" />
              <a class="my-auto" href="mailto:moeen.v8@gmail.com">moeen.v8@gmail.com</a>
            </div>

            <div class="flex-1 flex space-x-3 hover:text-color1 py-2">
              <Icon path={codeBracket} class="h-5 w-5 text-color1 my-auto" />
              <a class="my-auto" href="https://github.com/moeenn" target="_blank">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}