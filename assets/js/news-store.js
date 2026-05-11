(function () {
  "use strict";

  var NEWS_KEY = "nana-secret-news-posts";
  var AUTH_KEY = "nana-secret-admin-auth";
  var DEFAULT_IMAGE = "assets/images/news-chairman.svg";
  var ADMIN_USER = "ADMIN";
  var ADMIN_PASS = "123";

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizePost(input, existing) {
    var now = new Date().toISOString();
    var source = input || {};
    var current = existing || {};

    return {
      id: current.id || source.id || "custom-news-" + Date.now(),
      createdAt: current.createdAt || source.createdAt || now,
      updatedAt: now,
      titleAr: String(source.titleAr || "").trim(),
      titleEn: String(source.titleEn || source.titleAr || "").trim(),
      authorAr: String(source.authorAr || "من الإدارة").trim(),
      authorEn: String(source.authorEn || "From Management").trim(),
      dateAr: String(source.dateAr || "").trim(),
      dateEn: String(source.dateEn || source.dateAr || "").trim(),
      excerptAr: String(source.excerptAr || "").trim(),
      excerptEn: String(source.excerptEn || source.excerptAr || "").trim(),
      bodyAr: String(source.bodyAr || "").trim(),
      bodyEn: String(source.bodyEn || source.bodyAr || "").trim(),
      imageUrl: String(source.imageUrl || DEFAULT_IMAGE).trim(),
      videoUrl: String(source.videoUrl || "").trim()
    };
  }

  function getPosts() {
    var posts = safeParse(localStorage.getItem(NEWS_KEY), []);
    if (!Array.isArray(posts)) {
      return [];
    }

    return posts
      .filter(function (post) {
        return post && post.id && post.titleAr;
      })
      .sort(function (a, b) {
        return String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || ""));
      });
  }

  function savePosts(posts) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(posts || []));
    window.dispatchEvent(new CustomEvent("nana:news-updated"));
  }

  function findPost(id) {
    return getPosts().filter(function (post) {
      return post.id === id;
    })[0] || null;
  }

  function upsertPost(input) {
    var posts = getPosts();
    var index = posts.findIndex(function (post) {
      return post.id === input.id;
    });
    var normalized = normalizePost(input, index >= 0 ? posts[index] : null);

    if (index >= 0) {
      posts[index] = normalized;
    } else {
      posts.unshift(normalized);
    }

    savePosts(posts);
    return normalized;
  }

  function removePost(id) {
    savePosts(getPosts().filter(function (post) {
      return post.id !== id;
    }));
  }

  function splitParagraphs(value) {
    return String(value || "")
      .split(/\n+/)
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean);
  }

  function metaText(post, lang) {
    var author = lang === "en" ? post.authorEn : post.authorAr;
    var date = lang === "en" ? post.dateEn : post.dateAr;
    return [author, date].filter(Boolean).join(" / ");
  }

  function bodyMarkup(post) {
    var arParts = splitParagraphs(post.bodyAr);
    var enParts = splitParagraphs(post.bodyEn || post.bodyAr);
    var length = Math.max(arParts.length, enParts.length);
    var html = "";
    var index;

    for (index = 0; index < length; index += 1) {
      html += '<p data-ar="' + escapeHtml(arParts[index] || enParts[index] || "") + '" data-en="' + escapeHtml(enParts[index] || arParts[index] || "") + '">' +
        escapeHtml(arParts[index] || enParts[index] || "") +
        "</p>";
    }

    return html;
  }

  function facebookEmbedUrl(url) {
    if (!/facebook\.com/i.test(url || "")) {
      return "";
    }

    return "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(url) + "&show_text=false&width=734";
  }

  function articleMarkup(post) {
    var id = escapeHtml(post.id);
    var video = "";
    var videoUrl = post.videoUrl ? escapeHtml(post.videoUrl) : "";
    var embedUrl = facebookEmbedUrl(post.videoUrl);
    var videoButton = "";

    if (embedUrl) {
      video = '<div class="news-video"><iframe title="' + escapeHtml(post.titleEn || post.titleAr) + '" src="' + escapeHtml(embedUrl) + '" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>';
    }

    if (videoUrl) {
      videoButton = '<a class="button secondary" href="' + videoUrl + '" target="_blank" rel="noopener" data-ar="فتح رابط الفيديو" data-en="Open video link">فتح رابط الفيديو</a>';
    }

    return '' +
      '<article class="article-card news-article reveal" id="' + id + '" data-custom-news>' +
        '<div class="article-cover">' +
          '<img src="' + escapeHtml(post.imageUrl || DEFAULT_IMAGE) + '" alt="' + escapeHtml(post.titleEn || post.titleAr) + '" loading="lazy">' +
        "</div>" +
        '<p class="meta" data-ar="' + escapeHtml(metaText(post, "ar")) + '" data-en="' + escapeHtml(metaText(post, "en")) + '">' + escapeHtml(metaText(post, "ar")) + "</p>" +
        '<h2 data-ar="' + escapeHtml(post.titleAr) + '" data-en="' + escapeHtml(post.titleEn || post.titleAr) + '">' + escapeHtml(post.titleAr) + "</h2>" +
        '<p data-ar="' + escapeHtml(post.excerptAr) + '" data-en="' + escapeHtml(post.excerptEn || post.excerptAr) + '">' + escapeHtml(post.excerptAr) + "</p>" +
        video +
        '<div class="news-actions">' +
          videoButton +
          '<button class="expand-button" type="button" aria-expanded="false" data-expand-button data-open-ar="قراءة التفاصيل" data-close-ar="إخفاء التفاصيل" data-open-en="Read details" data-close-en="Hide details">قراءة التفاصيل</button>' +
        "</div>" +
        '<div class="news-detail" data-expand-panel>' + bodyMarkup(post) + "</div>" +
      "</article>";
  }

  function latestCardMarkup(post) {
    return '' +
      '<article class="latest-news-card reveal" data-custom-latest-news>' +
        '<img src="' + escapeHtml(post.imageUrl || DEFAULT_IMAGE) + '" alt="' + escapeHtml(post.titleEn || post.titleAr) + '" loading="lazy">' +
        "<div>" +
          '<p class="meta" data-ar="' + escapeHtml(metaText(post, "ar")) + '" data-en="' + escapeHtml(metaText(post, "en")) + '">' + escapeHtml(metaText(post, "ar")) + "</p>" +
          '<h3 data-ar="' + escapeHtml(post.titleAr) + '" data-en="' + escapeHtml(post.titleEn || post.titleAr) + '">' + escapeHtml(post.titleAr) + "</h3>" +
          '<p data-ar="' + escapeHtml(post.excerptAr) + '" data-en="' + escapeHtml(post.excerptEn || post.excerptAr) + '">' + escapeHtml(post.excerptAr) + "</p>" +
          '<a class="text-link" href="news.html#' + escapeHtml(post.id) + '" data-ar="قراءة الخبر" data-en="Read story">قراءة الخبر</a>' +
        "</div>" +
      "</article>";
  }

  function renderNewsPage() {
    var list = document.querySelector("[data-news-list]");
    var aside = document.querySelector("[data-news-aside]");
    var posts = getPosts();

    if (list) {
      Array.prototype.slice.call(list.querySelectorAll("[data-custom-news]")).forEach(function (item) {
        item.remove();
      });

      if (posts.length) {
        list.insertAdjacentHTML("afterbegin", posts.map(articleMarkup).join(""));
      }
    }

    if (aside) {
      Array.prototype.slice.call(aside.querySelectorAll("[data-custom-news-link]")).forEach(function (item) {
        item.remove();
      });

      if (posts.length) {
        aside.insertAdjacentHTML("afterbegin", posts.slice(0, 5).map(function (post) {
          return '<a href="#' + escapeHtml(post.id) + '" data-custom-news-link data-ar="' + escapeHtml(post.titleAr) + '" data-en="' + escapeHtml(post.titleEn || post.titleAr) + '">' + escapeHtml(post.titleAr) + "</a>";
        }).join(""));
      }
    }
  }

  function renderLatestNews() {
    var grid = document.querySelector("[data-latest-news-list]");
    var posts = getPosts().slice(0, 3);

    if (!grid) {
      return;
    }

    Array.prototype.slice.call(grid.querySelectorAll("[data-custom-latest-news]")).forEach(function (item) {
      item.remove();
    });

    if (posts.length) {
      grid.insertAdjacentHTML("afterbegin", posts.map(latestCardMarkup).join(""));
    }
  }

  function replacePosts(rawPosts) {
    var posts = Array.isArray(rawPosts) ? rawPosts.map(function (post) {
      return normalizePost(post, post);
    }) : [];
    savePosts(posts);
  }

  window.NanaNews = {
    adminPass: ADMIN_PASS,
    adminUser: ADMIN_USER,
    authKey: AUTH_KEY,
    defaultImage: DEFAULT_IMAGE,
    findPost: findPost,
    getPosts: getPosts,
    removePost: removePost,
    replacePosts: replacePosts,
    savePosts: savePosts,
    upsertPost: upsertPost,
    renderLatestNews: renderLatestNews,
    renderNewsPage: renderNewsPage
  };

  renderNewsPage();
  renderLatestNews();

  window.addEventListener("storage", function (event) {
    if (event.key === NEWS_KEY) {
      renderNewsPage();
      renderLatestNews();
    }
  });

  window.addEventListener("nana:news-updated", function () {
    renderNewsPage();
    renderLatestNews();
  });
})();
