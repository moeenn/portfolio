document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-navbutton")
  console.assert(button != null)

  const mobileMenu = document.querySelector("[data-mobilemenu]")
  console.assert(mobileMenu != null)

  button?.addEventListener("click", () => {
    button.classList.toggle("bg-slate-200")
    mobileMenu?.classList.toggle("hidden")
  }) 
})