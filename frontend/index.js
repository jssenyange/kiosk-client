import Vue from 'vue';
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


import config from "../config/config.json";
import JQuery from 'jquery'
let $ = JQuery

global.conf = config.production;



Vue.use(Vuetify);
Vue.component('hooper', Hooper);
Vue.component('slide', Slide);
Vue.component('hooper-navigation', HooperNavigation);



const app = new Vue({
	el: '#app',
	data: {
		slides: ["no-image.png"],
		footer: false,
		slot: "slider",
		qr_link: null,
		type: "slider",
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
		setType(data){
			this.type = data;
		},
		setQrLink(data){
			this.qr_link = data;
		},
		setFooter(data){
			this.footer =data;
		},

		setSlot(data){
			this.slot = data;
		},
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

		nextSlide(e){
			
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



