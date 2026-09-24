// Every project on the site, in display order.
//
// Featured projects get a section on the home page and a case study at
// /work/<slug>/; "showcase" also puts their screenshot on the home page,
// and "gallery" adds more screenshots to the case study.
// The rest are listed compactly under "Earlier".
//
// Fields are optional unless used by every project (slug, name, kind,
// summary, stack). `detail`, `overview` and note bodies hold hand-written HTML.

export const projects = [
  {
    slug: 'suivedu',
    name: 'SuivEdu',
    featured: true,
    showcase: true,
    kind: 'School attendance',
    platform: 'Web app, installable as a PWA',
    summary:
      'Attendance tracking for schools. Teachers take the register, and parents hear about an absence by SMS or email instead of at the end of the term.',
    detail:
      'One school group can run several schools. Every view that takes a school, class, user or bill id goes through the same small set of permission decorators, so tenant isolation is checked in one place instead of in each view.',
    role: 'Design, backend, frontend, deployment',
    status: { label: 'Live', live: true },
    links: [{ label: 'suivedu.com', href: 'https://www.suivedu.com' }],
    stack: ['Django', 'PostgreSQL', 'Celery', 'Redis', 'Tailwind CSS', 'Alpine.js', 'ReportLab'],
    image: {
      src: '/images/suivedu.webp',
      width: 1600,
      height: 1000,
      alt: 'The SuivEdu dashboard in French: seven class absences today, seven waiting to be notified, and shortcuts to attendance, statistics and weekly PDF reports.',
      caption: 'The school dashboard. Running locally with sample data.',
    },
    gallery: [
      {
        src: '/images/suivedu-week.webp',
        width: 1600,
        height: 1000,
        alt: 'A weekly grid of absences for one class, by day and by morning and afternoon session.',
        caption: 'One class’s week, session by session.',
      },
      {
        src: '/images/suivedu-signin.webp',
        width: 1600,
        height: 1000,
        alt: 'The SuivEdu sign-in page in Arabic, with a French language switch.',
        caption: 'The live sign-in page. The interface is available in Arabic and French.',
      },
    ],
    overview: `
      <p>SuivEdu digitises the attendance register. Teachers mark who is missing, the school sees it the same day, and parents are notified automatically. Around that core sit the things a school actually asks for once it relies on the register: class and student management, custom messages to parents, statistics, printable weekly reports and billing.</p>
      <p>It is built for school groups rather than single schools. A head administrator sees every school in the group; administrators, teachers and students see only their own.</p>
    `,
    notes: [
      {
        title: 'Tenant isolation in one place',
        body: `<p>A school group (<code>MotherSchool</code> in the code) owns several schools. Instead of re-implementing access checks in every view, <code>permissions.py</code> holds a small set of decorators, and any view that takes a <code>school_id</code>, <code>class_id</code>, <code>user_id</code> or <code>bill_id</code> is expected to use one of them.</p>`,
      },
      {
        title: 'Reports off the request path',
        body: `<p>Weekly attendance reports are rendered with ReportLab in a Celery worker, and the page polls an export job for its status. On Heroku the web and worker dynos don’t share a filesystem, so the finished PDF or ZIP is handed back through Redis — already there as the Celery broker — with a 15-minute expiry, rather than making a round trip through S3.</p>`,
      },
      {
        title: 'Reports that point back to the source',
        body: `<p>There are three distinct report templates. Each generated report gets a stable UUID, and the PDF carries a QR code that opens a live web version of the same report.</p>`,
      },
      {
        title: 'Right-to-left in PDFs',
        body: `<p>Reports include Arabic text, which ReportLab doesn’t shape on its own. Text is reshaped and reordered with <code>arabic-reshaper</code> and <code>python-bidi</code> before it is drawn.</p>`,
      },
      {
        title: 'Explicit access to money',
        body: `<p>Billing and reports used to be granted implicitly to certain administrators. That rule was replaced with an explicit per-account permission that a head administrator switches on, so access to financial views is always a deliberate decision.</p>`,
      },
    ],
    stackGroups: [
      ['Backend', 'Python, Django, PostgreSQL'],
      ['Background work', 'Celery, Redis'],
      ['Interface', 'Server-rendered Django templates, Tailwind CSS, Alpine.js'],
      ['Documents', 'ReportLab, qrcode, openpyxl'],
      ['Hosting', 'Heroku (web and worker dynos)'],
    ],
  },

  {
    slug: 'connecfy',
    name: 'Connecfy',
    featured: true,
    kind: 'SMS infrastructure',
    platform: 'Web API, staff console and Android sender app',
    summary:
      'An SMS gateway built on ordinary Android phones. Each phone’s SIM card is a sender; Connecfy is the queue, the routing and the API in front of them.',
    detail:
      'Phones never hold an open connection. They poll for work about every 20 seconds, and a queued message is claimed with <code>SELECT … FOR UPDATE SKIP LOCKED</code>, so two overlapping polls can never send the same SMS twice.',
    role: 'Backend, Android client, documentation',
    status: { label: 'Accounts are set up by hand' },
    links: [{ label: 'Documentation', href: 'https://docs.connecfy.com' }],
    stack: ['Django', 'Django REST Framework', 'PostgreSQL', 'Android'],
    image: {
      src: '/images/connecfy-docs.webp',
      width: 1600,
      height: 1000,
      alt: 'The Connecfy documentation site, showing the introduction page and the path a message takes from the API to a SIM card.',
      caption: 'The public documentation at docs.connecfy.com, a separate static site.',
    },
    overview: `
      <p>Connecfy sends SMS through real SIM cards in Android phones that act as gateways. A client queues a message from the dashboard or through an API key; a phone picks it up, sends it, and reports back.</p>
      <p>There is no self-service signup. Staff create client accounts and pair phones from a separate staff console, and a client either sends through their own paired phones or through a shared pool.</p>
    `,
    flow: {
      caption: 'The life of one message',
      steps: [
        ['POST /api/sms/send/', 'The message is written as a row with status queued.'],
        ['GET /api/devices/<id>/tasks/', 'A phone polls for work, roughly every 20 seconds, and atomically claims the row.'],
        ['SIM → mobile network', 'The phone sends the message through its own SIM card.'],
        ['POST /api/sms/<id>/status/', 'The phone reports sent, delivered or failed.'],
      ],
      note: 'Separately, every phone sends a heartbeat about every 15 seconds with its battery and signal level.',
    },
    notes: [
      {
        title: 'Polling on purpose',
        body: `<p>Nothing in the chain is push-based. Phones ask for work over plain HTTP instead of keeping a socket open, which works on any phone on any network, and means there is no WebSocket server or message broker to run.</p>`,
      },
      {
        title: 'Claiming work atomically',
        body: `<p><code>SMS.claim_for_device()</code> flips a message from <code>queued</code> to <code>sending</code> with <code>SELECT … FOR UPDATE SKIP LOCKED</code> on PostgreSQL. A duplicate poll can’t be handed a row another poll already holds.</p>`,
      },
      {
        title: 'Recovery without a background worker',
        body: `<p>If a phone claims a message and then disappears, the stale claim is noticed the next time any of that account’s phones polls: the message is requeued, or failed once its retries run out. A device is marked offline the same lazy way, whenever its status is read and its last heartbeat is too old.</p>`,
      },
      {
        title: 'A deliberately narrow API',
        body: `<p>The external API can send a message and nothing else. An API key can’t read message history or device details, so a leaked key can’t be used to read anything.</p>`,
      },
      {
        title: 'Staff checks on the server',
        body: `<p>The staff console lives at its own URL, separate from Django’s admin, and every one of its views checks <code>is_staff</code> on the server, not only in the templates that hide the links.</p>`,
      },
    ],
    stackGroups: [
      ['Backend', 'Python, Django, Django REST Framework, PostgreSQL'],
      ['Clients', 'Android sender app; server-rendered dashboard and staff console'],
      ['Security', 'Device tokens, rate limiting, django-axes'],
      ['Languages', 'English and French, with Django i18n'],
      ['Docs', 'Static site at docs.connecfy.com'],
    ],
  },

  {
    slug: 'manostock',
    name: 'ManoStock',
    featured: true,
    showcase: true,
    kind: 'Business software',
    platform: 'Web app, Android app and a local print agent',
    summary:
      'Stock, orders, invoices, expenses and a point-of-sale till for small shops. It grew an Android barcode scanner and a small program that drives a receipt printer.',
    detail:
      'The till is a web page served from Heroku; the receipt printer is a USB device in the shop. A small local agent, listening only on <code>127.0.0.1</code>, bridges the two and speaks ESC/POS to the printer, so receipts print without a dialog.',
    role: 'Design, backend, Android app, print agent',
    image: {
      src: '/images/manostock-till.webp',
      width: 1600,
      height: 1000,
      alt: 'The ManoStock till: an open ticket with four products, a 201.00 DH total, payment method choices and quick cash amounts.',
      caption: 'The till, with an open ticket. Running locally with sample data.',
    },
    gallery: [
      {
        src: '/images/manostock-stock.webp',
        width: 1600,
        height: 1000,
        alt: 'The ManoStock stock page: categories on the left, and products with barcodes, quantities, prices and stock value.',
        caption: 'Stock, with barcodes, prices and stock value per product.',
      },
    ],
    stack: ['Django', 'PostgreSQL', 'Kotlin', 'Jetpack Compose', 'Python'],
    overview: `
      <p>ManoStock started as a web app for the paperwork of a small business: inventory, orders, clients, invoices and expenses. Later it gained a proper point-of-sale till, and the till needed two things a browser can’t do well on its own — scan barcodes quickly and print receipts silently.</p>
      <p>Those became two small companion programs, each doing one job while the Django server stays the source of truth.</p>
    `,
    flow: {
      caption: 'Pieces and how they talk',
      steps: [
        ['Web till', 'Polls the current ticket every 5 seconds over plain HTTP. No WebSockets.'],
        ['Android scanner', 'Pairs by scanning a QR code on the till, then posts each barcode it reads.'],
        ['Django server', 'Decides whether a scan fills a pending product form or lands on the open ticket.'],
        ['Print agent', 'Receives one JSON message per receipt on 127.0.0.1 and prints it over ESC/POS.'],
      ],
    },
    notes: [
      {
        title: 'A phone as a scanner',
        body: `<p>The Android app is written in Kotlin with Jetpack Compose. It scans on-device with CameraX and ML Kit (EAN‑13, EAN‑8, UPC, Code 128, Code 39), talks to the server with Retrofit, and keeps its session token in <code>EncryptedSharedPreferences</code> backed by the Android Keystore.</p>`,
      },
      {
        title: 'No typing the server address',
        body: `<p>The pairing QR code on the till encodes a full URL. The app extracts both the server origin and a one-time token from it, so pairing a phone never involves typing a hostname.</p>`,
      },
      {
        title: 'Scans that can be retried',
        body: `<p>Every scan carries a client-generated UUID. On a flaky shop Wi-Fi connection the app can retry a request freely: the server recognises the id, and the product is never added to the ticket twice.</p>`,
      },
      {
        title: 'Printing from the cloud to a USB port',
        body: `<p>A server on Heroku can’t reach a printer on a shop’s local network. The print agent runs on the till’s computer, listens only on <code>127.0.0.1</code> so nothing else on the network can reach it, and translates each receipt into ESC/POS commands. Plain browser printing remains available for shops that don’t want to install anything.</p>`,
      },
    ],
    stackGroups: [
      ['Backend', 'Python, Django, PostgreSQL'],
      ['Android', 'Kotlin, Jetpack Compose, CameraX, ML Kit, Retrofit, OkHttp'],
      ['Print agent', 'Python, ESC/POS'],
      ['Hosting', 'Heroku'],
    ],
  },

  {
    slug: 'lifeos',
    name: 'LifeOS',
    featured: true,
    showcase: true,
    kind: 'Desktop app',
    platform: 'macOS and Windows, with an Android companion',
    summary:
      'A local-first desktop app for tasks, study, projects, money, people and notes. There is no account and no cloud: the database lives on your own computer.',
    detail:
      'The study timer is an event-replay engine of about 30 lines of Python, mirrored by hand in Kotlin for the Android app. Both sides have matching test suites, so “the two agree” is checked rather than assumed.',
    role: 'Design, backend, desktop wrapper, Android app',
    image: {
      src: '/images/lifeos.webp',
      width: 1600,
      height: 1000,
      alt: 'The LifeOS home screen: next tasks with projects and due dates, today’s events, and the sidebar of modules.',
      caption: 'Home: what’s next and what’s on today. Demo data from the app’s own fixture command.',
    },
    gallery: [
      {
        src: '/images/lifeos-finance.webp',
        width: 1600,
        height: 1000,
        alt: 'The LifeOS finance screen: totals across personal and business accounts, this month’s income and expenses, and recent activity.',
        caption: 'Finance, with personal and business accounts kept apart. Fictional figures.',
      },
    ],
    status: { label: 'Beta · v0.1.0-beta.1' },
    stack: ['Django', 'SQLite', 'Swift', 'Kotlin', 'Jetpack Compose'],
    overview: `
      <p>LifeOS brings together things that otherwise live across a dozen apps: tasks, a focus timer, projects, personal and business finance, people, notes, school, a journal, writing, a calendar and goals. You choose which areas you want during setup.</p>
      <p>It ships as a normal desktop application for macOS and Windows. Each installation creates its own private database on first launch, and nothing is sent anywhere.</p>
    `,
    flow: {
      caption: 'Three components, one source of truth',
      steps: [
        ['backend/', 'Django, Django REST Framework and SQLite. Owns all business logic and serves both the desktop UI and a REST API.'],
        ['desktop/', 'A small Swift/AppKit wrapper. Starts the backend, waits for its health check, and shows it in a native window through WKWebView.'],
        ['android/', 'Kotlin and Jetpack Compose with its own Room database. Works offline and syncs over the local network when it can reach the Mac.'],
      ],
    },
    notes: [
      {
        title: 'The same logic behind two doors',
        body: `<p>Desktop views call domain services directly; the REST API calls the same services through DRF viewsets. Finance math and the study timer exist once on the server, not once per client.</p>`,
      },
      {
        title: 'Models built for sync',
        body: `<p>Every domain model inherits one base model: a UUID primary key, timestamps, an incrementing <code>version</code> used to detect sync conflicts, and soft deletion so a phone that was offline can still learn that something was removed.</p>`,
      },
      {
        title: 'Backups before migrations',
        body: `<p>Backups can be created and restored from the settings screen, and restoring takes a safety backup of the current state first. An update that changes the database structure backs up automatically before it runs.</p>`,
      },
      {
        title: 'Honest about its limits',
        body: `<p>The beta builds aren’t code-signed yet, desktop installs don’t sync with each other, and there is no auto-update. The README says so plainly instead of hiding it.</p>`,
      },
    ],
    stackGroups: [
      ['Backend', 'Python, Django, Django REST Framework, SQLite, Waitress, WhiteNoise'],
      ['Desktop', 'Swift, AppKit, WKWebView; Windows installer built in CI'],
      ['Android', 'Kotlin, Jetpack Compose, Room'],
    ],
  },

  {
    slug: 'manyo',
    name: 'MANYO',
    kind: 'Social platform',
    summary: 'My first project: a social platform with posts, a video feed and a marketplace.',
    stack: ['Django'],
  },
  {
    slug: 'lterrazi',
    name: 'LTErrazi',
    kind: 'School platform',
    summary: 'A platform for my high school, with internal messaging, announcements, student accounts and a staff back office.',
    stack: ['Django'],
  },
  {
    slug: 'legal-documents',
    name: 'Legal document generator',
    kind: 'Web app',
    summary: 'Drafts legal documents from a short form, using a large language model.',
    stack: ['Django', 'OpenAI API'],
  },
];

export const featured = projects.filter((p) => p.featured);
export const earlier = projects.filter((p) => !p.featured);
