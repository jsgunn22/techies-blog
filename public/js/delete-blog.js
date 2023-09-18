const deleteButton = document.querySelector("#delete-blog");

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

deleteButton.addEventListener("click", deleteBlog);
