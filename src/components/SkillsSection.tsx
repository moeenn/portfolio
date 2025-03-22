import type { Component } from "solid-js"
import { Progressbar } from "./Progressbar"
import { SectionHeading } from "./SectionHeading"

const languages = [
  { lang: "Javascript / Typescript", perc: 90 },
  { lang: "Go", perc: 70 },
  { lang: "Python", perc: 60 },
  { lang: "C++", perc: 40 },
]

const technologies = [
  { text: "NodeJS", perc: 80 },
  { text: "Linux / Shell", perc: 70 },
  { text: "React", perc: 60 },
  { text: "Docker / Compose", perc: 60 },
]

export const SkillsSection: Component = () => {
  return (
    <div class="py-14" id="expertise">
      <SectionHeading text="Expertise" />

      <div class="lg:grid lg:grid-cols-2 lg:gap-12">
        <div>
          {languages.map(lang => (
            <div class="flex flex-col space-y-1 py-4">
              <div class="flex justify-between">
                <span class="my-auto">{lang.lang}</span>
                <span class="text-xs my-auto text-slate-900">{lang.perc}%</span>
              </div>
              <div><Progressbar percentage={lang.perc} /></div>
            </div>
          ))}
        </div>

        <div>
          {technologies.map(tech => (
            <div class="flex flex-col space-y-1 py-4">
              <div class="flex justify-between">
                <span class="my-auto">{tech.text}</span>
                <span class="text-xs my-auto text-slate-900">{tech.perc}%</span>
              </div>
              <div><Progressbar percentage={tech.perc} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}