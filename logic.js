(() => {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const banner = document.querySelector(".banner");
  const closeBannerTrigger = document.querySelector(".banner .banner-contain:last-child");

  const readStatementTrigger = document.querySelector(".banner-text");
  const statement = document.querySelector(".statement");
  const closeStatementTrigger = document.querySelector(".statement-close");

  const targetDate = new Date(2026, 2, 30, 14, 45, 0).getTime(); // Mar 30, 2026 2:45 PM (local time)
  const format = (num) => String(num).padStart(2, "0");
  const externalLeaveMessage = "You are leaving this site and going to an external vendor. Continue?";

  const updateCountdown = () => {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      return;
    }

    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = format(days);
    hoursEl.textContent = format(hours);
    minutesEl.textContent = format(minutes);
    secondsEl.textContent = format(seconds);
  };

  const openStatement = () => {
    if (!statement) {
      return;
    }

    statement.classList.add("is-open");
    document.body.classList.add("statement-open");
  };

  const closeStatement = () => {
    if (!statement) {
      return;
    }

    statement.classList.remove("is-open");
    document.body.classList.remove("statement-open");
  };

  const closeBanner = () => {
    if (!banner) {
      return;
    }

    banner.style.display = "none";
  };

  const handleExternalLinkWarning = (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
      return;
    }

    const rawHref = link.getAttribute("href");

    if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
      return;
    }

    let destinationUrl;

    try {
      destinationUrl = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    const isHttp = destinationUrl.protocol === "http:" || destinationUrl.protocol === "https:";
    const isExternal = destinationUrl.hostname !== window.location.hostname;

    if (!isHttp || !isExternal) {
      return;
    }

    const confirmed = window.confirm(externalLeaveMessage);

    if (!confirmed) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  updateCountdown();
  if (daysEl && hoursEl && minutesEl && secondsEl) {
    setInterval(updateCountdown, 1000);
  }

  if (readStatementTrigger && closeStatementTrigger) {
    readStatementTrigger.addEventListener("click", openStatement);
    closeStatementTrigger.addEventListener("click", closeStatement);
  }

  if (closeBannerTrigger) {
    closeBannerTrigger.addEventListener("click", closeBanner);
  }

  document.addEventListener("click", handleExternalLinkWarning);
})();
