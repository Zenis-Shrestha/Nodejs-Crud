const exp = require('express');
const { blogs } = require('./model/index');
const app = exp();


//db onnecton
require("./model/index")

app.set('view engine', 'ejs')
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }))

//routes
  app.get("/", async (req, res) => {
  const allBlogs = await blogs.findAll()
  res.render('blogs', { blogs: allBlogs });
  })

  app.get("/createBlog", (req, res) => {
    res.render('createBlog');
  })

  app.post("/createBlog", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const subTitle = req.body.subtitle;
  console.log(title, description, subTitle);
  await blogs.create({
    title: title,
    subTitle: subTitle,
    description: description,
  })
  // submit it in data base
  res.redirect("/");
  })

  //single page blog
  app.get("/single/:id", async (req, res) => {
  //fetch the blog id
  const id = req.params.id

  //get records of specfic if from table
  const blog = await blogs.findAll({
    where: {
      id: id
    }
  })

  res.render("singleBlog.ejs", { blog: blog });
})
  //delete a blog page
  app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await blogs.destroy({
      where: {
        id: id
      }
    });
   res.redirect("/");
  });
  
  //edit vlog
  app.get("/edit/:id",async(req,res)=>{
    const id = req.params.id
    //find blog of that id
    const blog =await blogs.findAll(
      {
        where :{
          id:id
        }
      })
   res.render("editBlog",{blog : blog})
  })

  app.post("/editBlog/:id",async(req,res)=>{
   const id = req.params.id
   const title = req.body.title;
   const subTitle = req.body.subtitle;

   const description = req.body.description;
  
     await blogs.update({
      title :title,
      subTitle : subTitle ,
      description  : description,
    },{
        where :{
          id  : id
        }
    })
    res.redirect("/single/" + id);
  })



//extract data from table
// app.get('/allBlogs', async (req, res) => {
// )}
app.listen(3000);    //server started successfully
