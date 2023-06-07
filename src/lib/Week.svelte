<script>
    import { get_day, get_date, to_ymd, is_today } from "src/date"
    export let params = {}

    let path = `/meal/${params.edu}/${params.school}`

    /** @type {Date[]} */
    let date_list = []

    /** @type {Date} */
    let center = params.date

    for (let i = -3; i <= 3; i++) {
        let date = new Date(center.valueOf() + 24 * 3600 * 1000 * i)
        date_list.push(date)
    }
</script>

<div class="menu weeks">
    {#if is_today(params.date) == false}
        <p class="space">
            <a class="button" href="#{path}">오늘 메뉴로 이동하기</a>
        </p>
    {/if}
    <div class="buttons">
        {#each date_list as date}
            <a
                class="button {is_today(date) ? 'today' : ''}"
                href="#{path}/{to_ymd(date)}"
                on:click="{(event) => {
                    if (to_ymd(date) == to_ymd(params.date)) {
                        event.preventDefault()
                    }
                }}">
                {get_day(date)}
                <br />
                <sub>{get_date(date)}일</sub>
            </a>
        {/each}
    </div>
</div>

<style>
    .button.today {
        background-color: var(--color);
        color: var(--background-color);
    }

    .weeks {
        bottom: 20px;
    }

    .weeks .space {
        margin: 0;
        margin-bottom: 3px;
    }

    @media (max-width: 768px) {
        .weeks .buttons > .button {
            padding: 9px;
        }
    }
</style>
