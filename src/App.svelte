<script>
    import { onMount } from "svelte"
    import Router from "svelte-spa-router"
    import { routes } from "src/router"

    /** @type {boolean} */
    let is_component_loading = false

    onMount(() => {
        window.onunhandledrejection = () => {
            alert("치명적인 오류가 발생해 재시작합니다.")
            window.location.reload()
        }
    })
</script>

{#if is_component_loading}
    <div class="message-box l">
        <p>페이지를 불러오고 있습니다...</p>
    </div>
{/if}

<Router
    routes="{routes}"
    on:routeLoading="{() => {
        is_component_loading = true
    }}"
    on:routeLoaded="{() => {
        is_component_loading = false
    }}" />
