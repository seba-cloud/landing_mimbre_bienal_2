// Endémica Crea × Révélations 2027 — landing de crowdfunding
// Lee window.CAMPAIGN_CONFIG (config/campaign.config.js) y conecta:
// nav mobile, barra de progreso, tabla de presupuesto, links de Mercado
// Pago + tracking, enlaces de video de la trayectoria, compartir y footer.

document.addEventListener('DOMContentLoaded', function () {
  var config = window.CAMPAIGN_CONFIG || {};

  setupNav();
  setupProgress(config);
  setupBudgetTable(config);
  setupMercadoPago(config);
  setupVideoLinks(config);
  setupShare();
  setupFooterLinks(config);
});

function setupNav() {
  var navToggle = document.querySelector('[data-nav-toggle]');
  var siteNav = document.querySelector('[data-site-nav]');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', function () {
    var isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function formatAmount(amount, config) {
  if (amount === null || amount === undefined) return '$[monto]';
  try {
    return new Intl.NumberFormat(config.currencyLocale || 'es-CL', {
      style: 'currency',
      currency: config.currency || 'CLP',
      maximumFractionDigits: 0
    }).format(amount);
  } catch (e) {
    return '$' + amount;
  }
}

function setupProgress(config) {
  var raisedEl = document.getElementById('amount-raised');
  var goalEl = document.getElementById('amount-goal');
  var percentEl = document.getElementById('progress-percent');
  var daysEl = document.getElementById('days-left');
  var fillEl = document.getElementById('progress-fill');
  var barEl = document.getElementById('progress-bar');

  if (raisedEl) raisedEl.textContent = formatAmount(config.raisedAmount, config);
  if (goalEl) goalEl.textContent = formatAmount(config.goalAmount, config);

  var percent = 0;
  if (typeof config.raisedAmount === 'number' && typeof config.goalAmount === 'number' && config.goalAmount > 0) {
    percent = Math.min(100, Math.round((config.raisedAmount / config.goalAmount) * 100));
  }
  if (percentEl) percentEl.textContent = (typeof config.raisedAmount === 'number' && typeof config.goalAmount === 'number') ? percent : '[X]';
  if (fillEl) fillEl.style.width = percent + '%';
  if (barEl) barEl.setAttribute('aria-valuenow', percent);

  if (daysEl && config.deadlineISO) {
    var deadline = new Date(config.deadlineISO);
    var today = new Date();
    var diffMs = deadline.getTime() - today.getTime();
    var diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    daysEl.textContent = diffDays;
  }
}

function setupBudgetTable(config) {
  var body = document.getElementById('budget-table-body');
  var totalEl = document.getElementById('budget-total');
  if (!body || !Array.isArray(config.budget)) return;

  var total = 0;
  var hasNull = false;

  config.budget.forEach(function (row) {
    var tr = document.createElement('tr');
    var tdConcept = document.createElement('td');
    var tdAmount = document.createElement('td');

    tdConcept.textContent = row.concept;
    tdAmount.textContent = formatAmount(row.amount, config);

    if (typeof row.amount === 'number') {
      total += row.amount;
    } else {
      hasNull = true;
    }

    tr.appendChild(tdConcept);
    tr.appendChild(tdAmount);
    body.appendChild(tr);
  });

  if (totalEl) {
    totalEl.textContent = hasNull ? '$[monto]' : formatAmount(total, config);
  }
}

function setupMercadoPago(config) {
  var buttons = document.querySelectorAll('[data-mercadopago]');
  var url = config.mercadoPagoUrl || '#';

  buttons.forEach(function (btn) {
    btn.setAttribute('href', url);
    btn.addEventListener('click', function () {
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
        fbq('trackCustom', 'MecenasClick');
      }
    });
  });
}

function setupVideoLinks(config) {
  var links = document.querySelectorAll('[data-video-link]');
  var videoLinks = config.videoLinks || {};

  links.forEach(function (link) {
    var key = link.getAttribute('data-video-link');
    var url = videoLinks[key];
    if (url) {
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    } else {
      link.setAttribute('aria-disabled', 'true');
      link.textContent = 'Video próximamente';
    }
  });
}

function setupShare() {
  var shareButtons = document.querySelectorAll('[data-share-page]');
  var copyButtons = document.querySelectorAll('[data-copy-link]');

  shareButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var shareData = {
        title: document.title,
        text: 'Ayuda a Endémica Crea a llegar a Révélations 2027 en el Grand Palais de París.',
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
        return;
      }

      copyToClipboard(window.location.href, btn);
    });
  });

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyToClipboard(window.location.href, btn);
    });
  });
}

function copyToClipboard(text, btn) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(function () {
    var original = btn.textContent;
    btn.textContent = 'Link copiado';
    setTimeout(function () {
      btn.textContent = original;
    }, 2000);
  });
}

function setupFooterLinks(config) {
  var email = document.getElementById('footer-email');
  var instagram = document.getElementById('footer-instagram');
  var footerBienal = document.getElementById('footer-bienal');
  var bienalLink = document.getElementById('bienal-link');

  if (email && config.contactEmail) {
    email.textContent = config.contactEmail;
    email.setAttribute('href', 'mailto:' + config.contactEmail);
  }
  if (instagram && config.instagramHandle) {
    instagram.textContent = config.instagramHandle;
    if (config.instagramUrl) instagram.setAttribute('href', config.instagramUrl);
  }
  if (config.bienalUrl) {
    if (footerBienal) footerBienal.setAttribute('href', config.bienalUrl);
    if (bienalLink) bienalLink.setAttribute('href', config.bienalUrl);
  }
}
