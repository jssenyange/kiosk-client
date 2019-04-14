import Vue from 'vue';
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import VueResource from 'vue-resource';

import config from "../config/config.json";
import JQuery from 'jquery'
let $ = JQuery

global.conf = config.production;



Vue.use(VueResource);

Vue.component('hooper', Hooper);
Vue.component('slide', Slide);
Vue.component('hooper-navigation', HooperNavigation)




console.log(wCap);

const app = new Vue({
	el: '#app',
	data: {
		slides: ["no-image.png"],
		hooperSettings: {
			centerMode: true,
			infiniteScroll: true,
		},
		slideTimer: null,
	},
	computed: {
		host(){
			return global.conf.host;
		}
	},
	components: {
		Hooper,
		Slide,
		HooperNavigation
	},
	methods: {
		slideChanged(e){
			let current = e.currentSlide;
			let prev = e.slideFrom;




			let curSlide = $(".slides #slide"+current);
			let prevSlide = $(".slides #slide"+prev);
			let duration = curSlide.attr("duration");


			if(prevSlide.attr("type") == "video/mp4"){
				prevSlide.get(1).pause();
			}


			if(!isNaN(duration))
				duration = Math.round(duration);




			if(curSlide.attr("type") == "video/mp4"){
				curSlide.get(1).currentTime = 0;
				curSlide.get(1).play();

				duration = curSlide.get(1).duration;
				duration = Math.round(duration);
				duration*= 1000;
			}


			// this.clearTimer();
			// this.slideTimer = setTimeout(() => {
			// 	console.log("done");
			// 	this.nextSlide();
			// }, duration);
			// console.log(duration);



		},
		updateSlides(items){
			this.slides = items;
			this.$refs.hooper.restart();
			this.nextSlide();
		},
		clearTimer(){
			clearTimeout(this.slideTimer);
		},

		nextSlide(){
			console.log("nextslide");
			this.$refs.hooper.slideNext();
		},

		prevSlide(){
			this.$refs.hooper.slidePrev();
		}
	},
	mounted() {
		let that = this;
		global.vue = this;


		// this.slideTimer = setTimeout(() => {
		// 	console.log("done");
		// 	this.nextSlide();
		// }, 2000);
	}
})







