(() => {
  const date = (d) => {
    d = new Date(d);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
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

    console.log(otherDetails);

    return `
    <li>
      <h2>${title}</h2>
      <div class="event-content">
        <div>
          <span>${description.trim()}</span>
          <span class="price">$${price}</span>
          <form onsubmit="return navToRegistration(event)">
            <select name="event-url">
            ${occurrences
              .filter((e) => e.seats_remaining > 0)
              .map(
                (event) => `
              <option value="${event.registration_url}">${date(
                  event.start_date
                )} (${event.seats_remaining} of ${
                  event.max_participants
                } seats remaining)</option>
            `
              )}
            </select>
            <button type="submit">Register</button>
          </form>
        </div>
        <img src="${photos?.[0]}" onerror="this.parentNode.removeChild(this)"/>
      </div>
    </li>
  `;
  }
})();
