import type { Component } from "solid-js"
import { createSignal, Switch, Match } from "solid-js"
import { Navbar } from "./Navbar"
import type { Page } from "../types"

import { AboutScreen } from "./AboutScreen"
import { ExperienceScreen } from "./ExperienceScreen"
import { SkillsScreen } from "./SkillsScreen"
import { ProjectsScreen } from "./ProjectsScreen"

export const PageContent: Component = () => {
  const [currentPage, setCurrentPage] = createSignal<Page>("home")

  return (
    <>
      <section>
        <Navbar setScreen={setCurrentPage} />
      </section>

      <section>
        <Switch>
          <Match when={currentPage() === "home"}>
            <AboutScreen />
          </Match>
          <Match when={currentPage() === "xp"}>
            <ExperienceScreen />
          </Match>
          <Match when={currentPage() === "skills"}>
            <SkillsScreen />
          </Match>
          <Match when={currentPage() === "projects"}>
            <ProjectsScreen />
          </Match>
        </Switch>
      </section>
    </>
  )
}