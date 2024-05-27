import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import BaseContainer from "./UI/BaseContainer.vue";
import BaseGrid from "./UI/BaseGrid.vue";
import BaseSpinner from "./UI/BaseSpinner.vue";
import ButtonSpinner from "./UI/ButtonSpinner.vue";
const app = createApp(App);

app.component("base-container", BaseContainer);
app.component("base-grid", BaseGrid);
app.component("base-spinner", BaseSpinner);
app.component("button-spinner", ButtonSpinner);
app.use(createPinia());
app.use(router);

app.mount("#app");
