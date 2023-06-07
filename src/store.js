import { writable } from "svelte/store"

export const show_allergy = writable(false)

/**
 * @typedef SchoolNameCache
 * @property {string} edu
 * @property {string} school
 * @property {string} name
 */

/** @type {import("svelte/store").Writable<SchoolNameCache[]>} */
export const school_name_cache = writable([])

export const school_name = writable("")
