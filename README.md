# TMB Community (100% GitHub)

All-in on GitHub: Discussions for posts/replies, Pages for a clean viewer, Actions to sync JSON.
- No servers, no secrets, no databases.
- Members reply on GitHub; the site refreshes every ~10 minutes.

### Setup
1) Create a public repo and upload these files (root).  
2) Settings → **Pages** → Source: *Deploy from Branch*, Branch: *main*, Folder: */*.  
3) Settings → **General → Features** → enable **Discussions**.  
4) In Discussions, create categories with slugs: `announcements`, `general`, `events`, `ideas`.  
5) Edit `data/export.json` to set your repo URL placeholders. Commit.  
6) Actions → enable → run **Export Discussions to JSON** once.  
7) Open your Pages URL to view.

You can change room names/slugs in `.github/workflows/export-discussions.yml` and `data/export.json`.
