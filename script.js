

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
    sel = document.getElementById('choose').value;
    if (sel == '') {
      answer.innerHTML = 'Ładowanie...';
      fetch(POSTS_URL, { method: 'GET' })
        .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
        .then(posts => {
          answer.innerHTML = '<ul>' + posts.map(p =>
            `<li><h3 class="post-title""">#${p.id} — ${esc(p.title)}</h3>
           <div class="post-body"">${esc(p.body)}</div></li>`
          ).join('') + '</ul>';
        })
        .catch(err => answer.textContent = 'Błąd: ' + err.message);
    }

    else {
      answer.innerHTML = 'Ładowanie...';
      fetch(`https://jsonplaceholder.typicode.com/posts/${sel}`, { method: 'GET' })
        .then(r => {
          if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
          return r.json();
        })
        .then(post => {
          answer.innerHTML = `<div><h3 class="post-title">#${esc(post.id)} — ${esc(post.title)}</h3><div class="post-body">${esc(post.body)}</div></div>`;
        })
        .catch(err => {
          answer.textContent = 'Błąd: ' + err.message;
          console.error(err);
        });
    }


  });

  cw2.addEventListener('click', () => {
    const payload = {
      title: 'Przykładowy tytuł',
      body: 'To jest treść nowego posta.',
      userId: 1
    };

    answer.textContent = 'Processing…';

    fetch(POSTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
        return response.json();
      })
      .then(data => {
        answer.textContent = `Dodano nowy post o ID = ${data.id}`;
      })
      .catch(err => {
        answer.textContent = 'Wystąpił błąd: ' + err.message;
        console.error(err);
      });
  })

  cw3.addEventListener('click', () => {
    sel = document.getElementById('choose').value;
    if (!sel) {
      console.log('Nie wybrano posta.');
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${sel}`)
      .then(r => r.json())
      .then(post => {
        console.log('Wybrany post:', post);
      })
      .catch(err => console.error('Błąd:', err));
  })

})();
