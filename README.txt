SFI SPCMC WEBSITE
==================

SFI St Paul's Cathedral Mission College (SFI SPCMC) — a static website for
student activities, programmes, notices, photographs and contact information.

CURRENT SITE
------------
- College unit name: SFI St Paul's Cathedral Mission College
- Short name: SFI SPCMC
- Instagram: @sfi_spcmc
- Facebook: SFI SPCMC
- Email: sfi.spcmc@gmail.com
- Phone: +91 8436497342 / +91 9123056976
- Hosting: GitHub Pages

FILES
-----
index.html        Main website content and forms
style.css         Design and responsive layout
script.js         Navigation, gallery, contacts and form handling
config.js         Public contact details and Formspree form IDs
sfi-logo.png      SFI logo
college-campus.jpg
college-entrance.jpg
                  Current gallery photographs
.nojekyll         Keeps the site served as a static GitHub Pages site

UPDATING THE WEBSITE
--------------------
Most visible website text is in index.html. Replace the sample notices in the
Updates & Notices section when real notices are ready.

To replace a gallery photograph, upload a new image and update its filename,
alt text and caption in the Gallery section of index.html.

FORMS
-----
The Contact Us and Join Us forms use Formspree as the external form service.
Their form IDs are kept in config.js:

forms: {
  contact: "YOUR_CONTACT_FORM_ID",
  join: "YOUR_JOIN_FORM_ID"
}

Do not replace a working Contact Us ID. Add the Join Us ID only after creating
the Join Us form in Formspree.

PRIVACY
-------
The forms collect personal information such as name, department, semester,
phone and email. Only collect information that the unit needs, tell students
how their information will be used, and restrict access to the form account
to authorised people. Do not publish form submissions or student information
in the GitHub repository.

GITHUB PAGES
------------
The website is a static HTML/CSS/JavaScript site and can be hosted through
GitHub Pages. Keep index.html in the repository root and publish the correct
branch/folder from the repository's Pages settings.

PROJECT NOTE
------------
This README is intentionally short and describes the current project. It does
not contain old version-specific deployment instructions.
