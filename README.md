# Gold Fitness Kengeri website

A fast, single-page static website. There is no build step: `index.html`, `styles.css` and `script.js` are served as they are.

- Free-trial form saves to Supabase table `free_trial_passes` (insert-only). Setup SQL: `supabase/website_tables.sql`.
- To change text, plans, hours or photos, edit `index.html`.
- Deploy: import the repo in Vercel. `vercel.json` sets it up as a static site.
