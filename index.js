'use strict'

const header = document.querySelector('header');
const toolsPanel = document.querySelector('.tools-panel');
const tools = document.querySelector('.tools');
const footer = document.querySelector('footer');
const clearBtn = document.querySelector('#clearBtn');
const imgToCtx = document.createElement('img');
const fillColor = document.querySelector('#fillStyle');
const strokeColor = document.querySelector('#strokeStyle');

const headerHeight = header.offsetHeight;
const toolsPanelWidth = toolsPanel.offsetWidth;
const footerHeight = footer.offsetHeight;

const contexts = [];

const canvas = document.querySelector('.canvas-element');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - toolsPanelWidth;
canvas.height = window.innerHeight - 50;

let isDrawing = false;
let straightLine = false;

let lastX = 0;
let lastY = 0;

const ctxState = {
    fillStyle: fillColor.value,
    strokeStyle: strokeColor.value,
}

function draw(e, shape = 'line', fill = 'black', stroke = 'black') {
    if (!isDrawing) return;

    if (!straightLine) {
        ctx.strokeStyle = ctxState.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    } else {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
}

function createCtx() {

}

function addCtxToLocalStorage() {
    const imageURL = canvas.toDataURL();
    localStorage.setItem('imageURL', imageURL);
}

function getCtxFromLocalStorage() {
    imgToCtx.src = localStorage.imageURL;
    ctx.drawImage(imgToCtx, 0, 0);
}

function clearCtx(x = 0, y = 0, w = canvas.width, h = canvas.height) {
    ctx.clearRect(x, y, w, h)
    addCtxToLocalStorage();
}

window.onload = () => {
    if (localStorage.imageURL) {
        getCtxFromLocalStorage();
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth - toolsPanelWidth;
    canvas.height = window.innerHeight - headerHeight - footerHeight;
    
    if (localStorage.imageURL) {
        getCtxFromLocalStorage();
    }
    
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    straightLine = e.shiftKey;
    [lastX, lastY] = [e.offsetX, e.offsetY]
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousemove', (e) => {
    straightLine = e.shiftKey;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    addCtxToLocalStorage();
    getCtxFromLocalStorage();
});

/* canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    addCtxToLocalStorage();
}); */

fillColor.addEventListener('change', () => {
    ctxState.fillStyle = fillColor.value;
});

strokeColor.addEventListener('change', () => {
    ctxState.strokeStyle = strokeColor.value;
});

clearBtn.addEventListener('click', (e) => {
    clearCtx();
});