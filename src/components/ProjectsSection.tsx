import type { Component } from "solid-js"
import { Icon } from "solid-heroicons"
import { truck, academicCap, banknotes, rocketLaunch, documentChartBar, homeModern, mapPin, buildingLibrary } from "solid-heroicons/outline";
import { SectionHeading } from "./SectionHeading"
import { ProjectCard } from "./ProjectCard"

const projects = [
  {
    heading: "Delivery Management System",
    desc: "Management and scheduling of construction site resources, personnel management and live-tracking of incoming delivery vehicles.",
    icon: truck,
    color: "color1",
    tech: ["NextJS", "Tailwind", "Node", "Typescript", "Fastify", "Prisma", "AJV"],
  },
  {
    heading: "Lab on web",
    desc: "Learning Management System (LMS) targeted at science students. Includes physics simulations and student progress and performance tracking.",
    icon: academicCap,
    color: "color2",
    tech: ["NextJS", "ANTD", "Node", "Typescript", "Koa", "Mongoose", "ValidatorJS", "S3 / SES"],
  },
  {
    heading: "Loannerd",
    desc: "Easy application of automotive loan, loan application processing, document management, tracking, and approval though affiliate banks.",
    icon: banknotes,
    color: "color3",
    tech: ["NextJS", "ANTD", "Node", "Typescript", "Express", "Mongoose", "Joi", "S3 / SES"],
  },
  {
    heading: "Delivery Logistics System",
    desc: "System for live-tracking, routing and management of construction materials delivery vehicles.",
    icon: mapPin,
    color: "color4",
    tech: ["VueJS", "Tailwind", "Pinia", "Node", "Typescript", "Fastify", "Mongoose", "Zod", "WS"],
  },
  {
    heading: "Bank InfoDash",
    desc: "Management information aggregation dashboard for banking operations.",
    icon: buildingLibrary,
    color: "color5",
    tech: ["Go", "Chi", "GolangX-Websockets", "Node", "Typescript", "Fastify", "Prisma", "AJV"],
  },
  {
    heading: "Octane Club",
    desc: "Platform for buying and selling of high-end luxury cars, targeted at dealerships.",
    icon: rocketLaunch,
    color: "color6",
    tech: ["VueJS", "Tailwind", "Laravel", "Blade", "MySQL"],
  },
  {
    heading: "Doxy",
    desc: "Generate legal documents from dynamic templates and obtain e-signatures from other users.",
    icon: documentChartBar,
    color: "color1",
    tech: ["VueJS", "Vuetify", "Laravel", "Blade", "MySQL"],
  },
  {
    heading: "Aptzy",
    desc: "Apartment search and renting, with features for third-party amenities providers.",
    icon: homeModern,
    color: "color2",
    tech: ["VueJS", "Bootstrap", "Laravel", "Blade", "MySQL"],
  },
]

export const ProjectsSection: Component = () => {

  return (
    <div class="py-14" id="projects">
      <SectionHeading text="Projects" />

      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map(project => (
          <ProjectCard
            heading={project.heading}
            desc={project.desc}
            icon={<Icon path={project.icon} classList={{ "h-6 w-6 mb-auto": true, ["text-" + project.color]: true }} />}
            color={project.color}
            technologies={project.tech}
          />
        ))}
      </div>
    </div>
  )
}
