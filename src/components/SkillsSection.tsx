import type { Component } from "solid-js"

const languages = [
  { lang: "Javascript / Typescript", perc: 0.9 },
  { lang: "Python", perc: 0.7 },
  { lang: "Go", perc: 0.7 },
  { lang: "C++", perc: 0.4 },
  { lang: "PHP", perc: 0.4 },
  { lang: "Java", perc: 0.3 },
]

export const SkillsSection: Component = () => {
  return (
    <div class="py-14">
      <h3 class="text-2xl space-x-2">
        <span class="text-color1 font-normal">#</span>
        <span>Languages</span>
      </h3>

      <div>
        <table class="w-full">
          <tbody>
            {languages.map(lang => (
              <tr>
                <td class="p-2">{lang.lang}</td>
                <td class="p-2">{lang.perc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}