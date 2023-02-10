(() => {
  const date = (d) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(d.replace(/-/g, "/")));
  };

  const groupBy = (obj, key) =>
    obj.reduce((acc, value) => {
      acc[value[key]] ??= [];
      acc[value[key]].push(value);
      return acc;
    }, {});

  window.navToRegistration = (event) => {
    window.open(event.target["event-url"].value, "_blank");
    return false;
  };

  fetch("https://civicrm.fatcatfablab.org/json/events")
    .then((data) => data.json())
    .then((events) =>
      events.sort(({ start_date_timestamp: a }, { start_date_timestamp: b }) =>
        a > b ? 1 : a < b ? -1 : 0
      )
    )
    .then(renderEvents);

  function renderEvents(events) {
    document.querySelector("#fcfl-events").innerHTML = `
    <ul>
      ${Object.entries(groupBy(events, "hash")).map(renderEvent).join("\n")}
    </ul>
  `;
  }

  function renderEvent([hash, occurrences]) {
    const { title, description, photos, price, ...otherDetails } =
      occurrences[0];

    const events = occurrences.filter((e) => e.seats_remaining >= 0);

    return `
    <li>
      <h2>${title}</h2>
      <div class="event-content">
        <div>
          <span>${description.trim()}</span>
          <span class="price">$${price}</span>
          ${
            events.length > 0
              ? `
                <form onsubmit="return navToRegistration(event)">
                  <select name="event-url">
                  ${events.map(
                    (event) => `
                    <option value="${event.registration_url}">${date(
                      event.start_date
                    )}(${event.seats_remaining} of ${
                      event.max_participants
                    } seats remaining)</option>`
                  )}
                  </select>
                  <button type="submit">Register</button>
                </form>`
              : `<div><b>Class Full</b></div>`
          }
        </div>
        <img src="${photos?.[0]}" onerror="this.parentNode.removeChild(this)"/>
      </div>
    </li>
  `;
  }
})();
