<script>
    import { onMount } from "svelte"

    // svelte-ignore unused-export-let
    export let params = {}

    onMount(() => {
        document.title = "404 - 페이지를 찾을 수 없음"
    })
</script>

<div class="message-box l">
    <p>요청하신 페이지를 찾을 수 없습니다.</p>
    <a class="button" href="#/">학교 검색하기</a>
</div>
