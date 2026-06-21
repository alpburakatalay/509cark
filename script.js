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

const studentDescriptions = {
    "Alp Burak Atalay":     "Sınıfın en meraklı öğrencilerinden biri. Matematik sorularına farklı açılardan yaklaşıyor.",
    "Arda Türkgenç":        "Problem çözme konusunda oldukça yetenekli. Hızlı ve doğru sonuçlara ulaşıyor.",
    "Atlas Erk Atilla":     "Yaratıcı düşünce yapısıyla dikkat çekiyor. Özgün çözümler üretiyor.",
    "Baybars Ayhan":        "Takım çalışmasında liderlik özellikleri gösteriyor. Arkadaşlarına yardımcı olmaktan çekinmiyor.",
    "Bulut Ege Gümüştekin": "Derse aktif katılımı ve enerjisiyle sınıfa pozitif enerji katıyor.",
    "Cihangir Koca":        "Analitik bakış açısıyla sorulara yaklaşıyor. Detaylara özen gösteriyor.",
    "Ece Kartal":           "Düzenli ve disiplinli çalışmasıyla her zaman hazırlıklı geliyor.",
    "Elisa Öztürk":         "Sanata ve matematiğe eşit ilgi gösteriyor. Çok yönlü bir öğrenci.",
    "Emir Alp Keskin":      "Hızlı öğrenme kapasitesiyle dikkat çekiyor. Yeni konuları kolayca kavlıyor.",
    "Eylül Dinçer":         "Düzenli çalışmasıyla sürekli gelişim gösteriyor. Azimli ve kararlı.",
    "Hera Deniz Koca":      "Sınıfın en okuyanı olarak biliniyor. Geniş bir kelime dağarcığına sahip.",
    "İbrahim Eray Öcal":    "Sabırlı ve özverili çalışma anlayışıyla güçlü bir temel oluşturuyor.",
    "Sevil Ela Zeybek":     "Güçlü iletişim becerileriyle öne çıkıyor. Sınıfta olumlu bir atmosfer yaratıyor.",
    "Tibet Özenç":          "Özgün bakış açısıyla sorunlara çözüm üretiyor. Meraklı ve araştırmacı.",
    "Tuna Uğurlu":          "Sınıfın en girişimci öğrencilerinden biri. Projelerde inisiyatif alıyor.",
    "Vera Atay":            "Detaylara olan ilgisiyle mükemmeliyetçi bir yapısı var. Titiz ve özenli çalışıyor.",
    "Yaren Gözübüyük":      "Sosyal ve yardımsever bir öğrenci. Grup çalışmalarında uyumu artırıyor.",
    "Yiğithan Yiğit":       "Spor ve derslerdeki başarısıyla dengeli ve çok yönlü bir öğrenci.",
    "Yunus Emre Çiğdem":    "Sabırlı ve odaklı çalışma tarzıyla uzun vadede başarıya ulaşıyor.",
    "Yusuf Ziya Aytaç":     "Mantıksal düşünme yeteneği oldukça gelişmiş. Karmaşık problemleri kolayca çözüyor.",
    "Zeynep Asya Çakır":    "Meraklı ve araştırmacı kişiliğiyle öne çıkıyor. Sorgulamayı seviyor.",
    "Zeynep Bölükbaşı":     "Tutarlı çalışmasıyla her derste başarı sağlıyor. Güvenilir ve sorumluluk sahibi.",
    "Emin Çetin":           "Sınıfın en enerjik ve dinamik öğrencisi. Her aktiviteye büyük hevesle katılıyor."
};

const mathSymbols = [
    '∑', '∫', '∞', 'π', '√', '∀', '∃', 'σ', '∏', '∩',
    '∪', '≡', '≠', '≥', '≤', '⊗', '≈', '∇', '∂', 'α',
    'β', 'x', 'y', 'z', '=', '+', '-', '1', '2', '3', '4', '5'
];

const avatarColors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
    "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B88B", "#AED6F1",
    "#F1948A", "#73C6B6", "#F5B041", "#D7BDE2", "#82E0AA"
];

let studentData = JSON.parse(localStorage.getItem('studentData')) || {};
let secilenler = JSON.parse(localStorage.getItem('secilenOgrenciler')) || [];

function initializeStudentData() {
    ogrenciler.forEach(name => {
        if (!studentData[name]) {
            studentData[name] = { selectionCount: 0 };
        }
    });
    saveStudentData();
}

function getAvatarColor(name) {
    return avatarColors[ogrenciler.indexOf(name) % avatarColors.length];
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

function nameToAvatarPath(name) {
    return 'avatar/' + name.toLowerCase().replace(/\s+/g, '') + '.png';
}

function saveStudentData() {
    localStorage.setItem('studentData', JSON.stringify(studentData));
}

function saveSelections() {
    localStorage.setItem('secilenOgrenciler', JSON.stringify(secilenler));
}

function setAvatarDisplay(containerEl, name) {
    const bgColor = getAvatarColor(name);
    const initials = getInitials(name);
    containerEl.style.backgroundColor = bgColor;
    containerEl.textContent = '';

    const img = document.createElement('img');
    img.src = nameToAvatarPath(name);
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;';
    img.onerror = () => {
        if (containerEl.contains(img)) containerEl.removeChild(img);
        containerEl.textContent = initials;
    };
    containerEl.appendChild(img);
}

function generateMathSymbols() {
    mathSymbols.forEach(sym => {
        const div = document.createElement('div');
        div.className = 'math-symbol';
        div.textContent = sym;
        div.style.left = (Math.random() * 93) + '%';
        div.style.top = (Math.random() * 93) + '%';
        document.body.appendChild(div);
    });
}

// Timer
let timerInterval = null;
let timerRunning = false;
let remainingSeconds = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    document.getElementById('timerDisplay').textContent =
        String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
}

function startTimer() {
    if (timerRunning) return;
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    remainingSeconds = minutes * 60 + seconds;
    if (remainingSeconds <= 0) { alert("Lütfen geçerli bir zaman girin!"); return; }
    timerRunning = true;
    document.getElementById('startTimerBtn').disabled = true;
    timerInterval = setInterval(() => {
        remainingSeconds--;
        updateTimerDisplay();
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            document.getElementById('startTimerBtn').disabled = false;
            document.getElementById('timerDisplay').style.color = "#d81b60";
            triggerConfetti();
            bellSound.loop = true;
            bellSound.currentTime = 0;
            bellSound.play();
            alert("Zaman bitti!");
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('startTimerBtn').disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    remainingSeconds = 0;
    document.getElementById('startTimerBtn').disabled = false;
    document.getElementById('timerDisplay').style.color = "#ff4747";
    updateTimerDisplay();
}

function triggerConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

function openStudentManager() {
    const listDiv = document.getElementById('studentsList');
    listDiv.innerHTML = '';
    ogrenciler.forEach(name => {
        const data = studentData[name];
        const card = document.createElement('div');
        card.className = 'student-card';

        const avatarEl = document.createElement('div');
        avatarEl.className = 'student-avatar';
        setAvatarDisplay(avatarEl, name);
        card.appendChild(avatarEl);

        const nameEl = document.createElement('div');
        nameEl.className = 'student-name';
        nameEl.textContent = name;
        card.appendChild(nameEl);

        const countEl = document.createElement('div');
        countEl.className = 'student-count';
        countEl.innerHTML = `Seçilme: <strong>${data.selectionCount || 0}</strong>`;
        card.appendChild(countEl);

        const descEl = document.createElement('div');
        descEl.className = 'student-desc-text';
        descEl.textContent = studentDescriptions[name] || '';
        card.appendChild(descEl);

        listDiv.appendChild(card);
    });
    document.getElementById('studentPhotoModal').style.display = 'flex';
}

function fisherYatesShuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getUnselectedStudents() {
    return ogrenciler.filter(o => !secilenler.includes(o));
}

function guncelle() {
    document.getElementById('history-list').innerHTML = secilenler.map(n => `<li>${n}</li>`).join('');
    document.getElementById('history-list').scrollTop = 9999;
}

function changeTheme(themeNumber) {
    document.getElementById('themeLink').href = `css/style${themeNumber}.css`;
    localStorage.setItem('selectedTheme', themeNumber);
}

function displaySelectedStudent(name) {
    document.getElementById('student-name').textContent = name;
    document.getElementById('student-name').style.color = "#d81b60";
    setAvatarDisplay(document.getElementById('selectedStudentPhoto'), name);
    document.getElementById('selectedStudentDesc').textContent = studentDescriptions[name] || '';
    document.getElementById('selectedStudentInfo').style.display = 'block';
    studentData[name].selectionCount = (studentData[name].selectionCount || 0) + 1;
    saveStudentData();
}

const mainSound = document.getElementById('mainSound');
const bellSound = document.getElementById('bellSound');

function stopBell() {
    bellSound.pause();
    bellSound.currentTime = 0;
}

// Init
generateMathSymbols();
initializeStudentData();
guncelle();

const themeSelect = document.getElementById('themeSelect');
const savedTheme = localStorage.getItem('selectedTheme') || '1';
themeSelect.value = savedTheme;
changeTheme(savedTheme);

themeSelect.addEventListener('change', e => changeTheme(e.target.value));
document.getElementById('startTimerBtn').addEventListener('click', startTimer);
document.getElementById('pauseTimerBtn').addEventListener('click', pauseTimer);
document.getElementById('stopTimerBtn').addEventListener('click', stopTimer);
document.getElementById('manageStudentsBtn').addEventListener('click', openStudentManager);

document.getElementById('selectButton').addEventListener('click', () => {
    const kalanlar = getUnselectedStudents();
    if (kalanlar.length === 0) { alert("Herkes seçildi!"); return; }

    const btn = document.getElementById('selectButton');
    const nameDiv = document.getElementById('student-name');
    btn.disabled = true;
    mainSound.currentTime = 0;
    mainSound.play();

    let spin = setInterval(() => {
        const randomIdx = Math.floor(Math.random() * ogrenciler.length);
        nameDiv.textContent = ogrenciler[randomIdx];
        nameDiv.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }, 60);

    setTimeout(() => {
        clearInterval(spin);
        const shuffled = fisherYatesShuffle(kalanlar);
        const win = shuffled[0];
        secilenler.push(win);
        saveSelections();
        displaySelectedStudent(win);
        triggerConfetti();
        guncelle();
        btn.disabled = false;
    }, SES_SURESI);
});

document.getElementById('createGroupsBtn').addEventListener('click', () => {
    const size = parseInt(document.getElementById('groupSize').value);
    let pool = fisherYatesShuffle([...ogrenciler]);
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
        document.getElementById('info-note').textContent = '';
    }
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';
    resultGroups.forEach((g, i) => {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.innerHTML = `<h3>Takım ${i + 1}</h3><ul>${g.map(n => `<li>${n}</li>`).join('')}</ul>`;
        container.appendChild(card);
    });
    document.getElementById('groupModal').style.display = 'flex';
});

document.getElementById('resetBtn').addEventListener('click', () => {
    stopBell();
    if (prompt("Şifre:") === SIFRE) {
        localStorage.clear();
        location.reload();
    }
});

updateTimerDisplay();
