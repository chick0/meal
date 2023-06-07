import { get } from "svelte/store"
import { school_name_cache } from "src/store"

/**
 * @param {string} edu
 * @param {string} school
 * @param {string} name
 */
export function set_cache(edu, school, name) {
    const cache = get(school_name_cache)

    let cobj = cache.find((x) => x.edu == edu && x.school == school)

    if (cobj == null) {
        school_name_cache.set([
            ...cache,
            {
                edu,
                school,
                name,
            },
        ])
    }
}

/**
 * @param {string} edu
 * @param {string} school
 * @returns {string|null} name
 */
export function get_cache(edu, school) {
    const cache = get(school_name_cache)

    let cobj = cache.find((x) => x.edu == edu && x.school == school)
    return cobj?.name
}
