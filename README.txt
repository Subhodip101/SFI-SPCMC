SFI COLLEGE UNIT WEBSITE — VERSION 3
====================================

This version is designed for FREE STATIC HOSTING outside Netlify.
It works with GitHub Pages or Cloudflare Pages and does not depend on
Netlify deployment credits or Netlify Forms.

WHAT CHANGED FROM VERSION 2
----------------------------
- Removed all Netlify-specific form code.
- Added .nojekyll for easy GitHub Pages deployment.
- Added config.js so contact details and form IDs can be changed in one place.
- Added Instagram, Facebook, email and phone icon buttons.
- Added responsive photo gallery with click-to-enlarge lightbox.
- Added Contact Us form.
- Added Join Us registration form.
- Added Formspree integration as an optional free form backend.
- Kept the red / white / black visual style and SFI logo.

IMPORTANT: FORMS ARE NOT AUTOMATICALLY CONNECTED
------------------------------------------------
A static website hosted on GitHub Pages or Cloudflare Pages cannot by itself
store form submissions. Version 3 uses Formspree for this part.

Current Formspree Free limits (according to Formspree's documentation) start
at 50 submissions per month and 30 days of submission history. Limits can
change, so check Formspree before relying on it for large volumes.

SET UP FORMS
------------
1. Go to https://formspree.io/create
2. Create a free Formspree account/form.
3. Create one form for Contact Us and one form for Join Us if you want them
   separated.
4. Formspree gives each form an ID.
5. Open config.js.
6. Put the IDs here:

   forms: {
     contact: "YOUR_CONTACT_FORM_ID",
     join: "YOUR_JOIN_FORM_ID"
   }

7. Save the file and upload/redeploy the updated website.

Until the IDs are added, the forms intentionally do NOT send any student data.

CONTACT DETAILS
---------------
In config.js, add the public contact details you want displayed:

contacts: {
  instagram: "https://www.instagram.com/your_handle/",
  facebook: "https://www.facebook.com/your_page/",
  email: "contact@example.com",
  phone: "+91 98765 43210"
}

Leave a value blank if you do not want that contact method displayed.

GALLERY
-------
The sample images are in the gallery folder. Replace them with your own JPG,
PNG or SVG images. The easiest method is to keep the same filenames:
photo-1.svg through photo-6.svg.

If you want more than six photos, copy a gallery-item block in index.html and
change its image path, caption and alt text.

HOSTING OPTION A — GITHUB PAGES
--------------------------------
GitHub Pages can host static HTML/CSS/JavaScript sites. On GitHub Free, a
repository used for this kind of Pages site must be public.

1. Create/sign in to GitHub.
2. Create a new repository.
3. Upload everything inside this folder to the repository root.
4. Make sure index.html is at the top level.
5. Open repository Settings > Pages.
6. Choose the main branch and root folder as the publishing source.
7. Save.
8. GitHub will provide the Pages URL.

GitHub says publishing changes can take up to about 10 minutes.

HOSTING OPTION B — CLOUDFLARE PAGES
------------------------------------
Cloudflare Pages supports static HTML sites and can deploy them through Git
integration or direct upload.

For Git integration, connect a GitHub repository containing this folder.
For a plain static site there is no build step needed; Cloudflare's current
documentation recommends using `exit 0` as the build command when a build
command is required. The output directory should contain index.html.

PRIVACY / STUDENT DATA
----------------------
The Contact and Join forms collect personal information such as name, phone,
email, department and semester. Only collect information the unit actually
needs, tell students what the information will be used for, and restrict
access to the Formspree account to authorised people. Do not put submitted
student information into public GitHub files.

FILES
-----
index.html        Main website
style.css         Design and responsive styling
script.js         Navigation, gallery, contacts and form setup
config.js         Contact details and Formspree IDs
sfi-logo.png      SFI logo
.nojekyll         Helps GitHub Pages serve the static site directly
gallery/          Gallery images
README.txt        This guide
