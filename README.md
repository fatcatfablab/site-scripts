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

## Stripe email form

A simple email form that's used as a squarespace block to start a stripe customer session and render a pricing table or buy button.

Something like this:

```html
<div id=fcfl-email-form style="text-align: center"></div>
<script src="https://cdn.jsdelivr.net/gh/fatcatfablab/site-scripts/src/fcfl-squarespace-stripe-email-form.js"></script>
<script>
fcflRenderEmailForm("prctbl_1RY9TTLjxw7wKB03khGCcAp3", false);
</script>
```

## Github workflows

Note that `.github/workflows/bust-cache.yml` exists to bust the script cache when a code update is pushed to the site.
