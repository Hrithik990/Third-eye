document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Country dial code selector
  var countries = [
    {name:"Afghanistan",code:"+93"},
    {name:"Albania",code:"+355"},
    {name:"Algeria",code:"+213"},
    {name:"Andorra",code:"+376"},
    {name:"Angola",code:"+244"},
    {name:"Antigua and Barbuda",code:"+1-268"},
    {name:"Argentina",code:"+54"},
    {name:"Armenia",code:"+374"},
    {name:"Australia",code:"+61"},
    {name:"Austria",code:"+43"},
    {name:"Azerbaijan",code:"+994"},
    {name:"Bahamas",code:"+1-242"},
    {name:"Bahrain",code:"+973"},
    {name:"Bangladesh",code:"+880"},
    {name:"Barbados",code:"+1-246"},
    {name:"Belarus",code:"+375"},
    {name:"Belgium",code:"+32"},
    {name:"Belize",code:"+501"},
    {name:"Benin",code:"+229"},
    {name:"Bhutan",code:"+975"},
    {name:"Bolivia",code:"+591"},
    {name:"Bosnia and Herzegovina",code:"+387"},
    {name:"Botswana",code:"+267"},
    {name:"Brazil",code:"+55"},
    {name:"Brunei",code:"+673"},
    {name:"Bulgaria",code:"+359"},
    {name:"Burkina Faso",code:"+226"},
    {name:"Burundi",code:"+257"},
    {name:"Cabo Verde",code:"+238"},
    {name:"Cambodia",code:"+855"},
    {name:"Cameroon",code:"+237"},
    {name:"Canada",code:"+1"},
    {name:"Central African Republic",code:"+236"},
    {name:"Chad",code:"+235"},
    {name:"Chile",code:"+56"},
    {name:"China",code:"+86"},
    {name:"Colombia",code:"+57"},
    {name:"Comoros",code:"+269"},
    {name:"Congo (DRC)",code:"+243"},
    {name:"Congo (Republic)",code:"+242"},
    {name:"Costa Rica",code:"+506"},
    {name:"Croatia",code:"+385"},
    {name:"Cuba",code:"+53"},
    {name:"Cyprus",code:"+357"},
    {name:"Czech Republic",code:"+420"},
    {name:"Denmark",code:"+45"},
    {name:"Djibouti",code:"+253"},
    {name:"Dominica",code:"+1-767"},
    {name:"Dominican Republic",code:"+1-809"},
    {name:"East Timor",code:"+670"},
    {name:"Ecuador",code:"+593"},
    {name:"Egypt",code:"+20"},
    {name:"El Salvador",code:"+503"},
    {name:"Equatorial Guinea",code:"+240"},
    {name:"Eritrea",code:"+291"},
    {name:"Estonia",code:"+372"},
    {name:"Eswatini",code:"+268"},
    {name:"Ethiopia",code:"+251"},
    {name:"Fiji",code:"+679"},
    {name:"Finland",code:"+358"},
    {name:"France",code:"+33"},
    {name:"Gabon",code:"+241"},
    {name:"Gambia",code:"+220"},
    {name:"Georgia",code:"+995"},
    {name:"Germany",code:"+49"},
    {name:"Ghana",code:"+233"},
    {name:"Greece",code:"+30"},
    {name:"Grenada",code:"+1-473"},
    {name:"Guatemala",code:"+502"},
    {name:"Guinea",code:"+224"},
    {name:"Guinea-Bissau",code:"+245"},
    {name:"Guyana",code:"+592"},
    {name:"Haiti",code:"+509"},
    {name:"Honduras",code:"+504"},
    {name:"Hungary",code:"+36"},
    {name:"Iceland",code:"+354"},
    {name:"India",code:"+91"},
    {name:"Indonesia",code:"+62"},
    {name:"Iran",code:"+98"},
    {name:"Iraq",code:"+964"},
    {name:"Ireland",code:"+353"},
    {name:"Israel",code:"+972"},
    {name:"Italy",code:"+39"},
    {name:"Ivory Coast",code:"+225"},
    {name:"Jamaica",code:"+1-876"},
    {name:"Japan",code:"+81"},
    {name:"Jordan",code:"+962"},
    {name:"Kazakhstan",code:"+7"},
    {name:"Kenya",code:"+254"},
    {name:"Kiribati",code:"+686"},
    {name:"Kosovo",code:"+383"},
    {name:"Kuwait",code:"+965"},
    {name:"Kyrgyzstan",code:"+996"},
    {name:"Laos",code:"+856"},
    {name:"Latvia",code:"+371"},
    {name:"Lebanon",code:"+961"},
    {name:"Lesotho",code:"+266"},
    {name:"Liberia",code:"+231"},
    {name:"Libya",code:"+218"},
    {name:"Liechtenstein",code:"+423"},
    {name:"Lithuania",code:"+370"},
    {name:"Luxembourg",code:"+352"},
    {name:"Madagascar",code:"+261"},
    {name:"Malawi",code:"+265"},
    {name:"Malaysia",code:"+60"},
    {name:"Maldives",code:"+960"},
    {name:"Mali",code:"+223"},
    {name:"Malta",code:"+356"},
    {name:"Marshall Islands",code:"+692"},
    {name:"Mauritania",code:"+222"},
    {name:"Mauritius",code:"+230"},
    {name:"Mexico",code:"+52"},
    {name:"Micronesia",code:"+691"},
    {name:"Moldova",code:"+373"},
    {name:"Monaco",code:"+377"},
    {name:"Mongolia",code:"+976"},
    {name:"Montenegro",code:"+382"},
    {name:"Morocco",code:"+212"},
    {name:"Mozambique",code:"+258"},
    {name:"Myanmar",code:"+95"},
    {name:"Namibia",code:"+264"},
    {name:"Nauru",code:"+674"},
    {name:"Nepal",code:"+977"},
    {name:"Netherlands",code:"+31"},
    {name:"New Zealand",code:"+64"},
    {name:"Nicaragua",code:"+505"},
    {name:"Niger",code:"+227"},
    {name:"Nigeria",code:"+234"},
    {name:"North Korea",code:"+850"},
    {name:"North Macedonia",code:"+389"},
    {name:"Norway",code:"+47"},
    {name:"Oman",code:"+968"},
    {name:"Pakistan",code:"+92"},
    {name:"Palau",code:"+680"},
    {name:"Palestine",code:"+970"},
    {name:"Panama",code:"+507"},
    {name:"Papua New Guinea",code:"+675"},
    {name:"Paraguay",code:"+595"},
    {name:"Peru",code:"+51"},
    {name:"Philippines",code:"+63"},
    {name:"Poland",code:"+48"},
    {name:"Portugal",code:"+351"},
    {name:"Qatar",code:"+974"},
    {name:"Romania",code:"+40"},
    {name:"Russia",code:"+7"},
    {name:"Rwanda",code:"+250"},
    {name:"Saint Kitts and Nevis",code:"+1-869"},
    {name:"Saint Lucia",code:"+1-758"},
    {name:"Saint Vincent",code:"+1-784"},
    {name:"Samoa",code:"+685"},
    {name:"San Marino",code:"+378"},
    {name:"Sao Tome and Principe",code:"+239"},
    {name:"Saudi Arabia",code:"+966"},
    {name:"Senegal",code:"+221"},
    {name:"Serbia",code:"+381"},
    {name:"Seychelles",code:"+248"},
    {name:"Sierra Leone",code:"+232"},
    {name:"Singapore",code:"+65"},
    {name:"Slovakia",code:"+421"},
    {name:"Slovenia",code:"+386"},
    {name:"Solomon Islands",code:"+677"},
    {name:"Somalia",code:"+252"},
    {name:"South Africa",code:"+27"},
    {name:"South Korea",code:"+82"},
    {name:"South Sudan",code:"+211"},
    {name:"Spain",code:"+34"},
    {name:"Sri Lanka",code:"+94"},
    {name:"Sudan",code:"+249"},
    {name:"Suriname",code:"+597"},
    {name:"Sweden",code:"+46"},
    {name:"Switzerland",code:"+41"},
    {name:"Syria",code:"+963"},
    {name:"Taiwan",code:"+886"},
    {name:"Tajikistan",code:"+992"},
    {name:"Tanzania",code:"+255"},
    {name:"Thailand",code:"+66"},
    {name:"Togo",code:"+228"},
    {name:"Tonga",code:"+676"},
    {name:"Trinidad and Tobago",code:"+1-868"},
    {name:"Tunisia",code:"+216"},
    {name:"Turkey",code:"+90"},
    {name:"Turkmenistan",code:"+993"},
    {name:"Tuvalu",code:"+688"},
    {name:"Uganda",code:"+256"},
    {name:"Ukraine",code:"+380"},
    {name:"United Arab Emirates",code:"+971"},
    {name:"United Kingdom",code:"+44"},
    {name:"United States",code:"+1"},
    {name:"Uruguay",code:"+598"},
    {name:"Uzbekistan",code:"+998"},
    {name:"Vanuatu",code:"+678"},
    {name:"Vatican City",code:"+379"},
    {name:"Venezuela",code:"+58"},
    {name:"Vietnam",code:"+84"},
    {name:"Yemen",code:"+967"},
    {name:"Zambia",code:"+260"},
    {name:"Zimbabwe",code:"+263"}
  ];

  var selector = document.getElementById('countrySelector');
  if (!selector) return;

  var toggleBtn = document.getElementById('countrySelectorToggle');
  var dropdown = document.getElementById('countryDropdown');
  var searchInput = document.getElementById('countrySearch');
  var listEl = document.getElementById('countryList');
  var hiddenInput = document.getElementById('countryCodeInput');
  var codeSpan = document.getElementById('selectedCode');
  var highlightedIndex = -1;

  function renderList(filter) {
    var query = (filter || '').toLowerCase();
    var filtered = countries.filter(function (c) {
      return c.name.toLowerCase().indexOf(query) !== -1 ||
             c.code.indexOf(query) !== -1;
    });

    listEl.innerHTML = '';
    highlightedIndex = -1;

    if (filtered.length === 0) {
      var noRes = document.createElement('li');
      noRes.className = 'country-selector__no-results';
      noRes.textContent = 'No matching countries';
      listEl.appendChild(noRes);
      return;
    }

    filtered.forEach(function (c) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-code', c.code);
      li.setAttribute('data-name', c.name);

      if (c.code === hiddenInput.value && c.name === (selector.dataset.selectedName || 'Nepal')) {
        li.classList.add('selected');
      }

      li.innerHTML =
        '<span class="cs-name">' + c.name + '</span>' +
        '<span class="cs-dial">' + c.code + '</span>';

      li.addEventListener('click', function () {
        selectCountry(c);
      });

      listEl.appendChild(li);
    });
  }

  function selectCountry(c) {
    hiddenInput.value = c.code;
    if (codeSpan) codeSpan.textContent = c.code;
    selector.dataset.selectedName = c.name;
    closeDropdown();
  }

  function openDropdown() {
    selector.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    searchInput.value = '';
    renderList('');
    setTimeout(function () { searchInput.focus(); }, 50);

    var selected = listEl.querySelector('.selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }

  function closeDropdown() {
    selector.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    highlightedIndex = -1;
  }

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (selector.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  searchInput.addEventListener('input', function () {
    renderList(searchInput.value);
  });

  searchInput.addEventListener('keydown', function (e) {
    var items = listEl.querySelectorAll('li[role="option"]');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, 0);
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        items[highlightedIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
      toggleBtn.focus();
    }
  });

  function updateHighlight(items) {
    items.forEach(function (li, i) {
      if (i === highlightedIndex) {
        li.classList.add('highlighted');
        li.scrollIntoView({ block: 'nearest' });
      } else {
        li.classList.remove('highlighted');
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (!selector.contains(e.target)) {
      closeDropdown();
    }
  });

  selector.dataset.selectedName = 'Nepal';
  renderList('');
});
