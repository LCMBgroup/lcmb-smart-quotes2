const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function lines(value) {
  return String(value || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseLineItems(value) {
  return lines(value).map((line) => {
    const parts = line.split('|').map((x) => x.trim());
    return { name: parts[0] || '', amount: parts.slice(1).join(' | ') || '' };
  });
}

function parseFaqs(value) {
  return lines(value).map((line) => {
    const parts = line.split('|').map((x) => x.trim());
    return { q: parts[0] || '', a: parts.slice(1).join(' | ') || '' };
  });
}

function slugify(value) {
  const clean = String(value || 'quote')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean || 'quote';
}

function getData() {
  const email = $('email').value || $('questionEmail').value || '';
  return {
    businessName: $('businessName').value || 'LCMB Group',
    phone: $('phone').value,
    email,
    website: $('website').value,
    logoUrl: $('logoUrl').value,
    videoUrl: $('videoUrl').value,
    quoteNumber: $('quoteNumber').value,
    quoteDate: $('quoteDate').value,
    validUntil: $('validUntil').value,
    clientName: $('clientName').value,
    jobAddress: $('jobAddress').value,
    jobTitle: $('jobTitle').value || 'Your LCMB Group proposal',
    intro: $('intro').value,
    summary: $('summary').value,
    included: lines($('included').value),
    excluded: lines($('excluded').value),
    lineItems: parseLineItems($('lineItems').value),
    subtotal: $('subtotal').value,
    gst: $('gst').value,
    total: $('total').value,
    paymentTerms: $('paymentTerms').value,
    whyUs: lines($('whyUs').value),
    process: lines($('process').value),
    guarantee: $('guarantee').value,
    reviews: lines($('reviews').value),
    faqs: parseFaqs($('faqs').value),
    acceptUrl: $('acceptUrl').value,
    questionEmail: $('questionEmail').value || email
  };
}

function list(items, className = '') {
  if (!items.length) return '';
  return `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function renderQuoteHTML(data) {
  const logo = data.logoUrl
    ? `<img src="${esc(data.logoUrl)}" alt="${esc(data.businessName)} logo" class="logo-img">`
    : `<div class="logo-text">${esc(data.businessName)}</div>`;

  const video = data.videoUrl
    ? `<section class="section video-card"><div><p class="kicker">Meet the team</p><h2>A quick introduction to ${esc(data.businessName)}</h2><p>Watch this short video to learn more about who will be looking after your job.</p></div><div class="video-wrap"><iframe src="${esc(data.videoUrl)}" title="${esc(data.businessName)} video" allowfullscreen></iframe></div></section>`
    : '';

  const lineRows = data.lineItems.length
    ? data.lineItems.map((item) => `<tr><td>${esc(item.name)}</td><td>${esc(item.amount)}</td></tr>`).join('')
    : `<tr><td>Quoted works as per ServiceM8 quote</td><td>${esc(data.total)}</td></tr>`;

  const reviews = data.reviews.length
    ? `<div class="review-grid">${data.reviews.map((r) => `<blockquote>${esc(r)}</blockquote>`).join('')}</div>`
    : '';

  const faqs = data.faqs.length
    ? `<div class="faq-list">${data.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`
    : '';

  const acceptButton = data.acceptUrl
    ? `<a class="btn primary" href="${esc(data.acceptUrl)}" target="_blank" rel="noopener">Accept via ServiceM8</a>`
    : `<a class="btn primary" href="#next-steps">How to accept</a>`;
  const phoneButton = data.phone ? `<a class="btn" href="tel:${esc(data.phone.replace(/\s+/g, ''))}">Call us</a>` : '';
  const emailButton = data.questionEmail ? `<a class="btn" href="mailto:${esc(data.questionEmail)}?subject=Question about quote ${encodeURIComponent(data.quoteNumber || '')}">Ask a question</a>` : '';

  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${esc(data.businessName)} Quote ${esc(data.quoteNumber)}</title>
  <style>
    :root{--brand:#0f2f45;--brand2:#164b69;--accent:#f2a23a;--ink:#17222b;--muted:#657481;--line:#e7edf2;--bg:#f6f8fb;--card:#fff;--ok:#0d6b4f;--shadow:0 24px 60px rgba(15,47,69,.12);--radius:24px}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.55}a{color:inherit}.wrap{max-width:1120px;margin:0 auto;padding:0 22px}.top{background:#fff;border-bottom:1px solid var(--line)}.nav{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:18px}.logo-text{font-weight:900;color:var(--brand);font-size:1.25rem}.logo-img{max-height:46px;max-width:220px}.quote-pill{background:#edf6fb;color:var(--brand);padding:8px 12px;border-radius:999px;font-weight:800;font-size:.9rem}.hero{padding:62px 0 34px;background:linear-gradient(135deg,#fff 0%,#f3f8fb 55%,#fff7ec 100%)}.hero-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:26px;align-items:center}.kicker{text-transform:uppercase;letter-spacing:.14em;font-size:.78rem;color:var(--accent);font-weight:900;margin:0 0 10px}h1{font-size:clamp(2.1rem,5vw,4.8rem);line-height:.98;margin:0 0 18px;color:var(--brand);letter-spacing:-.05em}h2{font-size:clamp(1.5rem,3vw,2.15rem);line-height:1.08;color:var(--brand);margin:0 0 12px}h3{color:var(--brand);margin:0 0 8px}.lead{font-size:1.15rem;color:var(--muted);margin:0 0 24px}.btns{display:flex;gap:10px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--brand);border-radius:999px;padding:13px 18px;font-weight:850;text-decoration:none;color:var(--brand);background:#fff}.btn.primary{background:var(--brand);color:#fff}.detail-card,.section{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:26px}.detail-list{display:grid;gap:12px}.detail-list div{display:flex;justify-content:space-between;gap:18px;border-bottom:1px solid var(--line);padding-bottom:10px}.detail-list div:last-child{border-bottom:0;padding-bottom:0}.label{color:var(--muted);font-weight:700}.value{font-weight:850;text-align:right}.sections{padding:28px 0 70px;display:grid;gap:20px}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}.checklist{list-style:none;margin:16px 0 0;padding:0}.checklist li{position:relative;padding:12px 12px 12px 42px;background:#f8fbfd;border:1px solid var(--line);border-radius:16px;margin:10px 0}.checklist li:before{content:"✓";position:absolute;left:14px;top:10px;width:22px;height:22px;border-radius:50%;background:#e8f6f1;color:var(--ok);font-weight:900;text-align:center;line-height:22px}.excluded li:before{content:"i";background:#fff7ed;color:#9f3412}.price-table{width:100%;border-collapse:collapse;margin-top:16px;overflow:hidden;border-radius:18px}.price-table th,.price-table td{padding:15px;border-bottom:1px solid var(--line);text-align:left}.price-table th{background:#f8fbfd;color:var(--brand)}.price-table td:last-child,.price-table th:last-child{text-align:right;font-weight:850}.totals{margin-top:16px;display:grid;justify-content:end;gap:8px}.totals div{display:grid;grid-template-columns:160px 160px;gap:16px}.grand{font-size:1.4rem;color:var(--brand);font-weight:950;border-top:2px solid var(--brand);padding-top:10px}.video-card{display:grid;grid-template-columns:.8fr 1.2fr;gap:22px;align-items:center}.video-wrap{position:relative;aspect-ratio:16/9;background:#dbe6ee;border-radius:18px;overflow:hidden}.video-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}blockquote{margin:0;background:#f8fbfd;border:1px solid var(--line);border-radius:18px;padding:18px;color:#334155}.process{counter-reset:step;list-style:none;padding:0;margin:14px 0 0;display:grid;gap:12px}.process li{counter-increment:step;background:#f8fbfd;border:1px solid var(--line);border-radius:18px;padding:16px 16px 16px 58px;position:relative;font-weight:750}.process li:before{content:counter(step);position:absolute;left:16px;top:14px;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;font-weight:950;text-align:center;line-height:28px}.faq-list{display:grid;gap:10px;margin-top:14px}details{background:#f8fbfd;border:1px solid var(--line);border-radius:16px;padding:14px}summary{cursor:pointer;font-weight:850;color:var(--brand)}.final{background:var(--brand);color:#fff}.final h2,.final .kicker{color:#fff}.final p{color:#e6eef3}.footer{padding:26px 0;color:var(--muted);font-size:.9rem}.notice{background:#fff7ed;border:1px solid #fed7aa;color:#9f3412;border-radius:18px;padding:14px;font-weight:750}@media(max-width:850px){.hero-grid,.two-col,.video-card{grid-template-columns:1fr}.review-grid{grid-template-columns:1fr}.detail-list div{display:block}.value{text-align:left}.totals{justify-content:stretch}.totals div{grid-template-columns:1fr 1fr}h1{letter-spacing:-.035em}}
  </style>
</head>
<body>
  <header class="top">
    <div class="wrap nav">
      <div>${logo}</div>
      <div class="quote-pill">Quote ${esc(data.quoteNumber)}</div>
    </div>
  </header>

  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <p class="kicker">Prepared for ${esc(data.clientName)}</p>
        <h1>${esc(data.jobTitle)}</h1>
        <p class="lead">${esc(data.intro)}</p>
        <div class="btns">${acceptButton}${phoneButton}${emailButton}</div>
      </div>
      <aside class="detail-card">
        <h3>Quote details</h3>
        <div class="detail-list">
          <div><span class="label">Client</span><span class="value">${esc(data.clientName)}</span></div>
          <div><span class="label">Job address</span><span class="value">${esc(data.jobAddress)}</span></div>
          <div><span class="label">Quote number</span><span class="value">${esc(data.quoteNumber)}</span></div>
          <div><span class="label">Quote date</span><span class="value">${esc(data.quoteDate)}</span></div>
          <div><span class="label">Valid until</span><span class="value">${esc(data.validUntil)}</span></div>
        </div>
      </aside>
    </div>
  </section>

  <main class="wrap sections">
    <section class="section">
      <p class="kicker">Recommended scope</p>
      <h2>What we propose</h2>
      <p>${esc(data.summary)}</p>
    </section>

    <section class="two-col">
      <div class="section">
        <p class="kicker">Included</p>
        <h2>What's included</h2>
        ${list(data.included, 'checklist')}
      </div>
      <div class="section">
        <p class="kicker">Assumptions</p>
        <h2>Exclusions and assumptions</h2>
        ${list(data.excluded, 'checklist excluded')}
      </div>
    </section>

    <section class="section">
      <p class="kicker">Investment</p>
      <h2>Itemised pricing</h2>
      <table class="price-table">
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>${lineRows}</tbody>
      </table>
      <div class="totals">
        <div><span>Subtotal</span><strong>${esc(data.subtotal)}</strong></div>
        <div><span>GST</span><strong>${esc(data.gst)}</strong></div>
        <div class="grand"><span>Total</span><strong>${esc(data.total)}</strong></div>
      </div>
      <h3 style="margin-top:22px">Payment terms</h3>
      <p>${esc(data.paymentTerms)}</p>
    </section>

    ${video}

    <section class="two-col">
      <div class="section">
        <p class="kicker">Why choose us</p>
        <h2>Why ${esc(data.businessName)}</h2>
        ${list(data.whyUs, 'checklist')}
      </div>
      <div class="section" id="next-steps">
        <p class="kicker">Simple process</p>
        <h2>What happens next</h2>
        <ol class="process">${data.process.map((item) => `<li>${esc(item)}</li>`).join('')}</ol>
      </div>
    </section>

    <section class="section">
      <p class="kicker">Quality</p>
      <h2>Workmanship and care</h2>
      <p>${esc(data.guarantee)}</p>
    </section>

    ${reviews ? `<section class="section"><p class="kicker">Customer feedback</p><h2>What customers say</h2>${reviews}</section>` : ''}

    ${faqs ? `<section class="section"><p class="kicker">Questions</p><h2>Frequently asked questions</h2>${faqs}</section>` : ''}

    <section class="section final">
      <p class="kicker">Ready to proceed?</p>
      <h2>Approve through ServiceM8 or contact us with any questions.</h2>
      <p>To formally approve the quote, use the ServiceM8 acceptance link sent with your quote message. If anything is unclear, call or email us and we will talk you through the scope.</p>
      <div class="btns">${acceptButton}${phoneButton}${emailButton}</div>
    </section>

    <div class="notice">This page is a customer-friendly summary of the quote. The formal quote, approval record and job conversion remain inside ServiceM8.</div>
  </main>

  <footer class="footer">
    <div class="wrap">
      <strong>${esc(data.businessName)}</strong>${data.phone ? ` | ${esc(data.phone)}` : ''}${data.email ? ` | ${esc(data.email)}` : ''}${data.website ? ` | ${esc(data.website)}` : ''}
    </div>
  </footer>
</body>
</html>`;
}

function previewQuote() {
  const data = getData();
  const html = renderQuoteHTML(data);
  const frame = $('previewFrame');
  frame.srcdoc = html;
}

function downloadQuote() {
  const data = getData();
  if (!data.quoteNumber || !data.clientName) {
    alert('Please add at least a quote number and client name.');
    return;
  }
  const html = renderQuoteHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slugify(data.quoteNumber)}-${slugify(data.clientName)}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function createServiceM8Message() {
  const data = getData();
  const firstName = (data.clientName || 'there').split(' ')[0];
  const msg = `Hi ${firstName},\n\nThanks for giving ${data.businessName} the opportunity to quote for the works${data.jobAddress ? ` at ${data.jobAddress}` : ''}.\n\nYour online proposal is ready here:\nPASTE_GITHUB_QUOTE_PAGE_LINK_HERE\n\nTo formally approve the quote, please use the ServiceM8 acceptance link included in this message: {document}\n\nIf you have any questions, reply to this message or call us.\n\nKind regards,\n${data.businessName}`;
  $('emailOutput').textContent = msg;
  navigator.clipboard?.writeText(msg).catch(() => {});
}

$('previewBtn').addEventListener('click', previewQuote);
$('downloadBtn').addEventListener('click', downloadQuote);
$('emailBtn').addEventListener('click', createServiceM8Message);

window.addEventListener('load', () => {
  const today = new Date();
  $('quoteDate').value ||= today.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
});
