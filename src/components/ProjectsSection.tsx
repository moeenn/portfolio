import type { Component } from "solid-js"
import { Icon } from "solid-heroicons"
import { truck } from "solid-heroicons/outline";
import { SectionHeading } from "./SectionHeading"

/**
 * DMS - truck
 * Lab on web - academic-cap
 * Loannerd - banknotes
 * Octane club - rocket-launch
 * Doxy - document-chart-bar
 * Aptzy - home-modern
 */

export const ProjectsSection: Component = () => {
  return (
    <div class="py-14" id="projects">
      <SectionHeading text="Projects" />

      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

        <div class="flex">
          <div class="bg-color1 w-80 flex">
            <Icon path={truck} class="text-nbg h-8 w-8 m-auto" />
          </div>
          <div class="bg-color0 p-6">
            <h4 class="text-xl mb-2">Delivery Management System</h4>
            <p class="text-sm leading-relaxed">Management and scheduling of construction site resources, personnel management and live-tracking of incoming delivery vehicles</p>
          </div>
        </div>

        <div class="flex">
          <div class="bg-color2 w-80 flex">
            <Icon path={truck} class="text-nbg h-8 w-8 m-auto" />
          </div>
          <div class="bg-color0 p-6">
            <h4 class="text-xl mb-2">Delivery Management System</h4>
            <p class="text-sm leading-relaxed">Management and scheduling of construction site resources, personnel management and live-tracking of incoming delivery vehicles</p>
          </div>
        </div>

        <div class="flex">
          <div class="bg-color3 w-80 flex">
            <Icon path={truck} class="text-nbg h-8 w-8 m-auto" />
          </div>
          <div class="bg-color0 p-6">
            <h4 class="text-xl mb-2">Delivery Management System</h4>
            <p class="text-sm leading-relaxed">Management and scheduling of construction site resources, personnel management and live-tracking of incoming delivery vehicles</p>
          </div>
        </div>

        <div class="flex">
          <div class="bg-color4 w-80 flex">
            <Icon path={truck} class="text-nbg h-8 w-8 m-auto" />
          </div>
          <div class="bg-color0 p-6">
            <h4 class="text-xl mb-2">Delivery Management System</h4>
            <p class="text-sm leading-relaxed">Management and scheduling of construction site resources, personnel management and live-tracking of incoming delivery vehicles</p>
          </div>
        </div>

      </div>
    </div>
  )
}