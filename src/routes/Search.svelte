<script>
    import { onMount } from "svelte"

    let placeholder_list = ["ㅇㅇ초", "ㅇㅇ중", "ㅇㅇ고", "ㅇㅇ초등학교", "ㅇㅇ중학교", "ㅇㅇ고등학교"]
    let placeholder = placeholder_list[Math.floor(Math.random() * placeholder_list.length)]

    let school_name = ""

    let is_loading = false

    let has_result = false

    /**
     * @typedef Result
     * @property {string} name
     * @property {object} code
     */

    /** @type {Result[]} */
    let result_list = []

    function create_url(code) {
        return `/meal/${code.edu}/${code.school}`
    }

    onMount(() => {
        document.title = "급식"
    })
</script>

<div class="lf">
    <h1>급식</h1>
</div>

{#if has_result == false}
    <div class="message-box l">
        {#if is_loading}
            <p>학교 정보를 검색하고 있습니다...</p>
        {:else}
            <form
                on:submit="{(event) => {
                    event.preventDefault()
                    is_loading = true
                    has_result = false

                    fetch(`/api/school?school_name=${school_name}`)
                        .then((resp) => resp.json())
                        .then((json) => {
                            if (json.message == null) {
                                result_list = json

                                is_loading = false
                                has_result = true
                            } else {
                                alert(json.message)
                                is_loading = false
                            }
                        })
                        .catch(() => {
                            alert('알 수 없는 오류가 발생했습니다.')
                            is_loading = false
                        })
                }}">
                <p>
                    <label for="school_name">학교 찾기</label>
                </p>
                <input
                    type="text"
                    id="school_name"
                    placeholder="{placeholder}"
                    enterkeyhint="done"
                    bind:value="{school_name}" />
            </form>
        {/if}
    </div>

    <div class="menu">
        <a class="button" href="/#/star">즐겨찾기 확인하기</a>
    </div>
{:else}
    <div class="lf">
        <h2 id="status">학교 검색 결과</h2>
        <ol class="list l">
            {#each result_list as result}
                <li>
                    <a href="#{create_url(result.code)}">{result.name}</a>
                </li>
            {/each}
        </ol>
        <button
            class="button is-fullwidth result-close"
            on:click="{() => {
                has_result = false
            }}">다시 검색하기</button>
    </div>
{/if}

<style>
    input#school_name {
        width: 200px;
    }

    button.is-fullwidth {
        width: 100%;
    }

    button.result-close {
        margin-bottom: 10vh;
    }
</style>
