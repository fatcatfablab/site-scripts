# site-scripts

A home for snippets and scripts to enhance fcfl's site

## Events

`events.js` and `events.css` are included on the [workshops page](https://fatcatfablab.org/workshops). Essentially
this is done by the below HTML being injected by squarespace.

```html
<div id="fcfl-events"></div>
<script src="https://cdn.jsdelivr.net/gh/fatcatfablab/site-scripts/src/events.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/fatcatfablab/site-scripts/src/events.css"
/>
```

Note that `.github/workflows/bust-cache.yml` exists to bust the script cache when a code update is pushed to the site.
