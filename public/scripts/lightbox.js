//@ts-check

/**
 * @param {string} selector
 * @returns {HTMLElement}
 */
function $(selector) {
    const el = document.querySelector(selector)
    if (!el) {
        throw new Error(`element not found: ${selector}`)
    }
    return /** @type {HTMLElement} */(el)
}

/**
 * @param {string} selector
 * @returns {HTMLElement[]}
 */
function $s(selector) {
    const els = document.querySelectorAll(selector)
    if (els.length === 0) {
        throw new Error(`elements not found: ${selector}`)
    }
    return /** @type {HTMLElement[]} */([...els])
}

class State {
    images = /** @type {string[]} */ ([])
    imageCount = 0
    currentIndex = 0

    /**
     * @param {string} projectId 
     * @param {number} imageCount 
     */
    open(projectId, imageCount) {
        this.images = []
        for (let i = 1; i <= imageCount; i++) {
            this.images.push(`/images/projects/${projectId}/${i}.webp`)
        }

        this.imageCount = imageCount
    }

    close() {
        this.images = []
        this.imageCount = 0
        this.currentIndex = 0
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.imageCount
    }

    prev() {
        this.currentIndex = this.currentIndex - 1
        if (this.currentIndex < 0) {
            this.currentIndex = this.imageCount - 1
        }
    }
}

class StateManager {
    state = new State()
    loadedImages = new Set()

    e = {
        lightbox: () => $("[data-lightbox]"),
        targets: () => $s("[data-lightbox-target]"),
        image: () => $("[data-lightbox-image]"),
        loader: () => $("[data-lightbox-loader]"),
        counter: () => $("[data-lightbox-counter]"),
        close: () => $("[data-lightbox-close]"),
        next: () => $("[data-lightbox-next]"),
        prev: () => $("[data-lightbox-prev]"),
    }

    /**
     * @param {string} url
     */
    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
                this.loadedImages.add(url)
                resolve()
            }
            img.onerror = reject
        })
    }

    async setImage() {
        const url = this.state.images[this.state.currentIndex]
        if (this.loadedImages.has(url)) {
            this.e.loader().hidden = true
            this.e.image().hidden = false
            this.e.image().src = url
            return
        }

        this.e.loader().hidden = false
        this.e.image().hidden = true
        await this.loadImage(url)
        this.e.image().hidden = false
        this.e.image().src = url
        this.e.loader().hidden = true
    }

    activateListeners() {
        const targets = this.e.targets()
        for (const t of targets) {
            t.addEventListener("click", (e) => {
                const projectId = /** @type {string} */ (e.currentTarget.dataset["projectId"])
                const imageCountRaw = /** @type {string} */ (e.currentTarget.dataset["numImages"])
                const imageCount = parseInt(imageCountRaw)
                this.open(projectId, imageCount)
            })
        }

        this.e.close().addEventListener("click", () => this.close())
        this.e.next().addEventListener("click", () => this.next())
        this.e.prev().addEventListener("click", () => this.prev())

        document.addEventListener("keydown", (e) => {
            const key = e.key
            switch (key) {
                case "Escape":
                    this.close()
                    break

                case "ArrowLeft":
                    this.prev()
                    break

                case "ArrowRight":
                    this.next()
                    break
            }
        })
    }

    /**
     * @param {string} projectId 
     * @param {number} numImages 
     */
    open(projectId, numImages) {
        this.state.open(projectId, numImages)
        this.e.lightbox().hidden = false
        this.e.counter().innerText = `${this.state.currentIndex + 1} / ${this.state.imageCount}`
        this.setImage()
    }

    close() {
        this.state.close()
        this.e.lightbox().hidden = true
        this.e.counter().innerText = ""
        this.e.image().src = ""
    }

    next() {
        this.state.next()
        this.e.counter().innerText = `${this.state.currentIndex + 1} / ${this.state.imageCount}`
        this.setImage()
    }

    prev() {
        this.state.prev()
        this.e.counter().innerText = `${this.state.currentIndex + 1} / ${this.state.imageCount}`
        this.setImage()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sm = new StateManager()
    sm.activateListeners()
})