require('./bootstrap');

import { createApp } from 'vue';
import HelloVue from './components/ExampleCOmponent.vue';

createApp({
    components: {
        HelloVue,
    }
}).mount('#app');