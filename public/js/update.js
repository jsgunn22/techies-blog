const saveBtn = document.querySelector("#save-update");

const saveChanges = async () => {
  const thisBlogRoute = document.location.pathname;
  const blog_title = document.querySelector("#blog-title").value.trim();
  const blog_description = document.querySelector("#blog-form").value.trim();

  if (blog_title && blog_description) {
    const updateBlog = await fetch(`/api/blogpost${thisBlogRoute}`, {
      method: "PUT",
      body: JSON.stringify({ blog_title, blog_description }),
      headers: { "Content-Type": "application/json" },
    });

    if (updateBlog.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("didnt work");
    }
  }
};

saveBtn.addEventListener("click", saveChanges);
