// console.log("Jai Shree RAm");


const form = document.getElementById("addblog");
const description = document.getElementById("desc");
const Input = document.getElementsByClassName("blog_value");
// var cnt=1;
// const title = document.getElementById("title");
// const category = document.getElementById("category");
// const image = document.getElementById("image");

const blogData=[];
const obj ={};

function storeData(data){
  localStorage.setItem("data", JSON.stringify(data));
}

const arr = Array.from(Input);
// console.log(arr);

async function imageUpload(e){
  const imageFile = document.getElementById("imageInput").files[0];
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "system_uploader_1e2ddab171f769b9_c93aad6f0d093e61bebf56fe9b4b50b1d7"); // You must set this in Cloudinary
  
  const res = await fetch(`https://api.cloudinary.com/v1_1/dsa95ohwa/image/upload`, {
    method: "POST",
    body: formData
  });
  
  const data = await res.json();
  //console.log("Image uploaded successfully: ", data);
  return data;
}




if(form){
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = await imageUpload(e);
    const url = data.secure_url;

  //  handleChange();
  
  obj["desc"]= description.value;
  obj["url"] = url;
     let prevData = localStorage.getItem("data");
      prevData=JSON.parse(prevData);
   if(prevData){
    const id =prevData.length;
    obj["id"]=id;
    blogData.push(obj);
    console.log(blogData);
     storeData([...prevData,...blogData]);
   }
   else{
    obj["id"] = 0;
    blogData.push(obj);
     storeData([...blogData]);
   }
   window.location.href = "./index.html";
 })
}


if(arr){
  arr.map((item)=>{
    item.addEventListener("change",(e)=>{
      handleChange(e);
    })
  });
}

function handleChange(e){
  //console.log("Change");
  let value = e.target.value;
  obj[e.target.name] = value;
  // console.log(obj);
   return obj;
}



window.addEventListener("load",()=>{
  let prevData = localStorage.getItem("data");
    prevData=JSON.parse(prevData);
  generateBlog(prevData);
});


// console.log(wrapper);

function generateBlog(data){
  const wrapper = document.getElementsByClassName("blog_wrapper")[0];
  if(wrapper){
    wrapper.innerHTML = "";
    let str="";
  
    data.map((item)=>{
       str += `
       <div class="blog_card">
            <div class="blog_image">
              <img src=${item.url}>
            </div>
            <div class="blog_category">
              <p class="badge">${item.category}</p>
              <span id="date">${item.date}</span>
            </div>
            <div class="title">
              <p>${item.title}</p>
              <div class="icons">
              <i onClick="handleDelete(${item.id})" class="ri-delete-bin-2-line"></i>
              <i onClick="handleEdit(${item.id})" class="ri-edit-2-line"></i>
              </div>
            </div>
          </div>
       `
    });
    wrapper.innerHTML += str;
  }
}


function handleDelete(id){
  let prevData = localStorage.getItem("data");
   prevData = JSON.parse(prevData);
   console.log(prevData);
   let arr = prevData.filter((item)=>{
      return item.id !== id
   });
  //  console.log(arr);
  storeData([...arr]);
  generateBlog(arr);
}



function handleEdit(id){
  localStorage.setItem("id",id);
  window.location.href = "./EditBlog.html";
}


window.addEventListener("load",()=>{
 const editForm = document.getElementById("editblog");
 const formField = document.getElementsByClassName("blog_value");
 const desc  = document.getElementById("desc");
 const image = document.getElementById("previewImage");
const imageInput = document.getElementById("imageInput");
const btn1 = document.getElementById("btn1");
// console.log(imageInput)


 if(editForm){
  let prevData = localStorage.getItem("data");
  prevData = JSON.parse(prevData);
  let iD = localStorage.getItem("id");
  //console.log(prevData,iD);
  const arr = prevData.filter((item)=>{
  return item.id === Number(iD)
});

formField[0].value = arr[0].title;
formField[1].value = arr[0].category;
formField[2].value = arr[0].date;
desc.value = arr[0].desc;
image.src = arr[0].url;
 


 const modifyArr = Array.from(formField);



 if(modifyArr){
  modifyArr.map((item)=>{
    item.addEventListener("change",(e)=>{
      let value = e.target.value;
      arr[0][e.target.name] = value;
    })
  });
}
let imageUrl="";
let loading = true;
imageInput.addEventListener("change",(e)=>{
  loading=true;
  console.log("Image Changed")
  const data=imageUpload();
  data.then((res)=>{
    imageUrl=res.secure_url;
    loading=false;
  })
  .catch((err)=>{
    console.log(err)
  })
});
editForm.addEventListener("submit",async(e)=>{
  e.preventDefault(); 
  const url = (imageUrl) ? imageUrl : arr[0].url;
  
  arr[0].desc= desc.value;
  arr[0].url  = url;
  

  console.log(arr[0]);
  let idx = arr[0].id;
  prevData[idx] = arr[0];
  localStorage.setItem("data",JSON.stringify(prevData));
   
  window.location.href = "./index.html";  
  generateBlog(prevData);

})
}
});


const menu = document.getElementById("menu");
const ul = document.getElementsByClassName("show");

menu.addEventListener("click",()=>{
  ul[0].classList.toggle("hide");
})