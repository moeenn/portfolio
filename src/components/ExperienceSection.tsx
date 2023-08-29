import type { Component } from "solid-js"
import { SectionHeading } from "./SectionHeading"
import { Timeline } from "./Timeline"
import type { TimelineItem } from "./Timeline"

const timelineItems: TimelineItem[] = [
  {
    time: "August 2020 - Present",
    heading: "OSO Software Outsourcing",
    desc: "Front-end and Back-end web development, requirements gathering, time estimation, team lead."
  },
  {
    time: "April 2019 - July 2020",
    heading: "Institute of Management Sciences (PAK-AIMS) — BSCS",
    desc: "Acquisition of Bachelors degress in computer sciences."
  },
  {
    time: "July 2016 - March 2019",
    heading: "KPMG Taseer Hadi & Co. Chartered Accountants - Articleship",
    desc: "Business process workflows analysis and identification of security and operational issues in IT systems. Suggestion of steps to mitigate identified problems."
  },
  {
    time: "September 2013 - March 2016",
    heading: "Professionals Academy Of Commerce — CA (Intermediate)",
    desc: "Acquisition of degress for Chartered Accountancy."
  }  
]

export const ExperienceSection: Component = () => {
  return (
    <div class="py-14" id="xp">
      <SectionHeading text="Experience & Education" />
      <Timeline items={timelineItems} />
    </div>
  )
}