const submitButton = document.querySelector("#save-comment");
const deleteButton = document.querySelector("#delete-blog");

// adds a comment to blog post and renders the page
const saveComment = async () => {
  const comment_description = document
    .querySelector("#comment-form")
    .value.trim();
  if (comment_description) {
    // gets the current location of the window
    const thisBlogLocation = document.location.pathname;

    // saves comments to this blog
    const addComment = await fetch(`${thisBlogLocation}/add-comment`, {
      method: "POST",
      body: JSON.stringify({ comment_description }),
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

// deletes a blog post
const deleteBlog = async () => {
  const deleteRoute = document.location.pathname;

  if (confirm(`Are you sure you want to delete this blog?`)) {
    const yeetBlog = await fetch(deleteRoute, {
      method: "DELETE",
    });

    if (yeetBlog.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete this blog");
    }
  }
};

submitButton.addEventListener("click", saveComment);
deleteButton.addEventListener("click", deleteBlog);
