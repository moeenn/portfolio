class State {
	/** @type {Set<string>} */
	selectedCategories = new Set();

	/** @type {Set<string>} */
	selectedTags = new Set();

	/**
	 * @param {Set<string>} s
	 * @param {string} value
	 */
	#toggle(s, value) {
		console.assert(value != undefined);
		if (s.has(value)) {
			s.delete(value);
		} else {
			s.add(value);
		}
	}

	/** @param {string} category */
	toggleCategory(category) {
		this.#toggle(this.selectedCategories, category);
	}

	/** @param {string} tag */
	toggleTag(tag) {
		this.#toggle(this.selectedTags, tag);
	}

	clearCategories() {
		this.selectedCategories.clear();
	}

	clearTags() {
		this.selectedTags.clear();
	}
}

/**
 * @param {string} category
 * @param {string[]} tags
 * @param {State} state
 */
function shouldShowPost(category, tags, state) {
	if (state.selectedCategories.size == 0 && state.selectedTags.size == 0) {
		return true;
	}

	if (state.selectedCategories.has(category)) {
		return true;
	}

	for (const tag of tags) {
		if (state.selectedTags.has(tag)) {
			return true;
		}
	}

	return false;
}

/**
 * @param {HTMLElement[]} allPosts
 * @param {State} state
 */
function filterPosts(allPosts, state) {
	for (const post of allPosts) {
		const category = post.dataset["category"];
		const tags = JSON.parse(post.dataset["tags"]);
		post.hidden = !shouldShowPost(category, tags, state);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const state = new State();
	const categoriesEl = [...document.querySelectorAll("[data-category]")];
	const tagsEl = [...document.querySelectorAll("[data-tag]")];
	const clearCategories = document.querySelector("[data-clear-categories]");
	const clearTags = document.querySelector("[data-clear-tags]");
	const posts = [...document.querySelectorAll("[data-post]")];

	for (const el of categoriesEl) {
		el.addEventListener("click", (e) => {
			state.toggleCategory(e.currentTarget.dataset["category"]);
			e.currentTarget.classList.toggle("pill-selected");
			clearCategories.hidden = state.selectedCategories.size === 0;
			filterPosts(posts, state);
		});
	}

	for (const el of tagsEl) {
		el.addEventListener("click", (e) => {
			state.toggleTag(e.currentTarget.dataset["tag"]);
			e.currentTarget.classList.toggle("pill-selected");
			clearTags.hidden = state.selectedTags.size === 0;
			filterPosts(posts, state);
		});
	}

	clearCategories.addEventListener("click", () => {
		state.clearCategories();
		categoriesEl.forEach((c) => c.classList.remove("pill-selected"));
		clearCategories.hidden = true;
		filterPosts(posts, state);
	});

	clearTags.addEventListener("click", () => {
		state.clearTags();
		tagsEl.forEach((c) => c.classList.remove("pill-selected"));
		clearTags.hidden = true;
		filterPosts(posts, state);
	});
});
