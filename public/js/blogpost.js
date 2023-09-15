const submitButton = document.querySelector("#save-comment");

const saveComment = async () => {
  const comment_description = document
    .querySelector("#comment-form")
    .value.trim();
  if (comment_description) {
    // gets the current location of the window
    const thisBlogLocation = document.location.pathname;

    // gets the current users information to store in the comment
    const getThisUser = await fetch("/api/users/current-user", {
      method: "GET",
    });

    const thisUser = await getThisUser.json();

    // saves comments to this blog
    const addComment = await fetch(`${thisBlogLocation}/add-comment`, {
      method: "POST",
      body: JSON.stringify({ thisUser, comment_description }),
      headers: { "Content-Type": "application/json" },
    });

    // if response create is good re render page
    if (addComment.ok) {
      document.location.reload(thisBlogLocation);
    } else {
      alert("Failed to Create User");
    }
  }
};

submitButton.addEventListener("click", saveComment);
