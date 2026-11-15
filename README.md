# Amer Mahsoub — static portfolio for GitHub Pages

Production files are plain HTML, CSS and JavaScript. **No Node, npm, Next.js, server, dependencies, or build process required.**

## Local preview

From this folder run:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. Serve through HTTP rather than using `file://` for correct routing.

## Publish on GitHub Pages

1. Put **the contents of this folder** (not its containing folder) at the root of your GitHub repository. Keep `index.html`, `assets/`, `work/`, and `CNAME` at the root.
2. Commit and push to `main`.
3. Open repository **Settings → Pages → Build and deployment**; set Source to **Deploy from a branch**, Branch `main`, Folder `/(root)`, then Save.
4. Under **Custom domain**, enter `amermahsoub.me` and configure your domain DNS per GitHub's official instructions. `CNAME` is included for this domain. Enable HTTPS once DNS and certificates are ready.
5. If publishing to a project subpath such as `username.github.io/repo/` **instead** of the custom domain, adjust the canonical links, sitemap and paths; these files are designed for a root-domain site.

## Pages

- `/` — home
- `/work/` — selected projects
- `/work/transflo-mobile-plus/` and `/work/my-we/` — case studies
- `/expertise/`, `/experience/`, `/about/`, `/contact/`, `/resume/`, `/articles/`

## Customization

- Update email and project copy in the HTML files (content is static, with no runtime API).
- Edit design in `assets/styles.css` and behavior in `assets/site.js`.
- Project art is custom CSS illustration, **not** official product UI.
- Add verified resume as a PDF and link it from `resume/index.html`.
- Review career facts, company-related statements, and any public assets before publishing.

## Notes

- No forms or tracking dependencies. Google Fonts is loaded from its CDN; if you need fully offline fonts, replace with locally licensed web fonts.
- `CNAME` assumes your live website uses the apex domain `amermahsoub.me`. Remove or edit if hosting under a different domain.
