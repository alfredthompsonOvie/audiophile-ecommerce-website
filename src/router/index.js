import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useCartStore } from "../stores/cart.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return {
			top: 0,
			behavior: "smooth",
		};
	},
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/headphones",
			name: "headphones",
			component: () => import("../views/HeadphonesView.vue"),
		},
		{
			path: "/headphones/:id",
			name: "headphoneDetails",
			component: () => import("../views/products/HeadphonesDetailsView.vue"),
			props: true,
		},
		{
			path: "/speakers",
			name: "speakers",
			component: () => import("../views/SpeakersView.vue"),
		},
		// {
		//   path: '/speakers/:id',
		//   name: 'speakerDetails',
		//   component: () => import('../views/products/SpeakersDetailsView.vue'),
		//   props: true
		// },
		{
			path: "/earphones",
			name: "earphones",
			component: () => import("../views/EarphonesView.vue"),
		},
		// {
		//   path: '/earphones/:id',
		//   name: 'earphoneDetails',
		//   component: () => import('../views/products/EarphonesDetailsView.vue'),
		//   props: true
		// },
		// {
		//   path: '/headphones/:id',
		//   name: 'headphonesDetails',
		//   component: () => import('../views/products/ProductDetailsView.vue'),
		//   props: true
		// },
		{
			path: "/:id",
			name: "productDetail",
			component: () => import("../views/products/ProductDetailsView.vue"),
			props: true,
		},
		{
			path: "/checkout",
			name: "checkout",
			component: () => import("../views/CheckoutView.vue"),
			beforeEnter: (to, from, next) => {
				const store = useCartStore();

        if (!store.itemsCount) next({ name: 'home' })
        else next()
			},
		},
	],
});

export default router;
