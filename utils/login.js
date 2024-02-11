
export async function login(url = "", data = {}) {
    try{
        const response = await fetch (url,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }) 
        return response;
    }
    catch(e){
        console.log(e);
    }
  }
