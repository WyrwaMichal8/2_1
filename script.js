

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener('click', () => {
    answer.innerHTML = 'Ładowanie...';
    fetch(POSTS_URL, { method: 'GET' })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(posts => {
        answer.innerHTML = '<ul>' + posts.map(p =>
          `<li><strong>#${p.id} — ${esc(p.title)}</strong>
           <div style="white-space:pre-wrap">${esc(p.body)}</div></li>`
        ).join('') + '</ul>';
      })
      .catch(err => answer.textContent = 'Błąd: ' + err.message);
  });

  cw2.addEventListener("click", function() {
    //TODO
  })

  cw3.addEventListener("click", function() {
    //TODO
  })

})();
