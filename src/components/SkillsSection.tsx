import type { Component } from "solid-js"
import { Progressbar } from "./Progressbar"

const languages = [
  { lang: "JS / TS", perc: 90 },
  { lang: "Python", perc: 70 },
  { lang: "Go", perc: 70 },
  { lang: "C++", perc: 40 },
  { lang: "PHP", perc: 40 },
  { lang: "Java", perc: 30 },
]

const skills = [
  { text: "Back-end Developmenet", perc: 80 },
  { text: "Real-time communications", perc: 70 },
  { text: "Automated Testing", perc: 80 },
  { text: "Requirements Analysis", perc: 80 },
  { text: "Time estimation", perc: 70 },
  { text: "Client communication", perc: 70 },
]

export const SkillsSection: Component = () => {
  return (
    <div class="py-14" id="skills">
      <h3 class="text-2xl space-x-2 mb-5">
        <span class="text-color1 font-normal">#</span>
        <span>Languages & Skills</span>
      </h3>

      <div class="lg:grid lg:grid-cols-2 lg:gap-12">
        <div>
          {languages.map(lang => (
            <div class="flex flex-col space-y-1 py-4">
              <div class="flex justify-between">
                <span class="my-auto">{lang.lang}</span>
                <span class="text-sm my-auto">{lang.perc}%</span>
              </div>
              <div><Progressbar percentage={lang.perc} /></div>
            </div>
          ))}
        </div>

        <div>
          {skills.map(skill => (
            <div class="flex flex-col space-y-1 py-4">
              <div class="flex justify-between">
                <span class="my-auto">{skill.text}</span>
                <span class="text-sm my-auto">{skill.perc}%</span>
              </div>
              <div><Progressbar percentage={skill.perc} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}