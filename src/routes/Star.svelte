<script>
    import { onMount } from "svelte"
    import { push } from "svelte-spa-router"
    import { remove_old, get_star_list } from "src/star"

    /**
     * @param {string} edu
     * @param {string} school
     * @returns {string} path
     */
    function get_path(edu, school) {
        return `/meal/${edu}/${school}`
    }

    let star_list = get_star_list()

    onMount(() => {
        document.title = "🌟 즐겨찾기"

        remove_old()

        if (star_list.length == 0) {
            alert("등록된 즐겨찾기가 없습니다!")
            push("/")
        } else if (star_list.length == 1) {
            let star = star_list[0]
            push(get_path(star.edu, star.school))
        }
    })
</script>

<div class="lf">
    <h1>🌟 즐겨찾기</h1>
    <ol class="list l">
        {#each star_list as star}
            <li>
                <a href="#{get_path(star.edu, star.school)}">{star.name}</a>
            </li>
        {/each}
    </ol>
</div>

<div class="menu">
    <a class="button" href="/#">학교 검색하러 가기</a>
</div>
