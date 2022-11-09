// resources/app.js

require('./bootstrap');

import { createApp } from 'vue';


import HelloVue from '../components/HelloVue.vue';


createApp({
    components: {
        HelloVue,
    }
}).mount('#app');

// Existen algunos documentos que analizan