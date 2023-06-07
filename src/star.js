const NAMESPACE = "meal:star"
const VERSION = "2"
const STORAGE_KEY = `${NAMESPACE}:v${VERSION}`

export function remove_old() {
    let keys = Object.keys(window.localStorage)

    keys.forEach((key) => {
        if (key.startsWith(NAMESPACE) || key == "star") {
            if (key != STORAGE_KEY) {
                console.log("Old version key detected")
                window.localStorage.removeItem(key)
            }
        }
    })
}

/**
 * @typedef Star
 * @property {string} edu
 * @property {string} school
 * @property {string} name
 */

/**
 * @returns {Star[]}
 */
export function get_star_list() {
    let star = JSON.parse(window.localStorage.getItem(STORAGE_KEY))

    if (star == null) {
        star = []
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(star))
    }

    return star
}

/**
 * @param {string} edu
 * @param {string} school
 * @returns {Star}
 */
export function get_star(edu, school) {
    return get_star_list().find((x) => x.edu == edu && x.school == school)
}

/**
 * @param {string} edu
 * @param {string} school
 * @param {string} name
 */
export function add_star(edu, school, name) {
    let star = get_star(edu, school)

    if (star == null) {
        let star_list = get_star_list()

        star_list.push({
            edu,
            school,
            name,
        })

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(star_list))
    }
}

/**
 * @param {string} edu
 * @param {string} school
 */
export function del_star(edu, school) {
    let star = get_star(edu, school)

    if (star != null) {
        let star_list = get_star_list()

        star_list = star_list.filter((x) => x.edu != edu || x.school != school)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(star_list))
    }
}
