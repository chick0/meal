<script>
    import { onMount } from "svelte"
    import Star from "lib/Star.svelte"
    export let params = {}

    onMount(() => {
        document.title = "급식 정보 없음"
    })
</script>

<div class="lf">
    <a href="#/">학교 검색하기</a>
    <b>·</b>
    <Star params="{params}" is_button="{false}" />
</div>

<div class="message-box l">
    <span class="date">
        {params.date.toLocaleDateString()}
    </span>
    <p><span class="high">급식</span> 정보가 없습니다.</p>
</div>

<style>
    div.lf > b:last-child {
        display: none;
    }

    span.date {
        padding-bottom: 3px;
        border-bottom: 0.7px solid #bcbcbc;
    }
</style>
