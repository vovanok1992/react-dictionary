import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-promise/auto'
import './styles/main.scss'
import '../index.html';
import Layout from './components/Layout.js';
import dictionary from './utils/Dictionary';

console.log('Start application... ');

ReactDOM.render(
    <Layout />, document.getElementById("app")
);


