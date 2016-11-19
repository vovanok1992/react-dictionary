import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'
import '../index.html';
import Layout from './components/Layout.js';
import dictionary from './utils/Dictionary';

console.log('Start application... ');

window.dict = dictionary;

ReactDOM.render(
    <Layout />, document.getElementById("app")
);


