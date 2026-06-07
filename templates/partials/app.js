<script>    
(function() {
    // ---------- VIPENGELE VYA MSINGI ----------
    const sidebar = document.getElementById('sidebar');
    const pushBtn = document.getElementById('pushmenuBtn');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('main-content');
    
    // Kama hakuna mainContent, tafuta kontena lingine
    const contentArea = mainContent || document.querySelector('.content');
    
    if (!sidebar) return; // Acha kama hakuna sidebar
    
    // ---------- VARIABLES ZA HIFADHI ----------
    let currentPage = 'dashboard'; // Ukurasa wa sasa
    
    // ---------- PAGE CONTROLLERS (KWA AJILI YA KILA UKURASA) ----------
    const pageControllers = {
        // Dashboard controllers
        dashboard: {
            init: function() {
                console.log('✓ Dashboard imepakiwa');
                this.initCharts();
                this.initStats();
            },
            initCharts: function() {
                // Weka hapa msimbo wa kuanzisha charts za dashboard
                // Kwa mfano, kama unatumia Chart.js au nyingine
                const chartElements = document.querySelectorAll('[data-chart]');
                if (chartElements.length) {
                    console.log('Charts zinaanzishwa...');
                }
            },
            initStats: function() {
                // Msimbo wa statistics
            },
            cleanup: function() {
                console.log('Kusafisha dashboard');
                // Ondoa event listeners maalum, destroy charts, n.k.
            }
        },
        
        // Students - Details
        'students-details': {
            init: function() {
                console.log('✓ Students details imepakiwa');
                this.initTable();
            },
            initTable: function() {
                // Msimbo wa data table
                const table = document.querySelector('.table');
                if (table) {
                    console.log('Table inaanzishwa...');
                }
            },
            cleanup: function() {
                console.log('Kusafisha students details');
            }
        },
        
        // Students - Report
        'students-report': {
            init: function() {
                console.log('✓ Students report imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Students - Contributions
        'students-contributions': {
            init: function() {
                console.log('✓ Students contributions imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Candidates - Registered
        'candidates-registered': {
            init: function() {
                console.log('✓ Candidates registered imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Candidates - Photo Entry
        'candidates-photo': {
            init: function() {
                console.log('✓ Candidates photo entry imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Candidates - Results
        'candidates-results': {
            init: function() {
                console.log('✓ Candidates results imepakiwa');
            },
            cleanup: function() {}
        },
        
        // CA - All Scores
        'ca-scores': {
            init: function() {
                console.log('✓ CA scores imepakiwa');
            },
            cleanup: function() {}
        },
        
        // CA - Entering Marks
        'ca-marks': {
            init: function() {
                console.log('✓ CA marks entry imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Teachers - Subject Teachers
        'teachers-subject': {
            init: function() {
                console.log('✓ Subject teachers imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Teachers - Activity
        'teachers-activity': {
            init: function() {
                console.log('✓ Teachers activity imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Teachers - Class Teachers
        'teachers-class': {
            init: function() {
                console.log('✓ Class teachers imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Teacher On Duty - Week Details
        'duty-week': {
            init: function() {
                console.log('✓ Duty week details imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Teacher On Duty - History
        'duty-history': {
            init: function() {
                console.log('✓ Duty history imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Centres - School Info
        'centres-info': {
            init: function() {
                console.log('✓ School info imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Centres - Notifications
        'centres-notifications': {
            init: function() {
                console.log('✓ Notifications imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Exports - CA
        'exports-ca': {
            init: function() {
                console.log('✓ Exports CA imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Reports - SMS
        'reports-sms': {
            init: function() {
                console.log('✓ Reports SMS imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Reports - Soft copies
        'reports-soft': {
            init: function() {
                console.log('✓ Reports soft copies imepakiwa');
            },
            cleanup: function() {}
        },
        
        // Reports - Payments
        'reports-payments': {
            init: function() {
                console.log('✓ Reports payments imepakiwa');
            },
            cleanup: function() {}
        }
    };
    
    // ---------- SEHEMU YA 1: KAZI ZA SIDEBAR (KUNJA/KUFUNGUA) ----------
    function setSidebarState(collapsed) {
        if (collapsed) {
            sidebar.classList.add('sidebar-mini');
        } else {
            sidebar.classList.remove('sidebar-mini');
        }

        // Simamia overlay kwenye vifaa vidogo
        if (window.innerWidth <= 768) {
            if (collapsed) {
                overlay?.classList.remove('active');
            } else {
                overlay?.classList.add('active');
            }
        } else {
            overlay?.classList.remove('active');
        }

        // Hifadhi kwenye localStorage
        localStorage.setItem('sidebarCollapsed', collapsed);
    }

    // Pakia hali iliyohifadhiwa
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
        setSidebarState(savedState === 'true');
    } else {
        setSidebarState(false); // Default: haijakunjwa
    }

    // Toggle kwa kubofya kitufe
    if (pushBtn) {
        pushBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isCollapsed = sidebar.classList.contains('sidebar-mini');
            setSidebarState(!isCollapsed);
        });
    }

    // Kufunga sidebar kwa kubofya overlay (simu)
    if (overlay) {
        overlay.addEventListener('click', function() {
            setSidebarState(true);
        });
    }

    // Kusubiri mabadiliko ya ukubwa wa skrini
    window.addEventListener('resize', function() {
        const isCollapsed = sidebar.classList.contains('sidebar-mini');
        if (window.innerWidth <= 768) {
            if (!isCollapsed) {
                overlay?.classList.add('active');
            } else {
                overlay?.classList.remove('active');
            }
        } else {
            overlay?.classList.remove('active');
        }
    });

    // ---------- SEHEMU YA 2: KUFUNGUA/KUFUNGA SUBMENU ----------
    document.querySelectorAll('.nav-sidebar > .nav-item > .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            
            // Kama submenu tayari iko wazi, ifunge
            if (parent.classList.contains('menu-open')) {
                parent.classList.remove('menu-open');
            } else {
                // Funga submenu nyingine zote
                document.querySelectorAll('.nav-sidebar > .nav-item.menu-open').forEach(el => {
                    if (el !== parent) el.classList.remove('menu-open');
                });
                // Fungua hii
                parent.classList.add('menu-open');
            }
        });
    });

    // ---------- SEHEMU YA 3: KAZI ZA KUP AKIA SEHEMU (SPA) ----------
    
    // Kazi ya kupakia ukurasa
    // Kazi ya kupata item kuu (parent) kutoka kwa submenu
function getTopLevelNavItem(submenuLink) {
    // Tafuta li ya submenu
    const submenuLi = submenuLink.closest('li.nav-item');
    if (!submenuLi) return null;
    
    // Tafuta ul mzazi wa submenuLi (lazima uwe .nav-treeview)
    const parentUl = submenuLi.parentElement;
    if (parentUl && parentUl.classList.contains('nav-treeview')) {
        // Tafuta li ambalo ni mzazi wa parentUl (hicho ndicho item kuu)
        const parentLi = parentUl.closest('li.nav-item');
        return parentLi;
    }
    return null;
}
    function loadPage(pageName) {
        // Kama hakuna pageName, tumia dashboard
        if (!pageName) pageName = 'dashboard';
        
        const url = `/static/pages/${pageName}.html`;  // Ikiwa umeweka kwenye static/pages
        
        // Onyesha loading spinner
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="text-center p-5">
                    <i class="fas fa-spinner fa-spin fa-3x" style="color: #09E783;"></i>
                    <p class="mt-3"></p>
                </div>
            `;
        } else {
            console.error('Content area haipatikani');
            return;
        }

        // Pakia HTML kutoka kwa faili
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ukurasa ${pageName}.html haupatikani`);
                }
                return response.text();
            })
            .then(html => {
                // SAFISHA: Ondoa kumbukumbu za ukurasa uliopita
                if (currentPage && pageControllers[currentPage]?.cleanup) {
                    try {
                        pageControllers[currentPage].cleanup();
                    } catch (error) {
                        console.warn('Cleanup error:', error);
                    }
                }
                
                // INGIZA HTML mpya
                contentArea.innerHTML = html;
                
                // ANZISHA: Iite kazi ya kuanzisha ukurasa mpya
                if (pageControllers[pageName]?.init) {
                    try {
                        pageControllers[pageName].init();
                    } catch (error) {
                        console.error(`Error initializing ${pageName}:`, error);
                    }
                }
                
                // SASISHA: Weka currentPage
                currentPage = pageName;
                
                // SASISHA: Badilisha class active kwenye menyu
                // Ondoa active kwenye viungo vyote vya submenu pekee
                document.querySelectorAll('.nav-link').forEach(el => {
                el.classList.remove('active');
                });
                
                const activeSubLink = document.querySelector(`a[data-page="${pageName}"]`);
                if (activeSubLink) {
                    activeSubLink.classList.add('active');
                    
                    // Hakikisha submenu ya mzazi iko wazi
                    const parentNavItem = activeSubLink.closest('.nav-item');
                    if (parentNavItem) {
                        // Fungua submenu ya mzazi
                        const parentMenu = parentNavItem.closest('.nav-treeview')?.closest('.nav-item');
                   if (parentMenu) {
                        parentMenu.classList.add('menu-open');
                    } else {
                        // Ikiwa hakuna parentMenu, basi hii ni submenu ya ngazi ya kwanza,
                        // hakikisha nav-item yake imefunguliwa
                        const directParent = activeSubLink.closest('.nav-item');
                        if (directParent) {
                            directParent.classList.add('menu-open');
                        }
                    }
                }
                    
                        // ONGEZA: Weka active kwenye item kuu (parent)
                    const topLevelItem = getTopLevelNavItem(activeSubLink);
                    if (topLevelItem) {
                        const topLink = topLevelItem.querySelector(':scope > .nav-link');
                        if (topLink) {
                            topLink.classList.add('active');
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                if (contentArea) {
                    contentArea.innerHTML = `
                        <div class="alert alert-danger m-4">
                            <i class="fas fa-exclamation-triangle"></i>
                            Kuna tatizo la kupakia ukurasa: ${error.message}
                            <br><br>
                            <button class="btn btn-sm btn-dark" onclick="location.reload()">
                                <i class="fas fa-redo"></i> Jaribu tena
                            </button>
                        </div>
                    `;
                }
            });
    }

    // ---------- SEHEMU YA 4: EVENT LISTENERS KWA VIUNGO VYA SUBMENU ----------
    // Chagua viungo vyote vyenye data-page (submenu)
    const menuLinks = document.querySelectorAll('a[data-page]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Zuia kurudisha ukurasa
            
            const page = this.dataset.page;
            if (!page) return;
            
            // Pakia ukurasa
            loadPage(page);
            
            // Badilisha URL kwenye kishada (history)
            history.pushState({ page }, '', `?page=${page}`);
        });
    });

    // ---------- SEHEMU YA 5: KUSHUGHULIKIA VITUFE VYA NYUMA/MBELE ----------
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            loadPage(e.state.page);
        } else {
            // Ikiwa hakuna state, pakia dashboard
            loadPage('dashboard');
            // Badilisha active kwenye menyu
            document.querySelectorAll('.nav-link.active').forEach(el => el.classList.remove('active'));
            const defaultLink = document.querySelector('a[data-page="dashboard"]');
            if (defaultLink) defaultLink.classList.add('active');
        }
    });

    // ---------- SEHEMU YA 6: PAKIA UKURASA WA AWALI ----------
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'dashboard';
    
    // Pakia ukurasa wa awali baada ya muda mfupi ili kuruhusu DOM kupakia kwanza
    setTimeout(() => {
        loadPage(initialPage);
    }, 100);

    // ---------- SEHEMU YA 7: HIFADHI DATA-PAGE KWA SUBMENU ZOTE (KAMA HAZIPO) ----------
    // Hii ni kukusaidia kuongeza data-page kwa haraka ikiwa umesahau
    // Unaweza kuiondoa baadaye
    const submenuMap = {
        // Dashboard
        'Summaries': 'dashboard',
        
        // Students
        'Details': 'students-details',
        'Report': 'students-report',
        'Constributions': 'students-contributions',
        
        // Candidates
        'Registered': 'candidates-registered',
        'Photo Entry': 'candidates-photo',
        'Results': 'candidates-results',
        
        // CA Collections
        'All Scores': 'ca-scores',
        'Entering marks': 'ca-marks',
        
        // Teachers
        'Subject Teachers': 'teachers-subject',
        'Taechers activity': 'teachers-activity',
        'Class Teachers': 'teachers-class',
        
        // Teacher On Duty
        'Week Details': 'duty-week',
        'Duty History': 'duty-history',
        
        // Centres
        'School Info': 'centres-info',
        'Notifications': 'centres-notifications',
        
        // Exports
        'CA': 'exports-ca',
        
        // Reports
        'SMS': 'reports-sms',
        'Soft copies': 'reports-soft',
        'Payments': 'reports-payments'
    };
    
    // Ongeza data-page kwenye viungo ambavyo havina (kwa usaidizi)
    document.querySelectorAll('.nav-treeview a.nav-link').forEach(link => {
        if (!link.hasAttribute('data-page')) {
            const linkText = link.querySelector('p')?.textContent?.trim();
            if (linkText && submenuMap[linkText]) {
                link.setAttribute('data-page', submenuMap[linkText]);
                console.log(`✓ data-page imeongezwa kwa: ${linkText}`);
            }
        }
    });

})();






document.addEventListener("keydown", function(e){

    const active = document.activeElement;

    // Hakikisha tunafanya kazi tu kwenye inputs za marks
    if(!active.classList.contains("mark-input")) return;

    const inputs = [...document.querySelectorAll(".mark-input")];
    const index = inputs.indexOf(active);

    // ENTER au Arrow Down → input inayofuata
    if(e.key === "Enter" || e.key === "ArrowDown"){
        e.preventDefault();

        if(index < inputs.length - 1){
            inputs[index + 1].focus();
            inputs[index + 1].select();
        }
    }

    // Arrow Up → input iliyopita
    if(e.key === "ArrowUp"){
        e.preventDefault();

        if(index > 0){
            inputs[index - 1].focus();
            inputs[index - 1].select();
        }
    }

});



document.addEventListener("keydown", function(e){

    const input = e.target;

    if(!input.classList.contains("mark-input")) return;

    const errorText = input.nextElementSibling;

    const allowedKeys = [
        "Backspace","Delete","Tab",
        "ArrowLeft","ArrowRight",
        "ArrowUp","ArrowDown",
        "Enter","."
    ];

    /* ---- ZUIA LETTERS ---- */
    if(!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)){
        e.preventDefault();
        input.classList.add("mark-error");
        if(errorText) errorText.textContent = "Namba tu zinakubaliwa";
        return;
    }

    /* ---- ZUIA NUKTA MBILI ---- */
    if(e.key === "." && input.value.includes(".")){
        e.preventDefault();
    }

});


document.addEventListener("input", function(e){

    const input = e.target;

    if(!input.classList.contains("mark-input")) return;

    const value = parseFloat(input.value);
    const errorText = input.nextElementSibling;

    if(input.value === ""){
        input.classList.remove("mark-error");
        if(errorText) errorText.textContent = "";
        return;
    }

    /* ---- RANGE VALIDATION ---- */
    if(value < 0 || value > 100){
        input.classList.add("mark-error");
        if(errorText) errorText.textContent = "Marks lazima ziwe 0 hadi 100";
    }
    else{
        input.classList.remove("mark-error");
        if(errorText) errorText.textContent = "";
    }

});



document.addEventListener("change", function(e){

    if(e.target.id === "toggleKeyboard"){

        const keyboard = document.getElementById("floatingKeyboard");

        if(!keyboard) return;

        if(e.target.checked){
            keyboard.style.display = "block";
        }else{
            keyboard.style.display = "none";
        }

    }

});


let activeInput = null;

/* kugundua input iliyofocus */
document.addEventListener("focusin", function(e){

    if(e.target.classList.contains("mark-input")){
        activeInput = e.target;
    }

});


/* kusikiliza buttons za keyboard */
document.addEventListener("click", function(e){

    if(!e.target.classList.contains("key")) return;

    if(!activeInput) return;

    let value = e.target.innerText;

    // OK
    if(value === "OK"){
        activeInput.blur();
        return;
    }

    // Backspace
    if(value === "⌫"){
        activeInput.value = activeInput.value.slice(0,-1);
        return;
    }

    // kuongeza character
    //activeInput.value += value;
    //autoNext();

});


</script>

<!-- Toggle Custom Keyboard 
 

<label style="float:right; margin-right:20px;">
  <input type="checkbox" id="toggleKeyboard"> Custom Keyboard
</label>

-- Floating Keyboard --
<div id="floatingKeyboard" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:white; padding:10px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.3); z-index:9999; max-width:95%;">
  <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
    <button class="key">1</button>
    <button class="key">2</button>
    <button class="key">3</button>
    <button class="key">4</button>
    <button class="key">5</button>
    <button class="key">6</button>
    <button class="key">7</button>
    <button class="key">8</button>
    <button class="key">9</button>
    <button class="key">.</button>
    <button class="key">0</button>
    <button class="key back">⌫</button>
    <button class="key ok" style="background:#2ecc71; color:white;">OK</button>
    <button class="key focus-back" style="background:#f39c12; color:white;"><i class="fas fa-arrow-left"></i></button>
  </div>
</div>
-->
<!-- FontAwesome kwa arrow -->
<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

<script>

document.addEventListener("DOMContentLoaded", function(){

  const toggle = document.getElementById("toggleKeyboard");
  const keyboard = document.getElementById("floatingKeyboard");
  let activeInput = null;
    function autoNext(){

      const val = activeInput.value.trim();

      const inputs = Array.from(document.querySelectorAll(".mark-input"));
      const idx = inputs.indexOf(activeInput);

      if(idx === -1 || idx+1 >= inputs.length) return;

      // kama ni 100
      if(val === "100"){
        inputs[idx+1].focus();
        return;
      }

      // kama ni decimal kamili mfano 26.5
      if(/^\d+\.\d$/.test(val)){
        inputs[idx+1].focus();
        return;
      }

      // kama ni digits 2 chini ya 100
      if(/^\d{2}$/.test(val) && Number(val) < 100){
        inputs[idx+1].focus();
      }

    }  
      // ON/OFF switch
  toggle.addEventListener("change", function(){
    keyboard.style.display = this.checked ? "block" : "none";
  });

  // Track focused input in table
  document.addEventListener("focusin", function(e){
    if(e.target.classList.contains("mark-input")){
      activeInput = e.target;
      activeInput.select();
    }
  });

  // Validation function
  function validateMark(input){
    const val = input.value.trim();
    const errorEl = input.parentElement.querySelector(".error-text");

    if(isNaN(Number(val)) || Number(val)<0 || Number(val)>100){
      input.style.borderColor = "#e74c3c"; // red border
      if(errorEl) errorEl.innerText = "Mark lazima iwe namba 0-100";
      return false;
    }

    input.style.borderColor = "#2ecc71"; // green border
    if(errorEl) errorEl.innerText = "";
    return true;
  }

  // Handle keyboard button clicks
  keyboard.addEventListener("click", function(e){
    const key = e.target.closest(".key");
    if(!key || !activeInput) return;

    const value = key.innerText.trim();

    // OK button
    if(key.classList.contains("ok")){
      const valid = validateMark(activeInput);
      if(valid){
        const inputs = Array.from(document.querySelectorAll(".mark-input"));
        const idx = inputs.indexOf(activeInput);
        if(idx !== -1 && idx+1 < inputs.length){
          inputs[idx+1].focus();
        }
      } else {
        activeInput.focus(); // keep focus if invalid
      }
      return;
    }

    // Backspace
    if(key.classList.contains("back")){
      activeInput.value = activeInput.value.slice(0,-1);
      return;
    }

    // Focus previous input
    if(key.classList.contains("focus-back")){
      const inputs = Array.from(document.querySelectorAll(".mark-input"));
      const idx = inputs.indexOf(activeInput);
      if(idx>0){
        inputs[idx-1].focus();
        
      }
      return;
    }

    // Append number/dot
    if(value === '.' && activeInput.value.includes('.')) return; // prevent multiple dots
    activeInput.value += value;
    autoNext();
  });

});

//kufunga marks_menu ukibofya nje ya menu
document.addEventListener("click", function(e){

if(!btn.contains(e.target) && !menu.contains(e.target)){
menu.style.display = "none";
}

});

// kutuma data kwenye flask na kuunda excel file
document.getElementById("createFile").addEventListener("click", function(e){
    e.preventDefault();

    const rows = document.querySelectorAll("table tbody tr");
    let data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");

        if(cells.length < 4) return; // safety

        const markInput = cells[3].querySelector(".mark-input");
        if(!markInput) return; // safety

        const mark = markInput.value.trim();

        if(mark === "") return; // skip empty

        data.push({
            Cerial: cells[0].innerText.trim(),
            Name: cells[1].innerText.trim(),
            Sex: cells[2].innerText.trim(),
            Marks: mark
        });
    });

    console.log(data); // 🔥 debug hapa

    fetch("/create-excel", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => {
        if(!res.ok) throw new Error("Server error");
        return res.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "marks.xlsx";
        a.click();
    })
    .catch(err => {
        console.error(err);
        alert("Kuna error kwenye server");
    });
});
</script>