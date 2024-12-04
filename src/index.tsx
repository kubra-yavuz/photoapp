import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fancyapps/fancybox/dist/jquery.fancybox.css';
import { Fancybox } from '@fancyapps/fancybox';
import 'leaflet/dist/leaflet.css';


AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);