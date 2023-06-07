<script>
    import { onMount } from "svelte"
    import Star from "lib/Star.svelte"
    import { get_star } from "src/star"
    import { show_allergy, school_name } from "src/store"
    import { set_cache } from "src/name"
    import { get_day } from "src/date"
    export let params = {}

    /**
     * @param {string} origin
     * @returns {boolean}
     */
    function is_local(origin) {
        let ori = origin.replace("국내산", "")
        return ori.split("").filter((x) => x == "산").length == 0
    }

    /**
     * @typedef Menu
     * @property {string[]} allergy
     * @property {number[]} allergy_code
     * @property {string} name
     */

    /**
     * @typedef Meal
     * @property {string} calorie
     * @property {string[]} code
     * @property {Menu[]} menu
     * @property {string[]} nutrient
     * @property {string[]} origin
     * @property {string} school
     *
     * @property {number} import_origin_count
     * @property {boolean} show_origin
     */

    /** @type {Meal[]} */
    let json = []

    let is_star_added = false

    onMount(() => {
        params.json.forEach((/** @type {Meal} */ meal) => {
            let count = 0

            meal.origin.forEach((origin) => {
                if (is_local(origin) == false) {
                    count += 1
                }
            })

            meal.import_origin_count = count
            meal.show_origin = false
        })

        school_name.set(params.json[0].school)

        document.title = `${$school_name}의 급식 정보`
        set_cache(params.edu, params.school, $school_name)

        is_star_added = get_star(params.edu, params.school) != null

        json = params.json
    })
</script>

<div class="lf">
    <div class="packed">
        <h1>{$school_name}의 급식 정보</h1>
        <p>
            {#if $show_allergy}
                <a
                    href="/hide-allergy-info"
                    on:click="{(event) => {
                        event.preventDefault()
                        show_allergy.set(false)
                    }}">알러지 정보 닫기</a>
            {:else}
                <a
                    href="/show-allergy-info"
                    on:click="{(event) => {
                        event.preventDefault()
                        show_allergy.set(true)
                    }}">알러지 정보 확인하기</a>
            {/if}
            <b>·</b>
            <a href="#/">학교 검색하기</a>
        </p>
    </div>

    <div class="buttons">
        <button
            class="button"
            on:click="{() => {
                window.navigator.clipboard
                    .writeText(location.href)
                    .then(() => {
                        alert('링크가 복사되었습니다.')
                    })
                    .catch(() => {
                        prompt('아래의 텍스트를 복사해주세요.', location.href)
                    })
            }}">링크 복사하기</button>

        <Star params="{params}" is_button="{true}" />
    </div>

    {#each json as meal}
        <div class="table-wrapper">
            <table>
                <tr>
                    <th>정보</th>
                    <td>{params.date.toLocaleDateString()} ({get_day(params.date)}) / {meal.code[1]}</td>
                </tr>
                <tr>
                    <th>칼로리</th>
                    <td><span class="high">{meal.calorie}</span></td>
                </tr>
                <tr>
                    <th>
                        메뉴<br />
                        <a
                            class="high s"
                            href="/copy"
                            on:click="{(event) => {
                                event.preventDefault()

                                const menu = meal.menu
                                    .map((x) => {
                                        if (show_allergy && x.allergy.length > 0) {
                                            return x.name + ' [' + x.allergy.join(',') + ']'
                                        } else {
                                            return x.name
                                        }
                                    })
                                    .join('\n')

                                window.navigator.clipboard
                                    .writeText(menu)
                                    .then(() => {
                                        alert('메뉴가 복사되었습니다.')
                                    })
                                    .catch(() => {
                                        prompt('아래의 텍스트를 복사해주세요.', menu)
                                    })
                            }}">복사하기</a>
                    </th>
                    <td>
                        <ul>
                            {#each meal.menu as menu}
                                <li>
                                    {menu.name}
                                    {#if $show_allergy && menu.allergy.length > 0}
                                        <span class="allergy high">[{menu.allergy.join(",")}]</span>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>원산지</th>
                    <td>
                        {#if meal.import_origin_count == 0}
                            모든 식자재가 국내산입니다.
                        {:else}
                            <a
                                href="/toggle"
                                on:click="{(event) => {
                                    event.preventDefault()
                                    meal.show_origin = !meal.show_origin
                                }}">
                                <b>{meal.import_origin_count}</b>개의 식자재가 국내산이 아닙니다.
                            </a>
                        {/if}
                        {#if meal.show_origin}
                            <ol>
                                {#each meal.origin as origin}
                                    <li class="{is_local(origin) == false ? 'high' : ''}">{origin}</li>
                                {/each}
                            </ol>
                        {/if}
                    </td>
                </tr>
            </table>
        </div>
    {/each}
</div>

<style>
    .lf {
        margin-bottom: 30vh;
    }

    .packed > :nth-child(1) {
        margin-bottom: 0;
        font-size: 25px;
        color: #000;
    }

    .packed > :nth-child(2) {
        margin-top: 0;
        font-size: 20px;
    }

    .table-wrapper {
        margin-top: 30px;
        margin-bottom: 30px;
        overflow-x: auto;
    }

    th {
        width: 75px;
    }

    ol {
        padding-left: 0;
        counter-reset: o;
        list-style-type: none;
    }

    ol > li::before {
        counter-increment: o;
        content: counters(o, ".") ". ";
    }
</style>
