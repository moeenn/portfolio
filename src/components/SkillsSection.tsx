import type { Component } from "solid-js"
import { Progressbar } from "./Progressbar"
import { SectionHeading } from "./SectionHeading"

const languages = [
  { lang: "JS / TS", perc: 90 },
  { lang: "Python", perc: 70 },
  { lang: "Go", perc: 70 },
  { lang: "C++", perc: 40 },
  { lang: "PHP", perc: 40 },
  { lang: "Java", perc: 30 },
]

const technologies = [
  { text: "NodeJS", perc: 80 },
  { text: "Linux / Shell", perc: 70 },
  { text: "Docker / Compose", perc: 60 },
  { text: "React", perc: 50 },
  { text: "AWS - EBS / EC2 / SES / S3 / Redshift", perc: 50 },
  { text: "Numpy / Pandas / Matplotlib", perc: 40 },
]

export const SkillsSection: Component = () => {
  return (
    <div class="py-14" id="tech">
      <SectionHeading text="Languages & Technologies" />

      <div class="lg:grid lg:grid-cols-2 lg:gap-12">
        <div>
          {languages.map(lang => (
            <div class="flex flex-col space-y-1 py-4">
              <div class="flex justify-between">
                <span class="my-auto">{lang.lang}</span>
                <span class="text-xs my-auto opacity-50">{lang.perc}%</span>
              </div>
              <div><Progressbar percentage={lang.perc} color="color4" /></div>
            </div>
          ))}
        </div>

        <div>
          {technologies.map(tech => (
            <div class="flex flex-col space-y-1 py-4">
              <div class="flex justify-between">
                <span class="my-auto">{tech.text}</span>
                <span class="text-xs my-auto opacity-50">{tech.perc}%</span>
              </div>
              <div><Progressbar percentage={tech.perc} color="color6" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}