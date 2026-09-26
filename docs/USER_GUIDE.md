# User guide

How to use Treasure Pharmacy, organised by who you are:

1. [Clients (site visitors)](#1-clients-site-visitors): booking a service, contacting the pharmacy
2. [Staff (back office)](#2-staff-back-office): working the booking queue, updating prices and stock
3. [Administrators](#3-administrators): everything staff can do, plus site content, branches, services and user accounts
4. [Pharmacy inbox](#4-pharmacy-inbox): what arrives by email for each booking
5. [Troubleshooting](#5-troubleshooting)

For how the system works internally, see [HOW_IT_WORKS.md](HOW_IT_WORKS.md).

**Addresses used below (local development):**

| What | Address |
| --- | --- |
| Public site | <http://localhost:5173> |
| Back office | <http://localhost:8000/back-office/> (in production, whatever `ADMIN_URL` is set to) |
| Test email inbox | <http://localhost:8025> (MailHog; local only) |

---

## 1. Clients (site visitors)

Clients don't need an account. Everything on the public site is open to everyone.

### Browse services and prices

1. Open **Services** in the top menu. Services are grouped into Lab Tests,
   Consultations, Home Care and Bedside Nursing, each with its price in Ugandan Shillings.
2. Click **Details** on a card to read the full description and what to expect.

### Book a service

1. Click any **Book now** button (top menu, service card or service page). From a
   service card or page, that service is already selected.
2. Fill in:
   - **Full name**, **phone number** (e.g. `+256 700 123 456`) and **email address**.
   - **Service**: the price is shown next to each option and in the summary box.
   - **Where should we see you?**: pick a branch, or **Home visit — we come to you**.
     Home Care and Bedside Nursing services choose *Home visit* automatically. For a
     home visit, enter your **home address**.
   - **Preferred date** and **preferred time**. Past dates can't be selected.
   - **Notes** (optional): symptoms, medication, directions to your home, and so on.
3. Click **Confirm booking**.
4. You'll see **Booking received!** with a reference like `TRP-7KQ3MX`. **Write it
   down.** It's also in the confirmation email sent to you.
5. The pharmacy team calls you to confirm the appointment. Booking is free; you pay at
   the branch or when the visit is complete.

If something is wrong with a field, a red message appears under it. Fix it and submit
again.

### Find a branch

Open **Branches** for a map of each branch, its address and a phone number you can tap
to call. The footer on every page also lists the branches.

### Contact the pharmacy

- **WhatsApp**: the green button in the bottom-right corner of every page opens a chat
  with a pharmacist. It's also on the Home and Contact pages.
- **Phone and email**: on the **Contact** page.

### Change or cancel a booking

There's no online change or cancel option. Reply to your confirmation email, message on
WhatsApp, or call, and quote your booking reference.

---

## 2. Staff (back office)

Staff use the **back office** to manage bookings and day-to-day stock and pricing. The
back office isn't linked from the public site. Bookmark its address.

### Log in

1. Open the back office address.
2. Enter the username and password an administrator gave you.
3. The sidebar lists only the sections you have permission to use.

If you can't log in, or a section you need is missing, ask an administrator (see
[3.5](#35-manage-staff-accounts)).

### Understand booking statuses

| Status | Meaning |
| --- | --- |
| **Pending** | New booking from the website. Nobody has contacted the client yet |
| **Confirmed** | You've called the client and agreed the appointment |
| **Completed** | The service has been delivered |
| **Cancelled** | The client cancelled, or the booking can't go ahead |

Changing a status **doesn't** notify the client. Always call them first.

### Work the booking queue (daily routine)

1. Open **Bookings**. Newest bookings appear first.
2. In the filter panel, set **Status = Pending** to see bookings that need a call.
3. Click a reference (e.g. `TRP-7KQ3MX`) to open it. You'll see the client's details,
   service, branch or home address, preferred date and time, and notes.
   - **PDF file** links to the intake form generated for that booking.
4. Call the client on the phone number shown and agree the appointment.
5. Update the status:
   - **One booking**: change **Status** on the detail page and click **Save**.
   - **Several at once**: tick them in the list, choose **Mark selected as confirmed**
     (or *completed* / *cancelled*) from the actions menu, and run it.
6. If the agreed date or time differs from what the client requested, edit
   **Preferred date** / **Preferred time** and save, so the record matches reality.

### Find a booking

- Use the **search box** with a reference, client name, email or phone number. This is
  the fastest way when a client calls and quotes their reference.
- Use **filters** for status, service category, branch or preferred date. For example,
  *Preferred date = Today* plus *Branch = Ntinda Branch* gives today's list for one
  branch.
- Use the **date bar** above the list to drill into bookings by the date they were
  made.

### Update prices and stock

1. Open **Products** (pharmacy stock) or **Services** (bookable services).
2. Edit **Price** and, for products, **Stock qty**, directly in the list.
3. Click **Save** at the bottom of the list. Changes to several rows save together.

Prices are whole Ugandan Shillings (no decimals). Updated service prices appear on the
website straight away for new visitors. Anyone who already has the site open sees them
within about five minutes, or immediately on a page refresh.

### Take a service or product off sale

Untick **Active** in the list and **Save**. The item disappears from the website and
can't be booked. Tick it again to bring it back. Don't delete services that have ever
been booked; the system won't allow it, and deactivating keeps the booking history
intact.

### Things staff should not do

- **Don't create bookings in the back office** for phone or walk-in clients unless you
  just need a record. Bookings added here get a reference but no PDF, and no emails go out. Where
  possible, fill in the public booking form on the client's behalf instead, so the full
  process runs.
- **Don't delete bookings.** Mark them *Cancelled* so the history is kept.

---

## 3. Administrators

Administrators (superusers) can do everything staff can, plus the tasks below.

### 3.1 Edit website text

Site headings, the announcement bar and the WhatsApp number are **content blocks**.

1. Open **Content blocks** and click the one to change:

   | Label | Where it appears |
   | --- | --- |
   | Homepage hero heading | Big headline at the top of the home page |
   | Homepage hero subheading | Paragraph under the headline |
   | Homepage announcement bar | Dark strip above the home page hero |
   | About page intro | First paragraph of the About page |
   | WhatsApp number | Every WhatsApp button and link on the site |

2. Change **Text** and click **Save**.

Rules:

- **WhatsApp number**: digits only, international format, no `+` or spaces, e.g.
  `256700123000`. Anything else produces broken WhatsApp links.
- **Hiding the announcement bar**: empty its text and save. (In local development it
  comes back after a restart, because the demo seed refills empty blocks. Production
  isn't affected.)
- **Don't create or delete content blocks.** The website only reads the five keys above,
  and adding a block from the back office doesn't set its key correctly. New blocks need
  a developer.
- The **Image** field is stored but not currently shown anywhere on the site.

The footer and Contact page phone number and email address aren't content blocks yet.
Changing them needs a developer.

### 3.2 Manage branches

- **Add a branch**: open **Branches** → **Add**, then fill in name, address and phone.
  **Ordering** controls the position on the site (lower numbers first).
- **Map**: in Google Maps, find the branch, click **Share → Embed a map**, and copy only
  the URL inside `src="…"` into **Maps embed URL**. Without it, the Branches page shows a
  pin placeholder.
- **Close a branch**: untick **Active**. It disappears from the site and the booking form,
  and existing bookings keep their branch.

### 3.3 Manage services and categories

- **Add a service**: open **Services** → **Add**. Choose the category, type the name (the
  **slug**, which is the service's web address, fills in automatically), write a
  **short description** (shown on cards, max 200 characters) and optionally a longer
  **description** (shown on the service page), then set the **price**.
- **Don't change the slug** of an existing service. Old links and bookmarks to it would
  stop working.
- **Categories**: open **Service categories** to rename one, change its blurb or reorder.
  The four existing slugs (`lab-tests`, `consultations`, `home-care`, `bedside-nursing`)
  control the icons, and whether a service counts as a home visit, so keep them. A
  new category works but gets the generic lab icon. A category with no active services
  still appears on the site with "0 services".

### 3.4 Manage products

Products are pharmacy stock (medicines, supplements, first aid, devices and so on).
Staff update price and stock from the list (see [section 2](#update-prices-and-stock)). To add a
product, open **Products** → **Add**. Products aren't shown on the public website yet;
the list is for internal stock tracking.

### 3.5 Manage staff accounts

Logins are managed under **Users** and **Groups**.

#### Recommended one-time setup: a "Front desk" group

1. Open **Groups** → **Add**, name it `Front desk`.
2. Give it these permissions:
   - Bookings: *view*, *change*
   - Products: *view*, *change*
   - Services: *view*, *change*
3. Save.

#### Add a staff member

1. Open **Users** → **Add**, set a username and password, and save.
2. On the next screen:
   - Tick **Staff status** so they can log in to the back office.
   - Leave **Superuser status** unticked.
   - Add them to the **Front desk** group.
3. Save and give them the back-office address and their login.

**Remove access**: untick **Active** on the user. This keeps their history, unlike
deleting the user.

Only make someone a **superuser** if they need to manage users, branches, services or
site text.

### 3.6 First-time production setup (for whoever deploys)

A production deploy doesn't create an admin login or demo data automatically. From the
Render service shell, run once:

```bash
python manage.py createsuperuser          # the first administrator
python manage.py seed_demo                # optional: demo branches, services, products, text
```

Then set `ADMIN_URL` to an unguessable path (e.g. `office-7f3k9q/`) and share it only
with staff. Don't re-run `seed_demo` on a live site: it resets seeded services and
products to their demo prices and stock.

---

## 4. Pharmacy inbox

Every website booking sends one email to the address set as `PHARMACY_INBOX_EMAIL`:

- **Subject**: `New booking TRP-XXXXXX — <service name>`
- **Body**: reference, service and category, client name, phone, email, branch or home
  address, preferred date and time, and notes.
- **Attachment**: `TRP-XXXXXX.pdf`, a printable A4 intake form with the same details and
  the listed price.

The client receives a separate confirmation email with their reference.

In local development all emails are caught by MailHog at <http://localhost:8025>. None
are actually delivered.

---

## 5. Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| Client says they got no confirmation email | Check spam. Then search **Bookings** for their name or phone. If the booking exists, the email failed to send; the booking is still valid, so call them with the reference |
| A booking has no PDF file | The PDF generator failed for that booking. The booking is fine; the pharmacy email arrived without an attachment. Tell a developer if it keeps happening |
| Client sees "You've submitted several bookings recently" | Each connection can make 10 bookings an hour. They should wait, or book via WhatsApp or phone |
| Client sees "Preferred date cannot be in the past" | Their date is earlier than today (Kampala time). Pick today or later |
| A price or text change isn't showing | Reload the page. Open pages can show cached data for up to five minutes |
| "Cannot delete … because they are referenced" | That service, branch or category has bookings. Untick **Active** instead |
| WhatsApp button opens a broken chat | The **WhatsApp number** content block has a `+`, spaces or dashes. Use digits only |
| Changed text or prices reverted (local dev) | The demo seed runs on every backend restart and resets seeded prices and stock, and refills empty text. Expected locally; doesn't happen in production |
| Can't find the back office | It's deliberately not linked. Use the address from your administrator (`/back-office/` locally). `/admin/` won't work |
