import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import VueMask from '@devindex/vue-mask';

const app = createApp(App);

app.use(VueMask);
app.mount('#app');