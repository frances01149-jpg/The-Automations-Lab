# Operations Hub: Inventory + Pantry Pilot

The SJUB office system ships in two forms that follow the same rules:

- **Web app:** `app/sjub-ops-hub.html`, published as a private claude.ai artifact. It is a real app
  with a sidebar, cards and charts, and the data is shared online by the whole team. Modules:
  Overview, Stock, Weekly Count (a guided count sheet), Orders (suggested orders → purchase
  orders), Receiving, Suppliers, Pilot Dashboard, Refills, Feedback, Tasks (a board with repeating
  tasks), Calendar, Alerts, Reports (a monthly summary) and Settings (import products, export
  everything to Excel).
- **Excel workbook:** the formula-driven backup described below. Use it offline or where the app
  can't be opened.

## Excel workbook

Every number in the workbook is a formula. It holds two separate systems:

| System 1 · Inventory Management | System 2 · Pantry Pilot Tracker (60 days) |
| --- | --- |
| Control Panel: thresholds, lead time, order month, pilot dates, lists | Pilot Products: snacks & beverages with usage stats |
| Inventory Master: stock %, OK / LOW / CRITICAL, suggested order | ✎ Restock Log: refill events, cadence, hours the shelf lasted |
| ✎ Weekly Count: the weekly physical count | ✎ Feedback Log: employee feedback and follow-ups |
| Order List: auto purchase list with priority and need-by date | Pilot Dashboard: KPIs, charts, EXPAND / CONTINUE / ADJUST signal |
| Inventory Dashboard: KPIs, status donut, order units by category, expiry watch | ✎ Tasks: office tasks with owners and overdue flags |
| ✎ Receiving Log: deliveries added to stock, with line cost | |

The only things anyone types are **blue cells**: counts, deliveries, refills, feedback and tasks. **Yellow cells**
hold one-time setup. Everything else is locked and calculated.

## Files (`output/`)

| File | Use |
| --- | --- |
| `SJUB_Operations_Hub.xlsx` | The live SJUB workbook, loaded with the 44 SJUB products (built from `source/`). |
| `SJUB_Operations_Hub_DEMO.xlsx` | The same system filled with **sample** products and entries so you can explore it. Not real data. |
| `Operations_Hub_Template.xltx` | An Excel template. Opening it creates a new, untitled copy for any office. |
| `source/SJUB - Inventario (transcribed).xlsx` | The SJUB product list, typed in from screenshots of the original file (typos kept as-is). Fix it here and rebuild. |

## Launching another office or program

Change two things, the source file and the pilot dates:

**Option A: inside Excel (no code)**
1. Open the template (or any copy) and go to **Source Data**.
2. Paste *Category, Item Name, Item #, Recent Date Received, Expiration Date, PAR Value* from the new source file
   (values only, no blank rows). It holds up to 300 products.
3. On the **Control Panel**, set the site name and the pilot start date and duration. Then pick which
   source categories count as Snack and which count as Beverage.

**Option B: generate it from the source file**
```bash
pip install openpyxl
python ops-hub/build_ops_hub.py --source "SJUB - Inventario.xlsx" --site SJUB \
       --pilot-start 2026-09-28 --pilot-days 60 --out ops-hub/output/SJUB_Operations_Hub.xlsx
```
The script finds the header row by itself, accepts English or Spanish headers and skips section
banner rows such as "Canteen & Kitchen Supplies". It also auto-detects snack and beverage
categories: every category under a "Snacks" banner counts as Snack, and drink categories such as
Coffee or Teabags count as Beverage (lids, cups and stirrers do not). Override them with
`--snack-cats "Snacks,Candy" --beverage-cats "Drinks"`.

Other options: `--order-month 2026-10-01` fixes the order month (by default it follows the report
date), `--demo` fills the workbook with sample data, and `--xltx` saves it as a template.

## How the automation works

- **Latest count:** each count row gets a per-product sequence number. The Inventory Master reads
  sequence 1 as the starting qty and the highest sequence as the current stock. Add counts at the
  bottom, oldest first.
- **Current stock** = the latest count + units received after that count (Receiving Log).
- **Suppliers and costs:** optional Supplier and Unit Cost columns on Source Data feed the Order
  List (estimated cost) and the Receiving Log (line cost).
- **Status:** Stock % = Current ÷ PAR. At or below the critical % the item is CRITICAL; at or below
  the low % it is LOW; otherwise OK. An item with no count yet shows NO COUNT.
- **Orders:** Order Qty = max(0, PAR − Current). By default only LOW and CRITICAL items are ordered;
  a Control Panel switch also tops up OK items. CRITICAL → URGENT (need-by = today + lead time).
  LOW → STANDARD (need-by = order month + lead time).
- **Expiration:** the Inventory Master shows Days to Expiry and flags each item EXPIRED,
  EXPIRING (within the Control Panel window, 30 days by default), OK or N/A. The dashboard lists
  the 10 soonest expirations.
- **Pilot cadence:** for each product, the previous refill timestamp comes from that product's prior
  event. Days and hours between refills are calculated from it. Log the first placement with
  Qty Before = 0.
- **Decision signal:** rules on the Control Panel. EXPAND needs avg rating ≥ 4.2 and ≥ 60 %
  positive. CONTINUE needs avg rating ≥ 3.5. Anything lower is ADJUST. With fewer than 10 feedback
  entries the signal reads GATHER MORE DATA.
- Sheets are protected **without a password** so formulas can't be overwritten by accident
  (Review → Unprotect Sheet to edit the structure). A hidden `_Engine` sheet holds the helper
  calculations.
- Dates, IDs and the as-of logic avoid locale-specific `TEXT()` formats, so the workbook works in
  English and Spanish Excel alike.

The generator was checked by recalculating every output in LibreOffice: no formula errors.
