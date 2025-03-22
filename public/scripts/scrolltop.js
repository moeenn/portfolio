document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector("[data-scrollbutton]")
  console.assert(scrollButton != null)
  scrollButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }))

  const scrollButtonContainer = document.querySelector("[data-scrollbuttoncontainer]")
  console.assert(scrollButtonContainer != null)

  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      // set visible = true
      scrollButtonContainer?.classList.add("opacity-100")
      scrollButtonContainer?.classList.remove("opacity-0")
    } else {
      // set visible = false
      scrollButtonContainer?.classList.remove("opacity-100")
      scrollButtonContainer?.classList.add("opacity-0")
    }
  })
})