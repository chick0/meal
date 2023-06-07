<script>
    import { get_cache } from "src/name"
    import { get_star, add_star, del_star } from "src/star"
    import { school_name } from "src/store"
    export let params = {}
    export let is_button = false

    let is_star_added = get_star(params.edu, params.school) != null

    if ($school_name.length == 0) {
        let name_from_cache = get_cache(params.edu, params.school)

        if (name_from_cache != null) {
            school_name.set(name_from_cache)
            console.log("Load school name from cache : ", $school_name)
        }
    }
</script>

{#if is_star_added}
    <a
        class="{is_button == true ? 'button' : ''}"
        href="/star"
        on:click="{(event) => {
            event.preventDefault()
            del_star(params.edu, params.school)
            is_star_added = false

            alert('삭제되었습니다.')
        }}">즐겨찾기에서 삭제하기</a>
{:else if $school_name.length > 0}
    <a
        class="{is_button == true ? 'button' : ''}"
        href="/star"
        on:click="{(event) => {
            event.preventDefault()
            add_star(params.edu, params.school, $school_name)
            is_star_added = true

            alert('추가되었습니다.')
        }}">즐겨찾기에 추가하기</a>
{/if}
