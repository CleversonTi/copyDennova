window.getGitHubProfile = function (username = "cleversonti") {
  return fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("GitHub API error:", res.status);
        return null;
      }
      return res.json();
    })
    .catch((err) => {
      console.error("GitHub fetch failed:", err);
      return null;
    });
};
