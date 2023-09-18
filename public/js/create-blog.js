const saveBlogBtn = document.querySelector("#save-blog");

const createBlog = async () => {
  // gets values from the DOM
  const blog_title = document.querySelector("#blog-title").value.trim();
  const blog_description = document.querySelector("#blog-form").value.trim();

  //Checks to see if both forms are filled
  if (blog_title && blog_description) {
    const thisBlog = await fetch("api/blogpost/", {
      method: "POST",
      body: JSON.stringify({ blog_title, blog_description }),
      headers: { "Content-Type": "application/json" },
    });

    const getResponse = await thisBlog.json();

    if (thisBlog.ok) {
      window.location.replace(`/api/blogpost/${getResponse.id}`);
    } else {
      alert("Failed to Create Blog");
    }
  }
};

saveBlogBtn.addEventListener("click", createBlog);
