(function () {
  "use strict";

  var rawProducts = `
بطانيه نيو روكسانا	1
بطانيه نيو مونتانا	2
دفايه سنبله	3
دفايه لوتس	4
دفايه باندا	5
بطانيه نيو روتانا	6
بطانيه نيو بونيتا	7
بطانيه نيو دريمز	8
بطانيه نيو بيبي دبل	9
بطانيه نيو هارموني	10
بطانيه نيو هافانا	11
دفايه روبي	12
بطانيه نيو ريفانا	13
بطانيه نيو البارون	14
بطانيه نيو كمفورت	15
بطانيه نيو لورين	16
بطانيه نيو بيانكا	17
بطانيه نيو ريماس	18
بطانيه نيو الماسه	19
بطانيه تركي	20
بطانيه سيرينا	21
بطانيه نيو جراند	22
مفرش ساده نيو 1 قطعه	23
حافظه سجاد ايفوريا 2*3 درجه ثانيه	24
سجاده النور - 1	25
بطانيه نيو سولينا جامبو	26
حافظه سجاد فيكتوريا سيكريت	27
دفايه كناريا	28
مفرش اطفال نيو 2 قطعه	29
بطانيه برونز	30
بطانيه نيو كمبنسكي	31
دفايه هاي سيندا	32
بطانيه نيو ميراج	33
بطانيه روتانا ازرق	34
مفرش مشجر نيو	35
مفرش ساده نيو	36
دفايه برلانت	37
بطانيه نيو لندن كيدز	38
بطانيه نيو ستوري	39
دفايه 465	40
حافظه سجاد ايفوريا 2*3	41
دفايه اوتيفا	42
بطانيه نيو لندن 4 نجمه	43
بطانيه نيو لندن 4 نجمه دبل	44
بطانيه نيو لندن 7 نجمه	45
بطانيه نيو لندن 8 نجمه	46
حافظه سجاد ايفوريا 2*3 - تعبئه 5	47
بطانيه نيو لندن 2 نجمه	48
بطانيه نيو لندن 3 نجمه دبل	49
بطانيه نيو لندن 5 نجمه	50
بطانيه نيو لندن 6 نجمه	51
بطانيه موفادا كلاود كسكادا	52
بطانيه ويلز	53
بطانيه سيرينا درجه ثانيه	54
بطانيه نيو كمفورت درجه ثانيه	55
دفايه 450	56
دفايه 40-470	57
دفايه 40-350	58
دفايه 245 - 30	59
دفايه 245 - 25	60
بطانيه نيو لافيستا	61
بطانيه نيو لندن 3 نجمه	62
بطانيه نيو لندن 9 نجمه	63
مفرش اطفال نيو	64
بطانيه نيو سولينا جامبو دبل	65
دفايه كريستال	66
بطانيه سيرينا - 1.7	67
بطانيه نيو البارون - 25	68
باله بطانيه نيو كمفورت - 15	69
بطانيه روتانا دهبي	70
بطانيه نيو لندن بيبي دبل	71
دفايه باندا - 30	72
بطانيه مارينا - 1.7	73
بطانيه نيو بيبي	74
بطانيه بدون شريط - 1.3	75
دفايه هارفي فيلفيت	76
دفايه 650	77
دفايه 730	78
دفايه هاي سيندا - تعبئه 40	79
مفرش اطفال نيو 1 قطعه	80
بطانيه اطفال نيو 1 قطعه	81
بطانيه بورجادا كلاود	82
بطانيه تركي - 2.5	83
بطانيه نيو روتانا درجه ثانيه - 12	84
بطانيه نيو البارون درجه ثانيه	85
بطانيه تركي - 3.2	86
بطانيه سيرينا - 2.5	87
بطانيه مادوفا بيرلا	88
بطانيه نيو البارون درجه ثانيه باله - 9	89
بطانيه نيو كمفورت دبل	90
سجاده النور	91
خداديه	92
مخده	93
سجاده النور درجه ثانيه - 30	94
بطانيه نيو لندن كيدز دبل	95
بطانيه بنفسج - 1.7	96
بطانيه بيج - 1.7	97
بطانيه بيج - 2.5	98
بطانيه الشرطه	99
بطانيه تركي - 4.100	100
دفايه 700	101
بطانيه نيو ريفانا درجه ثانيه	102
بطانيه بدون شريط درجه ثانيه - 1.3	103
بطانيه مادوفا براندو	104
دفايه 770 بشريط	105
مفرش ساده نيو درجه ثانيه	106
مفرش مشجر نيو درجه ثانيه - 4	107
مفرش اطفال نيو درجه ثانيه	108
دفايه 510	109
دفايه 520	110
بطانيه نيو بيبي دبل درجه ثانيه - 30	111
حافظه سجاد ايفوريا 1*3	112
دفايه 260	113
بطانيه نيو فيورا	114
بطانيه فيورا	115
بطانيه نيو البارون دبل - 10	116
بطانيه فينتيا	117
بطانيه نيو دريمز دبل	118
بطانيه فيورا ابل	119
دفايه 260 جاكار	120
بطانيه بيج - 3.5	121
بطانيه بريشيا	122
دفايه 560 كريستال	123
سجاده النور درجه ثانيه	124
بطانيه نيو اوليفا رصاصي	125
بطانيه بورجادا كلاود درجه ثانيه	126
بطانيه روتانا احمر	127
دفايه اينفرنو	128
دفايه نيو فينيسيا	129
اتواب حافظه سجاد	130
بطانيه نيو البارون باله - 9	131
بطانيه بيج - 3.3	132
بطانيه ايفوريا بابلز	133
بطانيه موفادا كلاود بافون	134
بطانيه مادوفا نوفا	135
بطانيه مادوفا بيرلا دبل	136
بطانيه موفادا بابلز دبل	137
دفايه لاروز	138
بطانيه موفادا بابلز كاليدا	139
بطانيه موفادا باليندا	140
بطانيه 2.200 درجه ثانيه	141
بطانيه اطفال 2 طبقه 3ك درجه تانيه	142
بطانيه جولد	143
بطانيه بشريط - 1.3 درجه ثانيه	144
بطانيه برشلونه 2ك	145
بطانيه بشريط - 1.3	146
بطانيه برشلونه 2ك درجه ثانيه	147
مفرش موفادا شبابي درجه تانيه	148
دفايه رفال بابلز	149
بطانيه بيج - 3.7	150
بطانيه نيو اوليفا احمر	151
بطانيه نيو اوليفا ازرق	152
بطانيه باريس 3ك درجه ثانيه - 9	153
بطانيه برشلونه 2.200 درجه ثانيه - 9	154
بطانيه نيو بيانكا درجه ثانيه	155
بطانيه بيبي درجه ثانيه	156
بطانيه نيو لندن 5 نجمه دبل	157
بطانيه نيو روكسانا درجه ثانيه	158
بطانيه نيو بونيتا درجه ثانيه	159
بطانيه نيو بيبي بابلز	160
بطانيه دهب بيج 3.7	161
بطانيه دهب كافيه 3.7	162
بطانيه دهب كشمير 3.7	163
بطانيه موفادا جاسي	164
بطانيه نيو لورين درجه ثانيه - 6	165
بطانيه دهب سكري 3.7	166
بطانيه دهب اسود3.7	167
بطانيه دهب فضي3.7	168
بطانيه دهب رمادي3.7	169
بطانيه دهب فسدقي3.7	170
بطانيه بيج - 2.7	171
بطانيه جولدن هوم - 3.5	172
بطانيه دهب زيتي3.7	173
بطانيه دهب كحلي3.7	174
بطانيه بيج - 5.3	175
بطانيه دهب فضي 2.7	176
بطانيه دهب سكري 2.7	177
بطانيه نيو روتانا خاص تعبئه 12	178
بطانيه دهب كافيه 2.7	179
بطانيه دهب كشمير 2.7	180
بطانيه دهب بيج 2.7	181
بطانيه دهب فسدقي 2.7	182
بطانيه دهب رمادي 2.7	183
بطانيه دهب روز بودره 2.7	184
بطانيه دهب زيتي 2.7	185
بطانيه دهب اسود 2.7	186
بطانيه دهب كحلي 2.7	187
بطانيه نيو لورين درجه ثانيه	188
بطانيه موفادا بيبي ساده	189
بطانيه نيو لافا	190
بطانيه بيج دبل - 4	191
بطانيه بيج - 4	192
بطانيه نيو بيج - 2.5	193
بطانيه نيو البارون - 2.7	194
بطانيه نيو كمفورت دبل - 12	195
بطانيه نيو كمفورت درجه ثانيه - 12	196
بطانيه نيو لورين - 12	197
بطانية بيج 5 ك	198
كمفورت دبل	199
بطانيه لاروما	200
مفرش جاكار ميراج	201
بطانيه نيو سولينا جامبو درجه ثانيه - 5	202
بطانيه بيج بابليز- 5	203
بطانيه مادوفا براندو دبل	204
بطانيه مادوفا نوفا - 6	205
بطانيه بيج - 3	206
دفايه رفال درجه ثانيه	207
دفايه بابلز - 1.7	208
بطانيه نيو روتانا درجه ثانيه - 28	209
بطانيه نيو البارون درجه ثانيه - 20	210
بطانيه نيو كمفورت درجه ثانيه - 18	211
بطانيه نيو البارون - 23	212
بطانيه نيو البارون - 20	213
بطانيه نيو البارون - 22	214
بطانيه بيج درجه ثانيه - 2	215
بطانيه نيو روتانا - 25	216
بطانيه نيو البارون - 24	217
بطانيه نيو روتانا تعبئة - 13	218
بطانيه مادوفا بيرلا - 8	219
بطانيه العراق - 2.5	220
بطانيه العراق درجه تانيه - 2.5	221
بطانيه بيج بدون شنطه - 2.4	222
دفايه كاليدا درجه ثانيه	223
بطانيه نيو بيبي دبل درجه ثانيه	224
بطانيه بيج بدون شنطه - 2.7	225
بطانيه نيو كمفورت دبل بدون شنطه	226
بطانيه نيو كمفورت دبل درجه ثانيه	227
بطانيه نيو لافا درجه ثانيه	228
بطانيه فينيسيا - 12	229
`;

  var products = rawProducts.trim().split("\n").map(function (line) {
    var parts = line.split(/\t+/);
    var name = parts[0].trim();
    var code = Number(parts[1]);
    return {
      id: code,
      ar: name,
      en: name,
      categoryAr: detectCategory(name),
      categoryEn: translateCategory(detectCategory(name))
    };
  });

  var state = {
    query: "",
    category: "all",
    sort: "az",
    columns: 4,
    view: "grid",
    lang: document.documentElement.lang === "en" ? "en" : "ar"
  };

  var list = document.querySelector("[data-products-list]");
  var search = document.querySelector("[data-product-search]");
  var categoryFilter = document.querySelector("[data-product-category]");
  var sort = document.querySelector("[data-product-sort]");
  var columns = document.querySelector("[data-grid-columns]");
  var count = document.querySelector("[data-product-count]");
  var reset = document.querySelector("[data-products-reset]");
  var empty = document.querySelector("[data-products-empty]");
  var viewButtons = Array.prototype.slice.call(document.querySelectorAll("[data-view-mode]"));

  if (!list) {
    return;
  }

  list.classList.add("is-visible");

  function detectCategory(name) {
    if (name.indexOf("دفايه") === 0) return "دفايات";
    if (name.indexOf("مفرش") === 0) return "مفارش";
    if (name.indexOf("حافظه سجاد") === 0) return "حافظات سجاد";
    if (name.indexOf("سجاده") === 0) return "سجاد";
    if (name.indexOf("مخده") === 0 || name.indexOf("خداديه") === 0) return "مخدات وخداديات";
    if (name.indexOf("اتواب") === 0) return "أقمشة";
    if (name.indexOf("باله") === 0) return "بالات";
    return "بطاطين";
  }

  function translateCategory(category) {
    var map = {
      "دفايات": "Warmers",
      "مفارش": "Bedspreads",
      "حافظات سجاد": "Carpet covers",
      "سجاد": "Rugs",
      "مخدات وخداديات": "Pillows and cushions",
      "أقمشة": "Textiles",
      "بالات": "Bales",
      "بطاطين": "Blankets"
    };
    return map[category] || category;
  }

  function normalize(value) {
    return value
      .toString()
      .toLowerCase()
      .replace(/[أإآا]/g, "ا")
      .replace(/[ىي]/g, "ي")
      .replace(/[ة]/g, "ه")
      .replace(/[^\u0600-\u06FFa-z0-9. ]/g, " ");
  }

  function formatCount(total, shown) {
    if (state.lang === "ar") {
      return "عرض " + shown + " من " + total + " منتج";
    }
    return "Showing " + shown + " of " + total + " products";
  }

  function render() {
    var query = normalize(state.query);
    var filtered = products.filter(function (product) {
      var matchesCategory = state.category === "all" || product.categoryAr === state.category;
      var matchesQuery = !query ||
        normalize(product.ar).indexOf(query) !== -1 ||
        normalize(product.en).indexOf(query) !== -1 ||
        normalize(product.categoryAr).indexOf(query) !== -1 ||
        normalize(product.categoryEn).indexOf(query) !== -1;
      return matchesCategory && matchesQuery;
    });

    filtered.sort(function (a, b) {
      var result = a.ar.localeCompare(b.ar, "ar");
      return state.sort === "az" ? result : -result;
    });

    list.classList.toggle("is-list", state.view === "list");
    list.style.setProperty("--product-columns", state.columns);
    list.innerHTML = filtered.map(function (product) {
      return (
        '<article class="product-card">' +
          '<div class="product-image"><img src="assets/images/product-placeholder.svg" alt="' + escapeHtml(product.ar) + '"></div>' +
          '<div class="product-body">' +
            '<h3>' + escapeHtml(product[state.lang]) + '</h3>' +
            '<p>' + escapeHtml(state.lang === "ar" ? product.categoryAr : product.categoryEn) + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");

    if (count) {
      count.textContent = formatCount(products.length, filtered.length);
    }
    if (empty) {
      empty.classList.toggle("is-visible", filtered.length === 0);
    }
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  if (search) {
    search.addEventListener("input", function () {
      state.query = search.value;
      render();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      state.category = categoryFilter.value;
      render();
    });
  }

  if (sort) {
    sort.addEventListener("change", function () {
      state.sort = sort.value;
      render();
    });
  }

  if (columns) {
    columns.addEventListener("change", function () {
      state.columns = Number(columns.value);
      render();
    });
  }

  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      state.view = button.dataset.viewMode;
      viewButtons.forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      render();
    });
  });

  if (reset) {
    reset.addEventListener("click", function () {
      state.query = "";
      state.category = "all";
      state.sort = "az";
      state.columns = 4;
      state.view = "grid";
      if (search) search.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (sort) sort.value = "az";
      if (columns) columns.value = "4";
      viewButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.viewMode === "grid");
      });
      render();
    });
  }

  window.addEventListener("nana:language", function (event) {
    state.lang = event.detail.lang === "en" ? "en" : "ar";
    render();
  });

  render();
})();
