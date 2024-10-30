import { lazy } from "react";

const Home = lazy(() => import("../../screen/Home"));
const Journey = lazy(() => import("../../screen/Journey"))

const routes = [
    {
        id: 1,
        path: '/',
        component: Home
    },
    {
        id: 2,
        path: '/journey',
        component: Journey
    },
]

export default routes