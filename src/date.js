const DAY_MAP = {
    0: "일요일",
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일",
    6: "토요일",
}

/**
 * @param {Date} dt
 * @returns {string} day
 */
export function get_day(dt) {
    return DAY_MAP[dt.getDay()].slice(0, 1)
}

/**
 * @param {Date} dt
 * @returns {string} date
 */
export function get_date(dt) {
    let date = dt.getDate()

    if (date < 10) {
        return "0" + date.toString()
    } else {
        return date.toString()
    }
}

/**
 * @param {string} ymd YYYYMMDD
 * @returns {Date}
 */
export function from_ymd(ymd) {
    let today = new Date()

    let year = Number(ymd.slice(0, 4))
    let month = Number(ymd.slice(4, 6))
    let date = Number(ymd.slice(6, 8))

    if (isNaN(year)) {
        year = today.getFullYear()
    }

    if (isNaN(month)) {
        month = today.getMonth() + 1
    } else {
        month -= 1
    }

    if (isNaN(date)) {
        date = today.getDay()
    }

    today.setFullYear(year, month, date)
    return today
}

/**
 * @param {Date} dt
 * @returns {string} YYYYMMDD
 */
export function to_ymd(dt) {
    let year = dt.getFullYear()
    let month = dt.getMonth() + 1
    let date = get_date(dt)

    return `${year}${month < 10 ? "0" + month.toString() : month}${date}`
}

/**
 * @param {Date} dt
 * @returns {boolean}
 */
export function is_today(dt) {
    let today = to_ymd(new Date())
    return today == to_ymd(dt)
}
