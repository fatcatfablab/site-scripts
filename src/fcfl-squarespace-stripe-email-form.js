(() => {
  async function fcflGetCustomerSession(email, forBuyButton) {
    const response = await fetch("https://stripe-create-session.fcfl.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: email, buy_button: forBuyButton }),
    });
    const info = await response.json();
    // console.log(info);
    return info;
  }

  window.fcflDoSubmit = (e, id, isBuyButton) => {
    e.preventDefault();
    const email = e.srcElement.getElementsByClassName("email")[0].value;
    e.srcElement.getElementsByClassName("submit")[0].disabled = true;
    fcflGetCustomerSession(email).then((info) => {
      const div = document.getElementById("stripe-pricing-table-container");
      const t = document.createElement(isBuyButton ? "stripe-buy-button" : "stripe-pricing-table");
      t.setAttribute(isBuyButton ? "buy-button-id" : "pricing-table-id", id);
      t.setAttribute("publishable-key", "pk_live_0fsbswlS6keplxrWEjpLgPKy");
      if (info.session) {
        t.setAttribute("customer-session-client-secret", info.session);
      } else {
        t.setAttribute("customer-email", info.email);
      }
      div.appendChild(t);
    });
  };

  window.fcflRenderEmailForm = (id, isBuyButton) => {
    document.getElementById("fcfl-email-form").innerHTML = `
    <form onsubmit="fcflDoSubmit(event, '${id}', ${isBuyButton})">
      <label>Email: <input type="email" class="email" size=45></label>
      <button type="submit" class="submit">submit</button>
    </form>
    <br>
    <div id=stripe-pricing-table-container></div>
    `;
  };
})();

// <div id=email-form style="text-align: center"></div>

