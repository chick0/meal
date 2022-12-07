// @ts-nocheck
import { wrap } from "svelte-spa-router/wrap";

export const routes = {
    "/": wrap({ asyncComponent: () => import("routes/Search.svelte") }),
    "/star": wrap({ asyncComponent: () => import("routes/Star.svelte") }),

    "/meal/:edu/:school/:date?": wrap({ asyncComponent: () => import("routes/Meal.svelte") }),

    "*": wrap({ asyncComponent: () => import("src/NotFound.svelte") }),
};
