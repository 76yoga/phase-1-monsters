document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://127.0.0.1:3000/monsters';
    let currentPage = 1
    const monstersPerPage = 50;
  
    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');
  
    backBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        console.log(currentPage)
        fetchMonsters()
    }
    })
    forwardBtn.addEventListener('click', () => {
      currentPage++;
      console.log(currentPage)
      fetchMonsters()
    })
  
    const monsterForm = document.getElementById('monster-form');
    monsterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-monster').value;
      const age = document.getElementById('monster-age').value;
      const description = document.getElementById('monster-description').value;
      addMonster(name, age, description);
    });
  
    function fetchMonsters() {
      fetch(`${url}?_limit=${monstersPerPage}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(data => displayMonsters(data));
    }
  
    function displayMonsters(monsters) {
      const startingIndex = (currentPage - 1) * monstersPerPage
      const endingIndex = startingIndex + monstersPerPage - 1
      const limitMonsters = monsters.splice(startingIndex, endingIndex)
      const monsterList = document.getElementById('monster-list');
      monsterList.innerHTML = '';
      monsters.forEach(monster => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${monster.name}</h3>
          <p>${monster.age}</p>
          <p>${monster.description}</p>
          `
        monsterList.appendChild(li);
        li.style.listStyle = "none"
      });
    }
  
    
  
    function addMonster(name, age, description) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, description })
      })
      .then(response => response.json())
      .then(() => {
        fetchMonsters();
        document.getElementById('new-monster').value = '';
        document.getElementById('monster-age').value = '';
        document.getElementById('monster-description').value = '';
      });
    }
  
    fetchMonsters();
  });