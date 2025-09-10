const app = document.getElementById('app');

if (!(app instanceof HTMLDivElement)) {
  throw TypeError('app', { cause: Object.prototype.toString.call(app) });
}

app.innerHTML = `<p>Hello, world!</p>`;

export {};
