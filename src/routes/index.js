import HomePage from "../views/Home.vue"
import MoviePage from "../views/Movie.vue"
import SeriesPage from "../views/Series.vue"
import MoviesPage from "../views/Movies.vue"
import TVSeriesPage from "../views/TVSeries.vue"
// import WatchlistPage from "../views/Watchlist.vue"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {path: "/", component: HomePage },
    {path: "/movies", component: MoviesPage },
    {path: "/series", component: TVSeriesPage },
    {path: "/movie/:id", component: MoviePage },
    {path: "/series/:id", component: SeriesPage },
    // {path: "/watchlist", component: WatchlistPage },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})