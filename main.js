let val_accordion=document.getElementById("row-col");
            let html=" ";
            const result_val=[];
            var input_data=document.getElementById("inp").value
            document.getElementById("btn").addEventListener("click",search_book)
            function read_data(){
            const apikey="xnAnD9q2z6OZNRltoLiZLJNeN0kp36AU"
            var url=`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apikey}`;
            fetch(url).then(response => response.json())
            .then(data => {for(var i=0;i<data.results.books.length;i++){
                result_val[i]=data.results.books[i]}},
                
                )
            .catch(error => console.log(error));
            }
        
        read_data();
        setTimeout(()=>display(result_val),2000)
        
        function display(result_val){
            
            for(i=3;i<6;i++){
              
              html+= `<div class="col">
            <div class="card h-100">
              <img src="${result_val[i].book_image}" class="card-img-top" height="200" >
              <div class="card-body">
                <h5 class="card-title">${result_val[i].title} by ${result_val[i].publisher}</h5>
                <p class="card-text">${result_val[i].description}</p>
              </div>
              <div class="card-footer" align-items: "center !important" >
                <a class="btn btn-secondary" href="${result_val[i].amazon_product_url}" role="button">Click to Buy</a>
                
              </div>
            </div>
          </div>`
                  
                        }  
        val_accordion.innerHTML=html;
        }
        var flag=false;
        function search_book(evt)
        {
          var input_data=document.getElementById("inp").value
         
          for(var i=0;i<result_val.length;i++)
          {
            if(input_data===result_val[i].title.toLowerCase())
            {
          document.getElementById("offcanvasRight").innerHTML=`
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">${result_val[i].title} by ${result_val[i].publisher}</h5>
              
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <img src="${result_val[i].book_image}" class="card-img-top" height="170" widht="50">
              ${result_val[i].description}
            </div>
            <div class="offcanvas-footer">
                <a class="btn btn-secondary" href="${result_val[i].amazon_product_url}" role="button">Link</a>
            </div>
          `
          flag=true
          break;
            }
          }
      console.log(flag)
      if(flag===false){
        document.getElementById("offcanvasRight").innerHTML=`
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">Not Found</h5>
              
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>`      
      }  
    }  