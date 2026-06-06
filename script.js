const SIFRE = "1234";
const SES_SURESI = 5860;
const ogrenciler = [
    "Alp Burak Atalay", "Arda Türkgenç", "Atlas Erk Atilla", "Baybars Ayhan",
    "Bulut Ege Gümüştekin", "Cihangir Koca", "Ece Kartal", "Elisa Öztürk",
    "Emir Alp Keskin", "Eylül Dinçer", "Hera Deniz Koca", "İbrahim Eray Öcal",
    "Sevil Ela Zeybek", "Tibet Özenç", "Tuna Uğurlu", "Vera Atay",
    "Yaren Gözübüyük", "Yiğithan Yiğit", "Yunus Emre Çiğdem", "Yusuf Ziya Aytaç",
    "Zeynep Asya Çakır", "Zeynep Bölükbaşı", "Emin Çetin"
];

let secilenler = JSON.parse(localStorage.getItem('secilenOgrenciler')) || [];
let kalanlar = ogrenciler.filter(o => !secilenler.includes(o));

function guncelle() {
    document.getElementById('history-list').innerHTML = secilenler.map(n => `<li>${n}</li>`).join('');
    document.getElementById('history-list').scrollTop = 9999;
}
guncelle();

function changeTheme(themeNumber) {
    const themeLink = document.getElementById('themeLink');
    themeLink.href = `css/style${themeNumber}.css`;
    localStorage.setItem('selectedTheme', themeNumber);
}

const themeSelect = document.getElementById('themeSelect');
const savedTheme = localStorage.getItem('selectedTheme') || '1';
themeSelect.value = savedTheme;
changeTheme(savedTheme);

themeSelect.addEventListener('change', (e) => {
    changeTheme(e.target.value);
});

document.getElementById('selectButton').addEventListener('click', () => {
    if (kalanlar.length === 0) return alert("Herkes seçildi!");
    const btn = document.getElementById('selectButton');
    const nameDiv = document.getElementById('student-name');
    btn.disabled = true;
    document.getElementById('mainSound').play();

    let spin = setInterval(() => {
        nameDiv.textContent = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];
        nameDiv.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }, 60);

    setTimeout(() => {
        clearInterval(spin);
        const idx = Math.floor(Math.random() * kalanlar.length);
        const win = kalanlar.splice(idx, 1)[0];
        secilenler.push(win);
        localStorage.setItem('secilenOgrenciler', JSON.stringify(secilenler));
        nameDiv.textContent = win;
        nameDiv.style.color = "#d81b60";
        guncelle();
        btn.disabled = false;
    }, SES_SURESI);
});

document.getElementById('createGroupsBtn').addEventListener('click', () => {
    const size = parseInt(document.getElementById('groupSize').value);
    let pool = [...ogrenciler];
    
    for (let i = 0; i < 5; i++) {
        pool.sort(() => Math.random() - 0.5);
        for (let j = pool.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [pool[j], pool[k]] = [pool[k], pool[j]];
        }
    }

    let resultGroups = [];
    for (let i = 0; i < pool.length; i += size) {
        resultGroups.push(pool.slice(i, i + size));
    }

    if (resultGroups.length > 1 && resultGroups[resultGroups.length - 1].length === 1) {
        const aloneStudent = resultGroups.pop()[0];
        const randomGroupIdx = Math.floor(Math.random() * resultGroups.length);
        resultGroups[randomGroupIdx].push(aloneStudent);
        document.getElementById('info-note').textContent = `* ${aloneStudent} tek kaldığı için rastgele bir gruba dahil edildi.`;
    } else {
        document.getElementById('info-note').textContent = "";
    }

    const container = document.getElementById('groupsContainer');
    container.innerHTML = "";
    resultGroups.forEach((g, i) => {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.innerHTML = `<h3>Takım ${i+1}</h3><ul>${g.map(name => `<li>${name}</li>`).join('')}</ul>`;
        container.appendChild(card);
    });

    document.getElementById('groupModal').style.display = 'flex';
});

document.getElementById('resetBtn').addEventListener('click', () => {
    if (prompt("Şifre:") === SIFRE) {
        localStorage.clear();
        location.reload();
    }
});
